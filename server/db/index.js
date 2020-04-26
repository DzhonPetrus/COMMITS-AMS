const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'COMMITS_AMS',
  port: '3306'
});

module.exports = pool;


global.generateID = () => '_' + (Date.now().toString(36) + Math.random().toString(36)).substr(2, 9);
