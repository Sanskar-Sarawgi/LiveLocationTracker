'use strict';
import { Model } from 'sequelize'

class userAccount extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      account_status_id: DataTypes.SMALLINT,
      user_uuid: DataTypes.UUID,
      account_uuid: DataTypes.UUID,
      campaign_uuid: DataTypes.UUID,
      qr_code: DataTypes.STRING,
      last_account_viewed_time: DataTypes.INTEGER,
      name: DataTypes.STRING,
      falcon_id: DataTypes.SMALLINT,
      meta_data: DataTypes.STRING,
      icloud_user_info: DataTypes.JSON,
      invited_by: DataTypes.UUID,
      stripe_customer_id: DataTypes.STRING,
      last_report_view_time: DataTypes.JSON,
      migrated: DataTypes.SMALLINT
    }, {
      sequelize,
      modelName: 'userAccount',
      tableName: 'user_accounts',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }

  static associate(models) {
    // define association here
  }
}

export default userAccount