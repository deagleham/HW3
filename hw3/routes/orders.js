// De'Ante Agleham

var express = require('express');
var router = express.Router();
var db = require('./dbms_promise.js'); // Import dbms_promise.js

/* POST orders */
router.post('/', async function (req, res, next) {
    var month = req.body.month; // Retrieve the month from the request body
    var monthInt = parseInt(month, 10); // Parse the month into an integer

    try {
        // Dynamically embed `monthInt` directly into the query string
        const query = `
            SELECT toppings.t_id AS t_id, name, price, o_id, quantity, notes, month, year
            FROM toppings
            RIGHT OUTER JOIN orders ON toppings.t_id = orders.t_id
            WHERE month = ${monthInt};
        `;

        // Pass the full query string to dbquery()
        const orders = await db.dbquery(query);

        // Return the fetched data as JSON
        res.json({ error: null, data: orders });
    } catch (err) {
        console.error('Database error: ', err);
        res.status(500).json({ error: 'Database error occurred' });
    }
});

module.exports = router;