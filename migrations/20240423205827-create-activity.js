'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggalMulai: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tanggalBerakhir: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      waktuMulai: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      waktuBerakhir: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      durasi: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id' 
        }
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activities');
  }
};