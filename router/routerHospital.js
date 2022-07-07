const express = require('express');
const router = express.Router();
const ctrlHospital = require('../controller/controllerHospital');
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

router.post('/signIn', ctrlHospital.signIn);
router.post('/signUp', ctrlHospital.signUp);
router.put('/:idHospital', auth, ctrlHospital.updateHospital);
router.post('/c/campaign', auth, multer, ctrlHospital.createCampaign);
router.get('/a/campaign/:idHospital', auth, ctrlHospital.getAllCampaign);
router.get('/g/campaign/:idCampaign', auth, ctrlHospital.getOneCampaign);
router.put('/u/campaign/:idCampaign', auth, multer, ctrlHospital.updateCampaign);
router.delete('/d/campaign/:idCampaign', auth, ctrlHospital.deleteCampaign);
router.get('/g/medecin/:idMedecin', auth, ctrlHospital.getOneMedecin);
router.get('/a/medecin/:idHospital', auth, ctrlHospital.getAllMedecin);
router.post('/c/medecin', auth, multer, ctrlHospital.createMedecin);
router.delete('/d/medecin/:idMedecin', auth, ctrlHospital.deleteMedecin);

module.exports = router;