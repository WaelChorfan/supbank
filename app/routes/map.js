const express = require('express');
const  router = express.Router();
const User = require('../models/user');
var userLoc = require('../../utils/geo-location')


router.get('/', function(req, res, next) {
  userLoc(req.user.publicKey)
  res.render('map');
});


module.exports = router;
