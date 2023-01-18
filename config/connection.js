const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Jujutsu5995$",
    database: "organizer_db",
  },
  console.log(`Connected to the organizer_db database.`)
);
db.connect((err) => {
  if (err){
    throw err
  }
})

module.exports = db;