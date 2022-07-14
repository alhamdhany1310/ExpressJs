const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eduwork_cruds',
  // port: 3306,
});

module.exports = connection;
