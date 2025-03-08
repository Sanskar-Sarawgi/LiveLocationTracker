'use strict';
import { Model } from 'sequelize'

class user extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      phone_no: DataTypes.BIGINT,
      thumbnail: DataTypes.STRING,
      age: DataTypes.SMALLINT,
      gender: DataTypes.SMALLINT,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      falcon_id: DataTypes.SMALLINT,
      accept_terms: DataTypes.SMALLINT,
      mobicip_user_id: DataTypes.SMALLINT,
      receive_newsletters: DataTypes.SMALLINT,
      location: DataTypes.STRING,
      time_zone: DataTypes.STRING,
      avatar_uuid: DataTypes.STRING,
      birth_date: DataTypes.SMALLINT,
      tz_migration: DataTypes.SMALLINT
    }, {
      sequelize,
      modelName: 'user',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }

  static associate(models) {
    // define association here
  }
}

export default user