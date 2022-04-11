const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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



// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });


// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(row);
// });

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err)
//     } 
//     console.log(result);
// });

//Creating a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;

const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result) => {
    if(err) {
        console.log(err)
    } 
        console.log(result)
});

// db.query(`INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`, [1, "Ronald", "Firbank", 1], (err, result) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(result)
//     };
// })


//DEFAULT RESPONSE FOR ALL REQUESTS (404)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});