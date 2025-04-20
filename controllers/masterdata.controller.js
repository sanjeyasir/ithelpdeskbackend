const MasterDataRepo = require('../repositories/masterdata.repository');


const createMasterData = async (req, res) => {
  try {
    let data= req.body;
    const outcome = await MasterDataRepo.createNewMasterDataEntry(data);
    return res.status(200).json(outcome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const getMasterData = async (req, res) => {
    try {
      const outcome = await MasterDataRepo.getMasterData();
      return res.status(200).json(outcome);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const deleteMasterDataEntry = async (req, res) => {
    try {
      let data= req.body;
      const outcome = await MasterDataRepo.deleteMasterDataEntry(data);
      return res.status(200).json(outcome);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const getMasterCategories = async (req, res) => {
    try {
      const outcome = await MasterDataRepo.getAllCategories();
      return res.status(200).json(outcome);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const updateMasterData = async (req, res) => {
    try {
      let data= req.body;
      const outcome = await MasterDataRepo.updateMasterDataEntry(data);
      return res.status(200).json(outcome);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = {
   createMasterData,
   getMasterData,
   deleteMasterDataEntry,
   getMasterCategories,
   updateMasterData
};
