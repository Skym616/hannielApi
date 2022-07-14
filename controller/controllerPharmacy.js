const admin = require('../admin');
const jwt = require('jsonwebtoken');
const db = admin.firestore();
const auth = admin.auth();

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  auth.getUserByEmail(email).then((pharmacy) => {
    db.collection('pharmacy').doc(pharmacy.uid).get().then((result) => {
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
};

exports.createMedicament = (req, res) => {
  console.log(req.body);
  db.collection('medicament').add(req.body).then((result) => {
    res.status(201).json({ message: 'Medicament ajouté avec succèss' });
  }).catch((error) => {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du medicament' });
  });
};

exports.updateMedicament = (req, res) => {
  const { idMedicament } = req.params;
  db.collection('medicament').doc(idMedicament).update(
    req.body
  ).then((result) => {
    res.status(201).json({ message: 'Medicament mis à jour avec succès' });
  }).catch((error) => {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du médicament' });
  });
};

exports.getAllMedicament = (req, res) => {
  let medicamentTab = [];
  db.collection('medicament').get().then((result) => {
    result.docs.forEach((doc) => {
      const medicament = { ...doc.data(), ...{ id: doc.id } };
      medicamentTab.push(medicament);
    });
    res.status(200).json({ message: medicamentTab });
  }).catch((error) => {
    res.status(404).json({ message: 'Erreur lors de la recupération des médicaments' });
  });
};

exports.getOneMedicament = (req, res) => {
  const { idMedicament } = req.params;
  db.collection('medicament').doc(idMedicament).get().then((result) => {
    res.status(200).json({ message: result.data() });
  }).catch((error) => {
    res.status(404).json({ message: 'Erreur lors de l\'obtention du médicament' });
  });
};

exports.deleteMedicament = (req, res) => {
  const { idMedicament } = req.params;
  db.collection('medicament').doc(idMedicament).delete().then(() => {
    res.status(200).json({ message: 'Medicament supprimé avec succès' });
  }).catch(() => {
    res.status(404).json({ message: 'Erreur lors de la suppression du Medicament' });
  });
};