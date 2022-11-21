const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createPool({
  host : process.env.HOST,
  user : process.env.USER,
  password : process.env.PW,
  port : 3306,
  database: process.env.DATABASE,  
  timezone:'Asia/Seoul',
})

module.exports = db