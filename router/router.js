const express = require('express');
const router = express.Router();
const ctrlPatient = require('../controller/controllerPatient');
const ctrlPharmacy = require('../controller/controllerPharmacy');
const ctrlHospital = require('../controller/controllerHospital');
const ctrlAdmin = require('../controller/controllerAdmin');
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

//Route pour le controller Patient
router.get('/', ctrlPatient.msg);
router.post('/patient/signIn', ctrlPatient.signIn);
router.post('/patient/signUp', ctrlPatient.signUp);
router.post('/patient/post', auth, multer, ctrlPatient.post);

//Route pour le controller Pharmacy
router.post("/pharmacy/signIn", ctrlPharmacy.signIn);
router.post("/pharmacy/signUp", ctrlPharmacy.signUp);
router.post("/pharmacy/medicament", auth, ctrlPharmacy.createMedicament);
router.put("/pharmacy/medicament/:idMedicament", auth, ctrlPharmacy.updateMedicament);
router.get("/pharmacy/medicament", auth, ctrlPharmacy.getAllMedicament);
router.get("/pharmacy/medicament/:idMedicament", auth, ctrlPharmacy.getOneMedicament);
router.delete("/pharmacy/medicament/:idMedicament", auth, ctrlPharmacy.deleteMedicament);

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
router.post("/admin/signIn", ctrlAdmin.signIn);
router.post("/admin/signUp", ctrlAdmin.signUp);
router.get("/admin/:idAdmin", auth, ctrlAdmin.getAdmin);
router.get('/admin/campaign', auth, ctrlAdmin.getAllCampaign);
router.get('/admin/campaign/:idCampaign', auth, ctrlAdmin.getOneCampaign);
router.get('/admin/patient', auth, ctrlAdmin.getAllPatient);
router.get('/admin/patient/:idPatient', auth, ctrlAdmin.getOnePatient);
router.get('/admin/medicament', auth, ctrlAdmin.getAllMedicament);
router.get('/admin/medicament/:idMedicament', auth, ctrlAdmin.getOneMedicament);
router.get('/admin/pharmacy', auth, ctrlAdmin.getAllPharmacy);
router.get('/admin/pharmacy/:idPharmacy', auth, ctrlAdmin.getOnePharmacy);
router.get('/admin/hospital', auth, ctrlAdmin.getAllHospital);
router.get('/admin/hospital/:idHospital', auth, ctrlAdmin.getOneHospital);


module.exports = router;