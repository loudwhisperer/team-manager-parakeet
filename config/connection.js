const mysql = require('mysql2');
const db = mysql.createConnection(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  },
  console.log(`Connected to the organizer_db database.`)
);
db.connect((err) => {
  if (err){
    throw err
  }
})

module.exports = db;