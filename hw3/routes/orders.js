// De'Ante Agleham

var express = require('express');
var router = express.Router();

/* POST orders */
router.post('/', function(req, res, next) {
    const orders = {
        error: null,
        data: [
            { topping: "cherry", quantity: "2"},
            { topping: "plain", quantity: "6"},
            { topping: "chocolate", quantity: "3"}
        ]
    };
    res.json(orders);
});

module.exports = router;