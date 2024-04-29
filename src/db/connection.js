require('dotenv').config();
const user = process.env.DB_ENV;

require('dotenv').config();
const database = process.env.DB_PASS;

require('dotenv').config();
const pass = process.env.DB_PASS;

const mysql  = require("mysql2/promise");


const connection = mysql.createPool({
    host     : "localhost"|"127.0.0.1",
    user     : "root",
    password : "",
    port     : 3306,
    database: 'library_laravel'
   
})

module.exports = connection;