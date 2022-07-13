const admin = require('../admin');
const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();
const fs = require('fs');
const cloudinary = require('../utils/cloudinaryConfig');
const jwt = require('jsonwebtoken');

exports.msg = (req, res) => {
  res.status(200).send('welcome');
};

exports.signUp = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email && password && email !== '' && password !== '') {
    auth.createUser({ email: email, password: password }).then((patient) => {
      db.collection('patient').doc(patient.uid).create(req.body).then((result) => {
        res.status(201).json({ message: 'Patient créé avec succès' });
      }).catch((error) => {
        res.status(400).json({ message: 'Erreur lors de la créaation du patient fire' });
      });
    }).catch((error) => {
      res.status(500).json({ message: 'Erreur lors de la créaation du patient auth' });
    });
  } else {
    res.status(500).json({ message: 'identifiant invalide' });
  }
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  auth.getUserByEmail(email).then((patient) => {
    db.collection('patient').doc(patient.uid).get().then((result) => {
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

exports.update = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { userId } = req.params;
  console.log(userId);
  if (req.file) {
    cloudinary.uploader.upload(req.file.path).then((response) => {
      const newPatient = { ...req.body, image: response.secure_url };
      db.collection('patient').doc(userId).update(newPatient).then((result) => {
        res.status(201).json({ message: 'user update avec succès' });
      }).catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la user du campaign' });
      });
    }).catch((error) => {
      console.log(error);
      console.log('update user hébergement invalide');
      res.status(500).json({ message: 'Erreur lors l\'hébergement de l\'image' });
    });
  } else {
    db.collection('patient').doc(userId).update(JSON.parse(req.body)).then((result) => {
      res.status(201).json({ message: 'id créé avec succès' });
    }).catch((error) => {
      res.status(500).json({ message: 'Erreur lors de l\'update du profil' });
    });
  }
};

exports.post = (req, res) => {
  console.log(req.body);
  if (req.file) {
    cloudinary.uploader.upload(req.file.path).then((response) => {
      res.send('upload sucess');
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  } else {
    console.log(req.body);
  }
};

exports.getOnePatient = (req, res) => {
  console.log('ici patient');
  const { idPatient } = req.params;
  console.log(idPatient);
  db.collection('patient').doc(idPatient).get().then((patient) => {
    res.status(200).json({ message: patient.data() });
  }).catch((error) => {
    res.status(404).json({ message: 'Utilisateur introuvable ou erreur serveur' });
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

exports.getAllMedecin = (req, res) => {
  let tab = [];
  db.collection('medecin').get().then((response) => {
    response.forEach((medecin) => {
      const obj = { ...medecin.data(), id: medecin.id };
      tab.push(obj);
    });
    res.status(200).json({ message: tab });
  }).catch((error) => {
    res.status(404).json({ message: 'Une erreur s\'est produite lors de l\'obtention des medecins' });
  });
};

