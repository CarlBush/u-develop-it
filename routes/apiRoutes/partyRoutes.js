const router = require("express").Router();

const db = require("../../db/connection");

router.get("/parties", (req, res) => {
    const sql = `SELECT * FROM parties`;
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

router.get("/party/:id", (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const parms = [req.params.id];
    db.query(sql, parms, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "Success",
            data: row
        });
    });
});

router.delete("/party/:id", (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`
    const parms = [req.params.id];
    db.query(sql, parms, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: "Party Not Found"
            })
        } else {
            res.json({
                message: "deleted",
                changes: result.affectedRows,
                id: req.params.id
            });
        };
    });
});

module.exports = router;