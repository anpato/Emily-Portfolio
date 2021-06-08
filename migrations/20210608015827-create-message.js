'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      senderEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'sender_email',
        validate: {
          isEmail: true
        }
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      unread: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      senderName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'sender_name'
      },
      userId: {
        type: Sequelize.UUID,
        field: 'user_id',
        references: {
          model: 'users',
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
    await queryInterface.dropTable('messages')
  }
}
