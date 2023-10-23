// 创建 Sequelize 模型来映射到数据库表

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class User extends Model {
  public id!: number;
  public username!: string;
  public nickname!: string;
  public role!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  },
);

export default User;
