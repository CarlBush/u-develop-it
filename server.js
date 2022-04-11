const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//DEFAULT RESPONSE FOR ALL REQUESTS (404)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});