// 创建 Sequelize 模型来映射到数据库表

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class Article extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Article',
    tableName: 'article',
  },
);

export default Article;
