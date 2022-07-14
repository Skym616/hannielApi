const admin = require('firebase-admin');

const serviceAccount = require('./teemesapp-firebase-adminsdk-ypeja-9b13b9aa97.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
