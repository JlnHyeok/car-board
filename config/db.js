const mysql = require('mysql')

const db = mysql.createPool({
  host : 'us-cdbr-east-06.cleardb.net',
  user : 'bbe7074ef2b0d9',
  password : 'da8bf022',
  database: 'heroku_325d18752ac57cd',  
})

module.exports = db