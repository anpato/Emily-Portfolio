'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      senderEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'sender_email',
        validate: {
          isEmail: true
        }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      unread: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      senderName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'sender_name'
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages'
    }
  )
  return Message
}
