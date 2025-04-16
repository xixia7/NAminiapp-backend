
const { where } = require('sequelize');
const Factory = require('../model/factory.model')

class FactoryService {
    async createFactoryNaInfo(data) {
      // console.log(data)
      // data.push( { name: '新疆1', site: '777乌鲁木齐北京中路站', value: 75, date: '2023-09-03' })
        // 插入数据 
        try {
        // 通过bulkCreate批量插入
        // 使用 bulkCreate 方法批量插入用户对象
        // await Factory.bulkCreate(data)
        // await Factory.destroy({ truncate: true })
        for (const item of data) {
          await Factory.findOrCreate({
            where: { name: item.name, date: item.date },
            defaults: item
          });
        }
          console.log('批量插入成功')
        } catch (error) {
          console.error('操作失败', error);
        }
    }

    async getFactoryNaInfo(date, name, site, createDate) {
        const whereOpt = {}

        // id && Object.assign(whereOpt, { id })
        date && Object.assign(whereOpt, { date })
        name && Object.assign(whereOpt, { name })
        site && Object.assign(whereOpt, { site })
        createDate && Object.assign(whereOpt, { createDate })


        const res = await Factory.findAll({
          attributes: ['id', 'name', 'site', 'value', 'date', 'createDate'],
          where: whereOpt
        });
        let result = []
        res.map(x => result.push(x.dataValues))
        return res ? result : []
    }


}

module.exports = new FactoryService()