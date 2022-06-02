const admin = require("../admin");
const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();
const fs = require('fs');
const cloudinary = require('../utils/cloudinaryConfig');
const jwt = require("jsonwebtoken");

exports.msg = (req, res) => {
    res.status(200).send("welcome");
}

exports.signUp = (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    if (email && password && email !== "" && password !== "") {
        auth.createUser({email: email, password: password}).then((patient) => {
            db.collection('patient').doc(patient.uid).create(req.body).then((result) => {
                res.status(201).json({message: "Patient créé avec succès"})
            }).catch((error) => {
                res.status(400).json({message: "Erreur lors de la créaation du patient fire"})
            });
        }).catch((error) => {
            res.status(500).json({message: "Erreur lors de la créaation du patient auth"});
        });
    } else {
        res.status(500).json({message: "identifiant invalide"});
    }
};

exports.signIn = (req, res) => {
    const {email, password} = req.body;
    auth.getUserByEmail(email).then((patient) => {
        db.collection('patient').doc(patient.uid).get().then((result) => {
            if (result.data().password === password) {
                const user = {...result.data(), id: result.id}
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

exports.post = (req, res) => {
    console.log(process.env.CLOUDINARY_API_KEY);
    console.log(req.body.name);
    if (req.file) {
        cloudinary.uploader.upload(req.file.path).then((response) => {
            res.send("upload sucess");
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    } else {
        console.log(req.body);
    }
}