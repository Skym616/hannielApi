const admin = require('firebase-admin');

const serviceAccount = require('./hanniel-app-firebase-adminsdk-7h1xd-b808861f18.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
