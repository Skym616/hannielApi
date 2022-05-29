const admin = require('../admin');
const db = admin.firestore();
const auth = admin.auth();

exports.signIn = (req, res) => {
    const {email, password} = req.body;
    auth.getUserByEmail(email).then((pharmacy) => {
        db.collection("pharmacy").doc(pharmacy.uid).get().then((pharmacy) => {
            res.status(200).json(pharmacy.data());
        }).catch((error) => {
            res.status(404).json({message: "pharmacy non trouvé"})
        })
    }).catch((error) => {
        res.status(500).json({message: "pharmacy non trouvé ou invalide"})
    });
};

exports.signUp = (req, res) => {
    const {email, password} = req.body;
    auth.createUser({email: email, password: password}).then((pharmacy) => {
        const {password, ...obj} = req.body;
        const newPharmacy = {...obj, pharmacyId: pharmacy.uid}
        db.collection('pharmacy').doc(pharmacy.uid).create(
            newPharmacy
        ).then((result) => {
            res.status(201).json({message: "pharmacy créé avec succès"});
        }).catch((error) => {
            res.status(400).json({message: "erreur lié a firestore"});
        });
    }).catch((error) => {
        res.status(500).json("Erreur lié au serveur d'authentification");
    });
};

exports.createMedicament = (req, res) => {
    db.collection('medicament').add(req.body).then((result) => {
        res.status(201).json({message: "Medicament ajouté avec succèss"});
    }).catch((error) => {
        res.status(400).json({message: "Erreur lors de l'ajout du medicament"});
    })
};

exports.updateMedicament = (req, res) => {
    const {idMedicament} = req.params;
    db.collection("medicament").doc(idMedicament).update(
        req.body
    ).then((result) => {
        res.status(201).json({message: "Medicament mis à jour avec succès"})
    }).catch((error) => {
        res.status(400).json({message: "Erreur lors de la mise à jour du médicament"});
    })
};

exports.getAllMedicament = (req, res) => {
    let medicamentTab = [];
    db.collection("medicament").get().then((result) => {
        result.docs.forEach((doc) => {
            const medicament = {...doc.data(), ...{id: doc.id}};
            medicamentTab.push(medicament)
        })
        res.status(200).json({message: medicamentTab});
    }).catch((error) => {
        res.status(404).json({message: "Erreur lors de la recupération des médicaments"})
    });
};

exports.getOneMedicament = (req, res) => {
    const {idMedicament} = req.params;
    db.collection("medicament").doc(idMedicament).get().then((result) => {
        res.status(200).json({message: result.data()});
    }).catch((error) => {
        res.status(404).json({message: "Erreur lors de l'obtention du médicament"})
    })
}

exports.deleteMedicament = (req, res) => {
    const {idMedicament} = req.params;
    db.collection("medicament").doc(idMedicament).delete().then(() => {
        res.status(200).json({message: "Medicament supprimé avec succès"})
    }).catch(() => {
        res.status(404).json({message: "Erreur lors de la suppression du Medicament"})
    })
}