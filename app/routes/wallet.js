var express = require('express'),
  router = express.Router(),
  User = require('../models/usersModel'),
  Block = require('../models/block'),
mongoose = require('mongoose')

/* GET home page. */
router.get('/', function (req, res, next) {
  var logged = false;
  User.findOne({ email: req.session.user }, (err, user) => {

    Block.find({

      transactions:
      {
        $elemMatch : 
        { 
          fromEmail:req.session.user,
        }   
      } 
    }, (err, sent) => {
      
      Block.find({

        transactions:
        {
          $elemMatch : 
          { 
            toEmail:req.session.user
          }   
        } 

      },(err,recieved) =>{
        console.log(">>>>>",sent);
        console.log("<<<<<",recieved);
        res.render('wallet', { sent: sent,recieved:recieved, balance:user.balance?user.balance:0 , auth: true });
      })
    })
  })
});

module.exports = router;
