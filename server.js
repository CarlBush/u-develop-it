const db = require("./db/connection");
const express = require("express");

const apiRoutes = require("./routes/apiRoutes")
const partyRoutes = require("./routes/apiRoutes")

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/api", partyRoutes);


//DEFAULT RESPONSE FOR ALL REQUESTS (404)
app.use((req, res) => {
    res.status(404).end();
});

db.connect(err => {
    if (err) throw err;
    console.log("Database connected.");
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});