const admin = require('firebase-admin');

const serviceAccount = require('./hanniel-app-firebase-adminsdk-7h1xd-ded869e69b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
