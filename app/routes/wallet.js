var express = require('express')
  var router = express.Router()
  var User = require('../models/user')
  var Block = require('../models/block')
mongoose = require('mongoose')

router.get('/', function (req, res, next) {
  User.findOne({ publicKey : req.user.publicKey }, (err, user) => {

    Block.find({

      transactions:
      {
        $elemMatch : 
        { 
          fromEmail:req.user.publicKey,
        }   
      } 
    }, (err, sent) => {
      
      Block.find({

        transactions:
        {
          $elemMatch : 
          { 
            toEmail: req.user.publicKey
          }   
        } 

      },(err,recieved) =>{
        console.log(">>>>>",sent)
        console.log("<<<<<",recieved)
        res.render('wallet', { sent: sent,recieved:recieved, 
          balance:user.balance?user.balance:0 
          })
      })
    })
  })
})


module.exports = router
