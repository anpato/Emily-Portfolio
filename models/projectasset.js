'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProjectAsset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectAsset.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'project'
      })
    }
  }
  ProjectAsset.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'file_name'
      },
      metadata: {
        type: DataTypes.JSONB,
        set: function (value) {
          return this.setDataValue(JSON.stringify(value))
        },
        get: function (field) {
          return this.getDataValue(field)
        }
      },
      projectId: {
        type: DataTypes.UUID,
        field: 'project_id',
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'projects',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'ProjectAsset',
      tableName: 'project_assets'
    }
  )
  return ProjectAsset
}
