var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Block = require('../models/block')
mongoose = require('mongoose')

router.get('/', function (req, res, next) {



  User.findOne({ publicKey: req.user.publicKey }, (err, user) => {
    User.find({ publicKey: { $ne: req.user.publicKey } }, '-_id -local -google  -privateKey -Created_date -location -balance', (err, users) => {

      Block.find({

        transactions:
        {
          $elemMatch:
          {
            fromName: req.user.nickName,
          }
        }
      }, (err, sent) => {
        console.log(">>>>>>"+sent)

        Block.find({

          transactions:
          {
            $elemMatch:
            {
              toName: req.user.nickName
            }
          }

        }, (err, recieved) => {
console.log("<<<<<"+recieved)
          res.render('wallet.ejs', {
            sent: sent?sent:[[]],
             recieved: recieved?recieved:[[]],
            currentUser: user,
            balance: user.balance ? user.balance : 0,
            users: users
          })
        })
      })
    })
  })
})

module.exports = router
