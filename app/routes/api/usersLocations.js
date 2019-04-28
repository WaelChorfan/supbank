
'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var configDB = require('../../../config/database.js');
mongoose.connect(configDB.cloud, { useNewUrlParser: true });
const User = require('../../models/user');

router.get('/', function (req,res) {

  User.find({},'-_id -local -google  -privateKey -Created_date ', function (err, users) {
    if (err) { res.send(err) }

    //will only show pubkey and location     
    res.send(users)
    
  })
  
})

module.exports = router;
