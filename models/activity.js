'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.Project)
      Activity.belongsTo(models.User)
    }
  }
  Activity.init({
    activity: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Activity is required'
        },
        notEmpty: {
          args: true,
          msg: 'Activity is required'
        }
      }
    },
    tanggalMulai: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Start date is required'
        }
      }
    },
    tanggalBerakhir: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'End date is required'
        }
      }
    },
    waktuMulai: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Start time is required'
        }
      }
    },
    waktuBerakhir: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'End time is required'
        }
      }
    },
    durasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Duration is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'User is required'
        }
      }
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'User is required'
        }
      }
    },

  }, {
    sequelize,
    modelName: 'Activity',
    hooks: {
      beforeCreate: (activity, options) => {
        // Mengubah format tanggal mulai dan tanggal berakhir menjadi "yyyy-mm-dd"
        activity.tanggalMulai = activity.tanggalMulai.toISOString().split('T')[0];
        activity.tanggalBerakhir = activity.tanggalBerakhir.toISOString().split('T')[0];
      }
    }
  });

  return Activity;
};