const admin = require('../admin');
const auth = admin.auth();
const db = admin.firestore();
const cloudinary = require('../utils/cloudinaryConfig');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email && password && email !== '' && password !== '') {
    auth.createUser({ email: email, password: password }).then((admin) => {
      db.collection('admin').doc(admin.uid).create(req.body).then((result) => {
        res.status(201).json({ message: 'admin créé avec succès' });
      }).catch((error) => {
        res.status(400).json({ message: 'Erreur lors de la création du admin fire' });
      });
    }).catch((error) => {
      res.status(500).json({ message: 'Erreur lors de la création du admin auth' });
    });
  } else {
    res.status(500).json({ message: 'identifiant invalide' });
  }
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  auth.getUserByEmail(email).then((admin) => {
    db.collection('admin').doc(admin.uid).get().then((result) => {
      if (result.data().password === password) {
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

exports.getAdmin = (req, res) => {
  const { idAdmin } = req.params;
  db.collection('admin').doc(idAdmin).get().then((admin) => {
    res.status(200).json({ message: admin.data() });
  }).catch((error) => {
    res.status(404).json({ message: 'erreur lors de l\'obtention de l\'admin' });
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

exports.getOneCampaign = (req, res) => {
  const { idCampaign } = req.params;
  db.collection('campaign').doc(idCampaign).get().then((response) => {
    const campaign = { ...response.data(), id: response.id };
    res.status(200).json({ message: campaign });
  }).catch((error) => {
    console.log('ici');
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention de la campagne' });
  });
};

exports.getAllPatient = (req, res) => {
  let tab = [];
  db.collection('patient').get().then((response) => {
    response.forEach((patient) => {
      const obj = { ...patient.data(), id: patient.id };
      tab.push(obj);
    });
    res.status(200).json({ message: tab });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention des patients' });
  });
};

exports.getOnePatient = (req, res) => {
  const { idPatient } = req.params;
  db.collection('patient').doc(idPatient).get().then((response) => {
    const patient = { ...response.data(), id: response.id };
    res.status(200).json({ message: patient });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention du patient' });
  });
};

exports.getAllMedicament = (req, res) => {
  let tab = [];
  db.collection('medicament').get().then((response) => {
    response.forEach((medicament) => {
      const obj = { ...medicament.data(), id: medicament.id };
      tab.push(obj);
    });
    res.status(200).json({ message: tab });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention des medicaments' });
  });
};

exports.getOneMedicament = (req, res) => {
  const { idMedicament } = req.params;
  db.collection('medicament').doc(idMedicament).get().then((response) => {
    const medicament = { ...response.data(), id: response.id };
    res.status(200).json({ message: medicament });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention du medicament' });
  });
};

exports.getAllPharmacy = (req, res) => {
  let tab = [];
  db.collection('pharmacy').get().then((response) => {
    response.forEach((pharmacy) => {
      const obj = { ...pharmacy.data(), id: pharmacy.id };
      tab.push(obj);
    });
    res.status(200).json({ message: tab });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention des pharmacies' });
  });
};

exports.getOnePharmacy = (req, res) => {
  const { idPharmacy } = req.params;
  db.collection('pharmacy').doc(idPharmacy).get().then((response) => {
    const pharmacy = { ...response.data(), id: response.id };
    res.status(200).json({ message: pharmacy });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention de  la pharmacie' });
  });
};

exports.getAllHospital = (req, res) => {
  let tab = [];
  db.collection('hospital').get().then((response) => {
    response.forEach((hospital) => {
      const obj = { ...hospital.data(), id: hospital.id };
      tab.push(obj);
    });
    res.status(200).json({ message: tab });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention des Hopitaux' });
  });
};

exports.getOneHospital = (req, res) => {
  const { idHospital } = req.params;
  db.collection('hospital').doc(idHospital).get().then((response) => {
    const hospital = { ...response.data(), id: response.id };
    res.status(200).json({ message: hospital });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention de  l\'hopital' });
  });
};

exports.createPharmacy = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (req.file) {
    cloudinary.uploader.upload(req.file.path).then((response) => {
      const newPharmacy = { ...req.body, logo: response.secure_url };
      if (email && password && email !== '' && password !== '') {
        auth.createUser({ email: email, password: password }).then((pharmacy) => {
          db.collection('pharmacy').doc(pharmacy.uid).create(newPharmacy).then((result) => {
            res.status(201).json({ message: 'pharmacy créé avec succès' });
          }).catch((error) => {
            res.status(400).json({ message: 'Erreur lors de la créaation du pharmacy' });
          });
        }).catch((error) => {
          res.status(500).json({ message: 'Erreur lors de la créaation du pharmacy' });
        });
      } else {
        res.status(500).json({ message: 'identifiant invalide' });
      }
    }).catch((error) => {
      res.status(500).json({ message: 'Erreur lors l\'hébergement de l\'image' });
    });
  } else {
    if (email && password && email !== '' && password !== '') {
      auth.createUser({ email: email, password: password }).then((pharmacy) => {
        db.collection('pharmacy').doc(pharmacy.uid).create(req.body).then((result) => {
          res.status(201).json({ message: 'pharmacy créé avec succès' });
        }).catch((error) => {
          res.status(400).json({ message: 'Erreur lors de la créaation du pharmacy' });
        });
      }).catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la créaation du pharmacy' });
      });
    } else {
      res.status(500).json({ message: 'identifiant invalide' });
    }
  }
};

exports.createHospital = (req, res) => {
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