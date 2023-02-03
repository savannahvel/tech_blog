const mysql = require('mysql2');

require('dotenv').config();

// Use environment variables to connect to database
const dbConnect = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the tech_blog_db database.`)
);

module.exports = dbConnect;