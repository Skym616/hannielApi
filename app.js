const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./router/router');

app.use(bodyParser.json());
app.use(cors());

app.use('/hanniel',router);

module.exports = app;