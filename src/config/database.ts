import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'second_hand',
});

//同步所有模型字段
// async function syncModels() {
//   try {
//     // await Users.sync();
//     await sequelize.sync({ force: true });
//   } catch (error) {
//     console.error('模型同步失败', error);
//   }
// }
// syncModels();

// { force: true } 参数将强制 Sequelize 删除现有的表（如果存在），然后重新创建它。
