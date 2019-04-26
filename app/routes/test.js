// const mongoose = require('mongoose');
// var configDB = require('./config/database.js');
// mongoose.connect(configDB.mydb, { useNewUrlParser: true });

// var User = require('./app/models/user');

var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.render('profile2.ejs');
});

module.exports = router;


