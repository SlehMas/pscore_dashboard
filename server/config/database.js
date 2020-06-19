require('dotenv').config({path: __dirname + '../.env'})
const mysql = require('mysql');
const dbConfig = require('./database.json')

module.exports = mysql.createPool({
  "host": "localhost",
  "connectionLimit" : 100,
  "user": "root",
  "password": "" ,
  "database": "pscore_db",
  "driver": "mysql",
  "multipleStatements": true
})





