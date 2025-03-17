// De'Ante Agleham

var express = require('express');
var router = express.Router();
var db = require('./dbms_promise.js');

/* POST new orders */
router.post('/', async function (req, res, next) {
    var topping = req.body.topping;
    var quantity = req.body.quantity;
    var notes = req.body.instr;

    const a = new Date();
    var month = a.getMonth() + 1;
    var year = a.getFullYear();

    var t_id;
    if (topping == "Plain") {
        t_id = 1;
    } else if (topping == "Chocolate") {
        t_id = 3;
    } else if (topping == "Cherry") {
        t_id = 4;
    } else if (notes && notes.includes("vegan")) {
        t_id = 2;
    } else {
        t_id = null; // Default or error value
    }

    // Ensure t_id is valid
    if (!t_id) {
        return res.status(400).json({ error: "Invalid topping or instructions provided." });
    }

    try {
        const query = `
        INSERT INTO orders (t_id, quantity, notes, month, year)
        VALUES 
        (${t_id}, ${quantity}, '${notes}', ${month}, ${year});
    `;


        // Pass the full query string to dbquery()
        const neworder = await db.dbquery(query);

        // Return the fetched data as JSON
        res.json({ error: null, data: neworder });
    } catch (err) {
        console.error('Database error: ', err);
        res.status(500).json({ error: 'Database error occurred' });
    }
});

module.exports = router;