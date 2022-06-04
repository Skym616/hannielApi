const express = require('express');
const router = express.Router();
const ctrlPatient = require('../controller/controllerPatient');
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

router.route('/').get(ctrlPatient.msg);
router.route('/signIn').post(ctrlPatient.signIn);
router.route('/signUp').post(ctrlPatient.signUp);
router.route('/post').post(auth, multer, ctrlPatient.post);

module.exports = router;