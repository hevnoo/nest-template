// 创建 Sequelize 模型来映射到数据库表

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class Users extends Model {
  public id!: number;
  public username!: string;
  public nickname!: string;
  public role!: string;
  public email!: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    modelName: 'Users',
    tableName: 'users',
  },
);

// async function syncModels() {
//   try {
//     // await Users.sync();
//     await Users.sync({ force: true });
//   } catch (error) {
//     console.error('模型同步失败', error);
//   }
// }
// syncModels();

export default Users;
