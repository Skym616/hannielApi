const express = require('express');
const router = express.Router();
const ctrlAdmin = require('../controller/controllerAdmin');
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

router.route('/signIn').post(ctrlAdmin.signIn);
router.route('/signUp').post(ctrlAdmin.signUp);
router.route('/:idAdmin').get(auth, ctrlAdmin.getAdmin);
router.route('/all/campaign').get(auth, ctrlAdmin.getAllCampaign);
router.route('/one/campaign/:idCampaign').get(auth, ctrlAdmin.getOneCampaign);
router.route('/all/patient').get(auth, ctrlAdmin.getAllPatient);
router.route('/one/patient/:idPatient').get(auth, ctrlAdmin.getOnePatient);
router.route('/all/medicament').get(auth, ctrlAdmin.getAllMedicament);
router.route('/one/medicament/:idMedicament').get(auth, ctrlAdmin.getOneMedicament);
router.route('/all/pharmacy').get(auth, ctrlAdmin.getAllPharmacy);
router.route('/one/pharmacy/:idPharmacy').get(auth, ctrlAdmin.getOnePharmacy);
router.route('/all/hospital').get(auth, ctrlAdmin.getAllHospital);
router.route('/one/hospital/:idHospital').get(auth, ctrlAdmin.getOneHospital);
router.route('/c/hospital').post(auth, ctrlAdmin.createHospital);
router.route('/d/hospital/:id').delete(auth, ctrlAdmin.deletePharmacy);
router.route('/c/pharmacy').post(auth, multer, ctrlAdmin.createPharmacy);

module.exports = router;