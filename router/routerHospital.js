const express = require('express');
const router = express.Router();
const ctrlHospital = require('../controller/controllerHospital');
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

router.post('/signIn', ctrlHospital.signIn);
router.post('/signUp', ctrlHospital.signUp);
router.put('/:idHospital', auth, ctrlHospital.updateHospital);
router.post('/campaign', auth, multer, ctrlHospital.createCampaign);
router.get('/campaign', auth, ctrlHospital.getAllCampaign);
router.get('/campaign/:idCampaign', auth, ctrlHospital.getOneCampaign);
router.put('/campaign/:idCampaign', auth, multer, ctrlHospital.updateCampaign);
router.delete('/campaign/:idCampaign', auth, ctrlHospital.deleteCampaign);

module.exports = router;