const defineMasterDataModel = (sequelize, DataTypes) => {
    const MasterData = sequelize.define('tbl_master_data', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by:{
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      created_date:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'tbl_master_data',
      timestamps: false,
    });
  
    return MasterData;
  };
  
module.exports = defineMasterDataModel;
  
  