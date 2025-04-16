const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const { QueryTypes } = require('sequelize')


// 创建模型(Model zd_user -> 表 zd_users)
const City = seq.define('city', {
  // id 会被sequelize自动创建, 管理
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: '城市名称',
    defaultValue: '',
  },
  site: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: '站点',
    defaultValue: '',
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: true,
    unique: false,
    comment: '核辐射数值'

  },
  date: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '时间',
    defaultValue: ''
  },
  createDate: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '创建时间',
    defaultValue: ''
  }
})


// const tableExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'city')"
// const tableExistsResult = seq.query(tableExistsQuery, { type: QueryTypes.SELECT })
// const tableExists = tableExistsResult[0]['exists']

// if (tableExists) {
//   console.log('表已存在，无需创建')
// } else {
//   // 执行创建表的操作
//   // 强制同步数据库(创建数据表)
  City.sync({ alter: true })
// }


module.exports = City