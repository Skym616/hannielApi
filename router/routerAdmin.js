const express = require('express');
const router = express.Router();
const ctrlAdmin = require('../controller/controllerAdmin');
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

router.route('/signIn').post(ctrlAdmin.signIn);
router.route('/signUp').post(ctrlAdmin.signUp);
router.route('/:idAdmin').get(auth, ctrlAdmin.getAdmin);
router.route('/campaign').get(ctrlAdmin.getAllCampaign);
router.route('/campaign/:idCampaign').get(auth, ctrlAdmin.getOneCampaign);
router.route('/patient').get(auth, ctrlAdmin.getAllPatient);
router.route('/patient/:idPatient').get(auth, ctrlAdmin.getOnePatient);
router.route('/medicament').get(auth, ctrlAdmin.getAllMedicament);
router.route('/medicament/:idMedicament').get(auth, ctrlAdmin.getOneMedicament);
router.route('/pharmacy').get(auth, ctrlAdmin.getAllPharmacy);
router.route('/pharmacy/:idPharmacy').get(auth, ctrlAdmin.getOnePharmacy);
router.route('/hospital').get(auth, ctrlAdmin.getAllHospital);
router.route('/hospital/:idHospital').get(auth, ctrlAdmin.getOneHospital);

module.exports = router;