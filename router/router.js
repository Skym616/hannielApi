const express = require('express');
const router = express.Router();
const ctrlPatient = require('../controller/controllerPatient');
const ctrlPharmacy = require('../controller/controllerPharmacy');
const ctrlHospital = require('../controller/controllerHospital');
const multer = require('../middleware/multerConfig');

//Route pour le controller Patient
router.get('/', ctrlPatient.msg);
router.post('/patient/signIn', ctrlPatient.signIn);
router.post('/patient/signUp', ctrlPatient.signUp);
//router.post('/patient/post', multer, ctrlPatient.post);

//Route pour le controller Pharmacy
router.post("/pharmacy/signIn", ctrlPharmacy.signIn);
router.post("/pharmacy/signUp", ctrlPharmacy.signUp);
router.post("/pharmacy/medicament", ctrlPharmacy.createMedicament);
router.put("/pharmacy/medicament/:idMedicament", ctrlPharmacy.updateMedicament);
router.get("/pharmacy/medicament", ctrlPharmacy.getAllMedicament);
router.get("/pharmacy/medicament/:idMedicament", ctrlPharmacy.getOneMedicament);
router.delete("/pharmacy/medicament/:idMedicament", ctrlPharmacy.deleteMedicament);

//Route pour le controller Hospital
router.post("/hospital/signIn", ctrlHospital.signIn);
router.post("/hospital/signUp", ctrlHospital.signUp);
router.post("/hospital/campaign", ctrlHospital.createCampaign);
router.get("/hospital/campaign", ctrlHospital.getAllCampaign);
router.get("/hospital/campaign/:idCampaign", ctrlHospital.getOneCampaign);
router.put("/hospital/campaign/:idCampaign", ctrlHospital.updateCampaign);
router.put("/hospital/:idHospital", ctrlHospital.updateHospital);
router.delete("/hospital/campaign/:idCampaign", ctrlHospital.deleteCampaign);


module.exports = router;