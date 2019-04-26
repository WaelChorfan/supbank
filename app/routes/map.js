const express = require('express');
const  router = express.Router();
const User = require('../models/usersModel');

router.get('/', function(req, res, next) {
  res.render('map',{auth:true});
});


module.exports = router;
