import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Table({
  tableName: 'users',
  timestamps: true, // 默认true。true时会带createdAt、updatedAt字段查表
})
export class Users extends Model {
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true, //自增
    primaryKey: true, //主键
    unique: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  nickname: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  })
  email: string;
}
