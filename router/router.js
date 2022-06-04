const express = require('express');
const router = express.Router();
const ctrlPatient = require('../controller/controllerPatient');
const ctrlPharmacy = require('../controller/controllerPharmacy');
const ctrlHospital = require('../controller/controllerHospital');
const ctrlAdmin = require('../controller/controllerAdmin');
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

//Route pour le controller Patient
router.route('/').get(ctrlPatient.msg);
router.route('/patient/signIn').post(ctrlPatient.signIn);
router.route('/patient/signUp').post(ctrlPatient.signUp);
router.route('/patient/post').post(auth, multer, ctrlPatient.post);

//Route pour le controller Pharmacy
router.route("/pharmacy/signIn").post(ctrlPharmacy.signIn);
router.route("/pharmacy/signUp").post(ctrlPharmacy.signUp);
router.route("/pharmacy/medicament").post(auth, ctrlPharmacy.createMedicament);
router.route("/pharmacy/medicament/:idMedicament").put(auth, ctrlPharmacy.updateMedicament);
router.route("/pharmacy/medicament").get(auth, ctrlPharmacy.getAllMedicament);
router.route("/pharmacy/medicament/:idMedicament").get(auth, ctrlPharmacy.getOneMedicament);
router.route("/pharmacy/medicament/:idMedicament").delete(auth, ctrlPharmacy.deleteMedicament);

//Route pour le controller Hospital
router.post("/hospital/signIn", ctrlHospital.signIn);
router.post("/hospital/signUp", ctrlHospital.signUp);
router.post("/hospital/campaign", auth, ctrlHospital.createCampaign);
router.get("/hospital/campaign", auth, ctrlHospital.getAllCampaign);
router.get("/hospital/campaign/:idCampaign", auth, ctrlHospital.getOneCampaign);
router.put("/hospital/campaign/:idCampaign", auth, ctrlHospital.updateCampaign);
router.put("/hospital/:idHospital", auth, ctrlHospital.updateHospital);
router.delete("/hospital/campaign/:idCampaign", auth, ctrlHospital.deleteCampaign);

//Route pour le controller admin
router.route("/administration/signIn").post(ctrlAdmin.signIn);
router.route("/administration/signUp").post(ctrlAdmin.signUp);
router.route("/administration/:idAdmin").get(auth, ctrlAdmin.getAdmin);
router.route('/administration/campaign').get(auth, ctrlAdmin.getAllCampaign);
router.route('/administration/campaign/:idCampaign').get(auth, ctrlAdmin.getOneCampaign);
router.route('/administration/patient').get(auth, ctrlAdmin.getAllPatient);
router.route('/administration/patient/:idPatient').get(auth, ctrlAdmin.getOnePatient);
router.route('/administration/medicament').get(auth, ctrlAdmin.getAllMedicament);
router.route('/administration/medicament/:idMedicament').get(auth, ctrlAdmin.getOneMedicament);
router.route('/administration/pharmacy').get(auth, ctrlAdmin.getAllPharmacy);
router.route('/administration/pharmacy/:idPharmacy').get(auth, ctrlAdmin.getOnePharmacy);
router.route('/administration/hospital').get(auth, ctrlAdmin.getAllHospital);
router.route('/administration/hospital/:idHospital').get(auth, ctrlAdmin.getOneHospital);

module.exports = router;