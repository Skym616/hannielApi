const admin = require('../admin');
const jwt = require('jsonwebtoken');
const db = admin.firestore();
const auth = admin.auth();
const cloudinary = require('../utils/cloudinaryConfig');

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  auth.getUserByEmail(email).then((hospital) => {
    db.collection('hospital').doc(hospital.uid).get().then((result) => {
      if (result.data().password === password) {
        const user = { ...result.data(), id: result.id };
        res.status(200).json({
          userId: result.id,
          token: jwt.sign({ userId: result.id }, 'RAMDOM_SECRET_KEY')
        });
      } else {
        res.status(404).json({ message: 'Mot de passe invalide' });
      }
    }).catch((error) => {
      res.status(404).json({ message: 'Patient n\'a aucune correspondance' });
    });
  }).catch((error) => {
    res.status(404).json({ message: 'Email ne invalide' });
  });
};

exports.signUp = (req, res) => {
  const { email, password } = req.body;
  if (email && password && email !== '' && password !== '') {
    auth.createUser({ email: email, password: password }).then((hospital) => {
      db.collection('hospital').doc(hospital.uid).create(req.body).then((result) => {
        res.status(201).json({ message: 'hospital créé avec succès' });
      }).catch((error) => {
        res.status(400).json({ message: 'Erreur lors de la créaation du hospital' });
      });
    }).catch((error) => {
      res.status(500).json({ message: 'Erreur lors de la créaation du hospital' });
    });
  } else {
    res.status(500).json({ message: 'identifiant invalide' });
  }
};

exports.updateHospital = (req, res) => {
  const { idHospital } = req.params;
  db.collection('hospital').doc(idHospital).update(req.body).then((result) => {
    res.status(201).json({ message: 'Hopital mis à jour avec succès' });
  }).catch(() => {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'hopital' });
  });
};

exports.createCampaign = (req, res) => {
  console.log(req.body.campaign);
  console.log(req.file);
  
  if (req.file) {
    cloudinary.uploader.upload(req.file.path).then((response) => {
      const newCampaign = { ...JSON.parse(req.body.campaign), image: response.secure_url };
      db.collection('campaign').add(newCampaign).then((result) => {
        res.status(201).json({ message: 'campaign créé avec succès' });
      }).catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la créaation du campaign' });
      });
    }).catch((error) => {
      console.log('création phcie hébergement invalide');
      res.status(500).json({ message: 'Erreur lors l\'hébergement de l\'image' });
    });
  } else {
    db.collection('campaign').add(JSON.parse(req.body.campaign)).then((result) => {
      res.status(201).json({ message: 'campaign créé avec succès' });
    }).catch((error) => {
      res.status(500).json({ message: 'Erreur lors de la créaation du campaign' });
    });
  }
};

exports.getOneCampaign = (req, res) => {
  const { idCampaign } = req.params;
  db.collection('campaign').doc(idCampaign).get().then((result) => {
    res.status(201).json({ message: result.data() });
  }).catch((error) => {
    res.status(400).json({ message: 'Erreur lors de l\'obtention de  la campagne' });
  });
};

exports.getAllCampaign = (req, res) => {
  let campaignTab = [];
  db.collection('campaign').get().then((result) => {
    result.docs.forEach((doc) => {
      const campaign = { ...doc.data(), ...{ id: doc.id } };
      campaignTab.push(campaign);
    });
    res.status(200).json({ message: campaignTab });
  }).catch((error) => {
    res.status(404).json({ message: 'Erreur lors de la recupération des campagnes' });
  });
};

exports.updateCampaign = (req, res) => {
  console.log(req.body.campaign);
  console.log(req.file);
  const { idCampaign } = req.params;
  if (req.file) {
    cloudinary.uploader.upload(req.file.path).then((response) => {
      const newCampaign = { ...JSON.parse(req.body.campaign), image: response.secure_url };
      db.collection('campaign').doc(idCampaign).update(newCampaign).then((result) => {
        res.status(201).json({ message: 'campaign update avec succès' });
      }).catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la update du campaign' });
      });
    }).catch((error) => {
      console.log('update phcie hébergement invalide');
      res.status(500).json({ message: 'Erreur lors l\'hébergement de l\'image' });
    });
  } else {
    db.collection('campaign').doc(idCampaign).update(JSON.parse(req.body.campaign)).then((result) => {
      res.status(201).json({ message: 'campaign créé avec succès' });
    }).catch((error) => {
      res.status(500).json({ message: 'Erreur lors de la créaation du campaign' });
    });
  }
};

exports.deleteCampaign = (req, res) => {
  const { idCampaign } = req.params;
  db.collection('campaign').doc(idCampaign).delete().then((result) => {
    res.status(200).json({ message: 'Campaigne supprimé avec succès' });
  }).catch((error) => {
    res.status(404).json({ message: 'Erreur lors de la suppression de la campagne' });
  });
};

exports.createDoctor = (req, res) => {
  console.log(req.body);
  console.log(req.body.hospital);
  const { email, password } = JSON.parse(req.body.hospital);
  console.log(req.file);
  if (req.file) {
    cloudinary.uploader.upload(req.file.path).then((response) => {
      const newHospital = { ...JSON.parse(req.body.hospital), logo: response.secure_url };
      if (email && password && email !== '' && password !== '') {
        auth.createUser({ email: email, password: password }).then((hospital) => {
          db.collection('hospital').doc(hospital.uid).create(newHospital).then((result) => {
            res.status(201).json({ message: 'hospital créé avec succès' });
          }).catch((error) => {
            res.status(400).json({ message: 'Erreur lors de la créaation du hospital' });
          });
        }).catch((error) => {
          console.log('création phcie');
          res.status(500).json({ message: 'Erreur lors de la créaation du hospital' });
        });
      } else {
        console.log('création phcie id invalide');
        res.status(500).json({ message: 'identifiant invalide' });
      }
    }).catch((error) => {
      console.log('création phcie hébergement invalide');
      res.status(500).json({ message: 'Erreur lors l\'hébergement de l\'image' });
    });
  } else {
    if (email && password && email !== '' && password !== '') {
      auth.createUser({ email: email, password: password }).then((hospital) => {
        db.collection('hospital').doc(hospital.uid).create(JSON.parse(req.body.hospital)).then((result) => {
          res.status(201).json({ message: 'hospital créé avec succès' });
        }).catch((error) => {
          res.status(400).json({ message: 'Erreur lors de la créaation du hospital' });
        });
      }).catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la créaation du hospital' });
      });
    } else {
      res.status(500).json({ message: 'identifiant invalide' });
    }
  }
};