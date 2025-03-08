'use strict';
import { Model } from 'sequelize'

class team extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      account_uuid: DataTypes.UUID,
      is_default: DataTypes.SMALLINT,
    }, {
      sequelize,
      modelName: 'team',
      tableName: 'teams',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }

  static associate(models) {
    // define association here
  }
}

export default team