var express = require('express')
  var router = express.Router()
  var User = require('../models/user')
  var Block = require('../models/block')
mongoose = require('mongoose')

router.get('/', function (req, res, next) {
  var logged = false
  User.findOne({ email: req.user.local.username||req.user.google.email }, (err, user) => {

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
        console.log(">>>>>",sent)
        console.log("<<<<<",recieved)
        res.render('wallet', { sent: sent,recieved:recieved, 
          balance:user.balance?user.balance:0 
          , auth: true })
      })
    })
  })
})


router.get('/test',(req,res) => res.send("ok"+req.user.google,req.user.local,req.user.balance))
module.exports = router
