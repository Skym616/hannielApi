const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./router/router');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());

app.use('/', router);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;