const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'clinica',
    timezone: 'utc'
});

module.exports = pool.promise();