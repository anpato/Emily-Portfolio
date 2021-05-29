'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('project_assets', {
      id: Sequelize.UUID,
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'file_name'
      },
      metadata: {
        type: Sequelize.JSONB,
        set: function (value) {
          return this.setDataValue(JSON.stringify(value))
        },
        get: function (field) {
          return JSON.parse(this.getDataValue(field))
        }
      },
      projectId: {
        type: Sequelize.UUID,
        field: 'project_id',
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'projects',
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('project_assets')
  }
}
