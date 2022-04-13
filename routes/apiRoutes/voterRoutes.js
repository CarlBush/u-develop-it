const router = require("express").Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

//GET | ALL VOTERS
router.get("/voters", (req, res) => {
    const sql = `SELECT * FROM voters ORDER BY last_name`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Success",
            data: rows
        });
    });
});

//GET | SELECT VOTER
router.get("/voter/:id", (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id]
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return;
        }
        res.json({
            message: "Success",
            data: row
        });
    });
});

// POST | ADD VOTER | NO REQ CHANGE TO ({body})
router.post("/voter", ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?);`
    const params = [body.first_name, body.last_name, body.email];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "Success",
            data: body
        });
    });
});

//PUT | MODIFY VOTE
router.put("/voter/:id", (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    };

    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: "Voter with that ID not found"
            });
        } else {
            res.json({
                message: "Voter has been changed",
                changes: result.affectedRows,
                data: req.body
            });
        };
    });
});



//DELETE | SELECTED VOTER
router.delete("/voter/:id", (req, res) => {
    const sql = `DELETE FROM voters WHERE id =?`;
    const params = [req.params.id]
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: "Voter ain't thurr"
            })
        } else {
            res.json({
                message: "Deleted",
                changes: result.affectedRows,
                id: req.params.id
            });
        };
    });
});

module.exports = router;