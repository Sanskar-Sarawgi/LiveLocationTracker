'use strict';
import { Model } from 'sequelize'

class teamUser extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      user_account_uuid: DataTypes.UUID,
      team_uuid: DataTypes.UUID,
    }, {
      sequelize,
      modelName: 'teamUser',
      tableName: 'team_users',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }

  static associate(models) {
    // define association here
  }
}

export default teamUser