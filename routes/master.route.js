const express = require('express');
const router = express.Router();
const MasterController = require('../controllers/masterdata.controller');


router.post('/masterdata/createNew', MasterController.createMasterData);
router.get('/masterdata/getMasterData', MasterController.getMasterData);
router.post('/masterdata/deleteMasterData', MasterController.deleteMasterDataEntry);
router.get('/masterdata/getCategories', MasterController.getMasterCategories);
router.post('/masterdata/updateMasterData', MasterController.updateMasterData);





module.exports = router;
