'use strict';
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('mine.ejs', { message:'',logged: true });
});



module.exports = router;
