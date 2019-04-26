/* database/model.js */
//Import mongoose 
let mongoose = require("mongoose");
//get Schema Constructor out of mongoose
let Schema = mongoose.Schema;
let Txns=require('./txnModel');
//Create the BlockChain Schema
//timestamp,transactions[],previousHash,hash,nonce
let BlocksSchema = new Schema({
        timestamp: Date,
        transactions: [Schema.Types.Mixed],
        previousHash:  String  ,
        hash: String ,
        blockNumber: { type: Number , unique: true ,dropDups: true},
    });

    module.exports = mongoose.model("Blocks", BlocksSchema);