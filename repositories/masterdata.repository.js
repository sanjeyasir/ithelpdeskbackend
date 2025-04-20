const db = require('../models');
const MasterData = db.MasterData;


const createNewMasterDataEntry = async (data) => {
    try {
      let outcomes= await MasterData.findAll();
      let newEntry;
      if(outcomes.length==0){
        newEntry = await MasterData.create({
            category:"GENCODE",
            code:data.code,
            description:data.description,
            created_by:data.created_by
        });
      }else{
        newEntry = await MasterData.create({
            category:data.category,
            code:data.code,
            description:data.description,
            created_by:data.created_by
        });
      }
      return 'success';
    } catch (err) {
      console.error('Error creating master data entry:', err);
      throw new Error('Failed to create master data entry');
    }
};

const getMasterData = async () => {
  try {
    let masterdata= await MasterData.findAll();
    return masterdata;
  } catch (err) {
    console.error('Error getting master data entry:', err);
    throw new Error('Failed to get master data entry');
  }
};

const getAllCategories = async () => {
  try {
    let outcomes= await MasterData.findAll({
      where: { category: "GENCODE"}
    });
    return outcomes;
  } catch (err) {
    console.error('Error getting categories from master data :', err);
    throw new Error('Failed to get categories from master');
  }
};

const deleteMasterDataEntry = async (data) => {
  try {
    const record = await MasterData.findOne({
      where: { id: data.id }
    });

    if (!record) {
      throw new Error(`Record with id ${data.id} not found`);
    }

    if (record.category === "GENCODE") {
      await MasterData.destroy({
        where: { category: record.code }
      });
      await record.destroy();
    } else {
      await record.destroy();
    }

    return 'success';
  } catch (err) {
    console.error('Error deleting master data entry:', err.message);
    throw new Error('Failed to delete master data entry');
  }
};


const updateMasterDataEntry = async (data) => {
  try {
    const record = await MasterData.findOne({
      where: { id: data.id }
    });

    if (!record) {
      throw new Error(`Record with id ${data.id} not found`);
    }

    await MasterData.update(
      {
        code: data.code,
        description: data.description
      },
      {
        where: { id: data.id }
      }
    ); 

    return 'success';
  } catch (err) {
    console.error('Error updating master data entry:', err);
    throw new Error('Failed to update master data entry');
  }
};

  


module.exports = {
    createNewMasterDataEntry,
    getMasterData,
    deleteMasterDataEntry,
    getAllCategories,
    updateMasterDataEntry

};