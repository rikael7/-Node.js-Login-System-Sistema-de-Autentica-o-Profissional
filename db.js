// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '12345', // Substitua pela sua senha
    database: 'sistema_login',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;