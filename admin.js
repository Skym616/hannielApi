const admin = require("firebase-admin");

const serviceAccount = require("./hanniel-app-firebase-adminsdk-7h1xd-2bf4b6d0f9.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
