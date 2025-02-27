// De'Ante Agleham

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const response = {
        error: null,
        data: [
            { topping: "cherry", quantity: "2"},
            { topping: "plain", quantity: "6"},
            { topping: "chocolate", quantity: "3"}
        ]
    };
    res.json(response);
});

module.exports = router;