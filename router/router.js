const express = require('express');
const router = express.Router();
const ctrl = require('../controller/controller');

router.post('/users',ctrl.postUser);
router.get('/users',ctrl.getUsers);

module.exports = router;