
module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('tbl_user', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active:{
        type:DataTypes.BIGINT,
        allowNull:false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_by:{
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      created_date:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'tbl_user',
      timestamps: false
    });
  
    return User;
};
  