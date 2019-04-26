'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TxnSchema = new Schema(
  {
    fromAddress: {
      type: String,
      required: ''
    },
    toAddress: {
      type: String,
      required: ''
    },
    fromEmail: String,
    toEmail: String,
    amount: Number,
    timestamp: Date,
    txnHash: { type: String, unique: true, dropDups: true },
    signature: String
  }
);

module.exports = mongoose.model('Txns', TxnSchema);