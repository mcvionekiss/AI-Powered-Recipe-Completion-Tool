const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.AWS_MYSQL_HOST,
  user: process.env.AWS_MYSQL_USER,
  password: process.env.AWS_MYSQL_PASSWORD,
  database: "recipe_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
