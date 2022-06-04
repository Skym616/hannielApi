const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routerPatient = require('./router/routerPatient');
const routerHospital = require('./router/routerHospital');
const routerAdmin = require('./router/routerAdmin');
const routerPharmacy = require('./router/routerPharmacy');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());

app.use('/patient', routerPatient);
app.use('/admin', routerAdmin);
app.use('/hospital', routerHospital);
app.use('/pharmacy', routerPharmacy);
app.use('images/', express.static(path.join(__dirname, 'images')));

module.exports = app;