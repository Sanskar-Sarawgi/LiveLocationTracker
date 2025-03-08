'use strict';
import { Model } from 'sequelize'

class teamManager extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      team_uuid: DataTypes.UUID,
      user_account_uuid: DataTypes.UUID,
      is_default_team:  DataTypes.SMALLINT,
    }, {
      sequelize,
      modelName: 'teamManager',
      tableName: 'team_managers',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }

  static associate(models) {
    // define association here
  }
}

export default teamManager