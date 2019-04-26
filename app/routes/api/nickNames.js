
'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var configDB = require('../../../config/database.js');
mongoose.connect(configDB.local, { useNewUrlParser: true });
const User = require('../../models/user');

router.get('/', function (req, res) {
  console.log(req.body.address);
  User.findOne({ publicKey: req.body.address }, function (err, user) {
    if (err) { res.send(err) }
    res.send(user.google)
  })
})

module.exports = router;
