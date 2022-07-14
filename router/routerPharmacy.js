const express = require('express');
const router = express.Router();
const multer = require('../middleware/multerConfig');
const ctrlPharmacy = require('../controller/controllerPharmacy');
const auth = require('../middleware/auth');

router.route('/signIn').post(ctrlPharmacy.signIn);
router.route('/signUp').post(ctrlPharmacy.signUp);
router.route('/c/medicament').post(auth, ctrlPharmacy.createMedicament);
router.route('/u/medicament/:idMedicament').put(auth, ctrlPharmacy.updateMedicament);
router.route('/a/medicament/:idPharmacy').get(auth, ctrlPharmacy.getAllMedicament);
router.route('/g/medicament/:idMedicament').get(auth, ctrlPharmacy.getOneMedicament);
router.route('/d/medicament/:idMedicament').delete(auth, ctrlPharmacy.deleteMedicament);

module.exports = router;