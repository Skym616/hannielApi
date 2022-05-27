const express = require('express');
const router = express.Router();
const ctrlUser = require('../controller/controllerUser');
const ctrlPharmacy = require('../controller/controllerPharmacy');
const ctrlMedecin = require('../controller/controllerMedecin');

//Route pour le controller User
router.get('/', ctrlUser.msg);
router.post('/users', ctrlUser.postUser);
router.get('/users', ctrlUser.getUsers);

//Route pour le controller Pharmacy
router.post("/pharmacy/signIn", ctrlPharmacy.signIn);
router.post("/pharmacy/signUp", ctrlPharmacy.signUp);
router.post("/pharmacy/medicament", ctrlPharmacy.createMedicament);
router.put("/pharmacy/medicament/:idMedicament", ctrlPharmacy.updateMedicament);
router.get("/pharmacy/medicament", ctrlPharmacy.getAllMedicament);
router.get("/pharmacy/medicament/:idMedicament", ctrlPharmacy.getOneMedicament);
router.delete("/pharmacy/medicament/:idMedicament", ctrlPharmacy.deleteMedicament);

//Route pour le controller Hospital


module.exports = router;