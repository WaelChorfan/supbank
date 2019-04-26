'use strict';
var express = require('express');
var router = express.Router();


const SHA256 = require('crypto-js/sha256')
var mongoose = require('mongoose')
var Txn = require('../models/txn')
var User = require('../models/user')
var Block = require('../models/block')


router.get('/', function (req, res, next) {
  Block.find({}, function (err, blocks) {
    if (err) throw err
    res.render('txns', { blocks: blocks, auth: true });
  });

});





router.post('/', function (req, res) {
  const EC = require('elliptic').ec
  //we need to call ctor of EC to be able to use it to get the key
  const ec = new EC('secp256k1')

  //current user 
  User.findOneAndUpdate({ publicKey: req.user.publicKey }, { new: false }, (err, userSender) => {
    console.log(userSender);
    User.findOneAndUpdate({ publicKey: req.body.to }, { new: false }, (err, userTo) => {
      console.log("userTo-------------->" + userSender);
      //txn params
      const key = ec.keyFromPrivate(userSender.privateKey);
      const from = userSender.publicKey //address of current user
      const to = req.body.to; // address of reciever
      const amount = req.body.amount
      const timestamp = Date.now()
      const hashTx = SHA256(to + from + amount + timestamp).toString();
      const signature = key.sign(hashTx, 'base64').toDER('hex');//signed by sender

      if (userSender.publicKey == userTo.publicKey) {
        res.render('index', {
          message: 'Your cannot send coins to your own wallet',
          logged: true
        });
      }

      //create the txn
      var new_txn = new Txn({

        //txn  addresses
        fromAddress: from,
        toAddress: to,

        //txn emails
        fromEmail: userSender.local.username || userSender.google.email,
        toEmail: userTo.local.username || userTo.google.email,
        amount: amount,
        timestamp: timestamp,
        signature: signature,
        txnHash: SHA256(from + to + amount + timestamp).toString(),
      });

      new_txn.save(function (err, txn) {
        if (err)
          res.send(err);
        res.render('index',
          {
            message: 'Your transaction is pending ..,you will receive an email when it is confirmed'
            , logged: true
          })
      });

      //update reciever's balance
      userTo.balance += amount
      userTo.save()

      //update sender's balance
      userSender.balance -= amount
      userSender.save()


    })

  })
})


module.exports = router;



// // //after putting in blocks
// // exports.getAllTransactionsForEmail= function (req,res) {
// //   const txs = [];
// //   for (const block of this.chain) {
// //     for (const tx of block.transactions) {


// //       //in and out txns
// //       if (tx.fromAddress === req.params.address || tx.toAddress === req.params.address) {

// //         txs.push(tx);
// //        res.json(txs);
// //       }
// //     }
// //   }
// // }




// // exports.delete_all_pending_txns = function(req, res) {
// //     Txn.remove({}, function(err, txn) {
// //     if (err)
// //       res.send(err);
// //     res.json({ message: 'txns *will be* mined and deleted' });
// //   });
// // };

// //#endregion