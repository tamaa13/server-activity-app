'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.Activity)
      Project.belongsTo(models.User)
    }
  }
  Project.init({
    project:{
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'Project is required'
        },
        notEmpty : {
          args : true,
          msg : 'Project is required'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};