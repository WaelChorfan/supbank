'use strict'
// #region imports & conf

var express = require('express')
var router = express.Router()
const SHA256 = require('crypto-js/sha256')
const mongoose = require('mongoose')
  var Block = require('../models/block')
  var Txn = require('../models/txn')
  var User = require('../models/user')

var miningReward = 100
  , difficulty = 2


//will delete txns after the block is created  
function deletePendings() { Txn.remove({}, function (err, txn) { }) }

router.post('/minePendingTxns', function (req, res, next) {
  Txn.count({}).then((count) => {
    if (count == 0) {
      res.render('mine', { logged: true, message: 'All blocks are  already mined ,please try later.' });
    } else {

      //mining here + creating a block
      new Promise(function (resolve, reject) {
        Block.find({}).then((blks) => {
          Txn.find({},
            (err, txns) => {
              //block params 
              const timestamp = Date.now()
              var hash = ""
              console.log("mining ...")
              while (hash.toString().substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
                hash = ""
                hash = SHA256((blks[blks.length - 1].hash + Date.now() + JSON.stringify(txns) +
                  blks[blks.length - 1].blockNumber).toString())
              }


              //reward the miner
              User.find({ publicKey: req.user.publicKey }, function (err, user) {
                user.balance += miningReward
              })
              //update balances
              
              

              //create the block
              var new_block = new Block({
                timestamp: timestamp,
                transactions: txns,
                previousHash: blks[blks.length - 1].hash,
                hash: hash,
                blockNumber: blks[blks.length - 1].blockNumber + 1
              })
              if (txns.length > 0) {
                new_block.save(async function (err, block) { })
              }
            })
          resolve()
        }).then(function () {
          console.log("deleting pending txns ..")
          deletePendings()
        })
      })
      res.render('mine', { message: 'block mined successfully' ,logged:true})
    }
  })



});

//#region  init
//delete all blocks except genesis 
router.delete('/allBlocks', function (req, res) {
  Block.remove({ previousHash: { $ne: "1" } }, function (err, block) {
    if (err)
      res.send(err)
    res.send('all blocks are deleted exept the genesis block')

  });
})

//init genesis block  (created once)
router.get('/block0', function (req, res, next) {
  var new_block = new Block({
    timestamp: Date.now(),
    transactions: [],
    previousHash: "0",
    hash: SHA256(Date.now().toString()),
    blockNumber: 0
  })

  new_block.save(function (err, block) {
    if (err)
      res.send(err)
    res.send('genesis block created')
  })

})

module.exports = router


//#endregion