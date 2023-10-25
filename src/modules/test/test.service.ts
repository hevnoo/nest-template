import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { sequelize } from '../../config/database';
import { Users } from '../../config/models/users.model';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}
  private readonly cats: string[] = [];

  async findAll(params): Promise<object> {
    const currentPage = Number(params.currentPage || 1);
    const pageSize = Number(params.pageSize || 10);
    const limit = pageSize; // 每页显示的记录数
    const offset = (currentPage - 1) * pageSize; // 偏移量
    const conditions = [];
    const conditionsOr = [];
    if (params['username']) {
      // [Op.in]: ['aaa', 'bbb', 'ccc']
      //   where['username'] = {
      //     [Op.like]: `%${params.username}%`,
      //   };
      conditions.push({ username: { [Op.like]: `%${params.username}%` } });
    }
    if (params['id']) {
      conditions.push({ id: { [Op.eq]: params.id } });
    }
    if (params['nickname']) {
      conditions.push({ nickname: { [Op.like]: `%${params.nickname}%` } });
    }
    if (params['role']) {
      conditions.push({ role: { [Op.eq]: params.role } });
    }
    let where = {};
    if (conditions.length) {
      where = {
        ...where,
        [Op.and]: conditions,
      };
    }
    if (conditionsOr.length) {
      where = {
        ...where,
        [Op.or]: conditionsOr,
      };
    }

    console.log('where:', where);

    const [data, totalCount] = await Promise.all([
      this.usersModel.findAll({ where, limit, offset }),
      this.usersModel.count({ where }),
    ]);
    // const data = await Users.findAll({ where, limit, offset });
    // const totalCount = await Users.count(); //数据总数
    const total = data.length;
    return {
      code: 200,
      msg: '获取成功',
      data,
      total,
      totalCount,
    };
  }

  //   async findAll(): Promise<object> {
  //     const [results] = await sequelize.query('SELECT * FROM user');
  //     return { code: 200, msg: '获取成功', data: results };
  //   }

  create() {
    this.cats.push('cart1');
    return { code: 200, msg: '获取成功', data: this.cats };
  }
}
