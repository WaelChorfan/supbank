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
 
  //we need to call ctor of EC to be able to use it to get the key
  const EC = require('elliptic').ec
  const ec = new EC('secp256k1')

  //current user 
  User.findOne({ publicKey: req.user.publicKey }, (err, userSender) => {
    User.findOne({ publicKey: req.body.to }, (err, userTo) => {
      //txn params
      const key = ec.keyFromPrivate(userSender.privateKey);
      const from = userSender.publicKey //address of current user
      const to = userTo.publicKey; // address of reciever
      const amount = req.body.amount
      const timestamp = Date.now()
      const hashTx = SHA256(to + from + amount + timestamp).toString();
      const signature = key.sign(hashTx, 'base64').toDER('hex');//signed by sender

     
      console.log("from--------->"+userSender.nickName,"---------->to"+ userSender.nickName,"amount $$$"+ amount);
      
      //create the txn
      var new_txn = new Txn({
        //txn  addresses
        fromAddress: from,
        toAddress: to,
        //txn emails
        fromName: userSender.nickName,
        toName: userTo.nickName,

        amount: amount,
        timestamp: timestamp,
        signature: signature,
        txnHash: SHA256(from + to + amount + timestamp).toString()
      });

      new_txn.save(function (err, txn) {
        if (err)
          res.send(err);
        console.log("saving new txn..");
        var msg='Your transaction is pending ,you will receive an email when it is confirmed'
        res.render('index.ejs',
          {
            message: msg
            , logged: true
          })
      });
    })
  })
})


module.exports = router;



//after putting in blocks(mined ) change balance
// exports.validateBalanceChanges= function (req, res) {
//   const txs = [];
//   for (const block of this.chain) {
//     for (const tx of block.transactions) {


//       if (tx.fromAddress === req.params.address || tx.toAddress === req.params.address) {

//         txs.push(tx);
//         res.json(txs);
//       }
//     }
//   }
// }




// // exports.delete_all_pending_txns = function(req, res) {
// //     Txn.remove({}, function(err, txn) {
// //     if (err)
// //       res.send(err);
// //     res.json({ message: 'txns *will be* mined and deleted' });
// //   });
// // };

// //#endregion