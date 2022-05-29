const admin = require('../admin');
const db = admin.firestore();
const auth = admin.auth();

exports.signIn = (req, res) => {
    const {email, password} = req.body;
    auth.getUserByEmail(email).then((hospital) => {
        db.collection("hospital").doc(hospital.uid).get().then((hospital) => {
            res.status(200).json(hospital.data());
        }).catch((error) => {
            res.status(404).json({message: "hospital non trouvé"})
        })
    }).catch((error) => {
        res.status(500).json({message: "hospital non trouvé ou invalide"})
    });
};

exports.signUp = (req, res) => {
    const {email, password} = req.body;
    auth.createUser({email: email, password: password}).then((hospital) => {
        const {password, ...obj} = req.body;
        const newHospital = {...obj, hospitalId: hospital.uid}
        db.collection('hospital').doc(hospital.uid).create(
            newHospital
        ).then((result) => {
            res.status(201).json({message: "hospital créé avec succès"});
        }).catch((error) => {
            res.status(400).json({message: "erreur lié a firestore"});
        });
    }).catch((error) => {
        res.status(500).json("Erreur lié au serveur d'authentification");
    });
};

exports.updateHospital = (req, res) => {
    const {idHospital} = req.params;
    db.collection('hospital').doc(idHospital).update(req.body).then((result) => {
        res.status(201).json({message: 'Hopital mis à jour avec succès'});
    }).catch(() => {
        res.status(400).json({message: 'Erreur lors de la mise à jour de l\'hopital'});
    });
};

exports.createCampaign = (req, res) => {
    db.collection('campaign').add(req.body).then((result) => {
        res.status(201).json({message: "campagne créé avec succès"});
    }).catch((error) => {
        res.status(400).json({message: "Erreur lors de la création de  la campagne"});
    });
};

exports.getOneCampaign = (req, res) => {
    const {idCampaign} = req.params;
    db.collection('campaign').doc(idCampaign).get().then((result) => {
        res.status(201).json({message: result.data()});
    }).catch((error) => {
        res.status(400).json({message: "Erreur lors de l'obtention de  la campagne"});
    });
};

exports.getAllCampaign = (req, res) => {
    let campaignTab = [];
    db.collection("campaign").get().then((result) => {
        result.docs.forEach((doc) => {
            const campaign = {...doc.data(), ...{id: doc.id}};
            campaignTab.push(campaign)
        });
        res.status(200).json({message: campaignTab});
    }).catch((error) => {
        res.status(404).json({message: "Erreur lors de la recupération des campagnes"})
    });
}

exports.updateCampaign = (req, res) => {
    const {idCampaign} = req.params;
    db.collection("campaign").doc(idCampaign).update(req.body).then((result) => {
        res.status(201).json({message: "Campagne mis à jour avec succès"});
    }).catch((error) => {
        res.status(400).json({message: "Erreur lors de la mise à jour de la campagne"});
    });
};

exports.deleteCampaign = (req, res) => {
    const {idCampaign} = req.params;
    db.collection("campaign").doc(idCampaign).delete().then((result) => {
        res.status(200).json({message: "Campaigne supprimé avec succès"});
    }).catch((error) => {
        res.status(404).json({message: "Erreur lors de la suppression de la campagne"})
    });
};
