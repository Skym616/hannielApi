const admin = require("../admin");
const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();
const fs = require('fs');
const cloudinary = require('../utils/cloudinaryConfig');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    if (email && password && email !== "" && password !== "") {
        auth.createUser({email: email, password: password}).then((admin) => {
            db.collection('admin').doc(admin.uid).create(req.body).then((result) => {
                res.status(201).json({message: "admin créé avec succès"})
            }).catch((error) => {
                res.status(400).json({message: "Erreur lors de la création du admin fire"})
            });
        }).catch((error) => {
            res.status(500).json({message: "Erreur lors de la création du admin auth"});
        });
    } else {
        res.status(500).json({message: "identifiant invalide"});
    }
};

exports.signIn = (req, res) => {
    const {email, password} = req.body;
    auth.getUserByEmail(email).then((admin) => {
        db.collection('admin').doc(admin.uid).get().then((result) => {
            if (result.data().password === password) {
                res.status(200).json({
                    userId: result.id,
                    token: jwt.sign({userId: result.id}, 'RAMDOM_SECRET_KEY')
                });
            } else {
                res.status(404).json({message: "Mot de passe invalide"});
            }
        }).catch((error) => {
            res.status(404).json({message: "Patient n'a aucune correspondance"});
        })
    }).catch((error) => {
        res.status(404).json({message: "Email ne invalide"});
    });
};

exports.getAllCampaign = (req, res) => {
    let tab = [];
    db.collection('campaign').get().then((response) => {
        response.forEach((campaign) => {
            const obj = {...campaign.data(), id: campaign.id};
            tab.push(obj);
        })
        res.status(200).json({message: tab});
    }).catch((error) => {
        res.status(404).json({message: "Une erreur s'est produite lors de l'obtention des campagnes"});
    });
};

exports.getOneCampaign = (req, res) => {
    const {idCampaign} = req.params;
    db.collection('campaign').doc(idCampaign).get().then((response) => {
        const campaign = {...response.data(), id: response.id};
        res.status(200).json({message: campaign});
    }).catch((error) => {
        console.log("ici");
        res.status(404).json({message: "Une erreur s'est produite lors de l'obtention de la campagne"});
    });
};
