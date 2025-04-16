const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const { QueryTypes } = require('sequelize')


// 创建模型(Model zd_user -> 表 zd_users)
const Factory = seq.define('factory', {
  // id 会被sequelize自动创建, 管理
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: '电厂',
    defaultValue: '',
  },
  site: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: '地点',
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
  },
  createDate: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '创建时间时间',
    defaultValue: ''
  }
})



Factory.sync({ alter: true })



module.exports = Factory