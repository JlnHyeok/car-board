const mysql = require('mysql')

const db = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '00000000',
  port : 3306,
  database: 'practice',  
})

module.exports = db