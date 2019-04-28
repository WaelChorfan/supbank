'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var configDB = require('../../../config/database.js');
mongoose.connect(configDB.cloud, { useNewUrlParser: true });
const User = require('../../models/user');

router.get('/one', function (req, res) {
  console.log(req.body.address);
  User.findOne({ publicKey: req.body.address }, function (err, user) {
    if (err) { res.send(err) }
    res.send(user)
  })
})

router.get('/list', function (req, res) {
  User.find({}, '-_id -local -google  -privateKey -Created_date -location -balance', function (err, users) {
    if (err) { res.send(err) }
    //will only show pubkey and nick name     
    res.send(users)
  })
})



module.exports = router;
