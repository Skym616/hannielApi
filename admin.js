const admin = require('firebase-admin');

const serviceAccount = require('./teemesapp-firebase-adminsdk-ypeja-13003843d0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
