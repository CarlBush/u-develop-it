const mysql = require("mysql2");

//SQL DATABASE 
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "election"
    },
    console.log("Connected to the election database.")
);

module.exports = db;