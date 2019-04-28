// called at routes get /profile

const publicIp = require('public-ip');
const geoip = require('geoip-lite');
const User = require('../app/models/user');
const mongoose = require('mongoose');
var configDB = require('../config/database');
mongoose.connect(configDB.cloud, { useNewUrlParser: true , useFindAndModify: false});

module.exports =
  async (address) => {
  const ip = await publicIp.v4();
  const geo = geoip.lookup(ip);

  User.findOneAndUpdate({ publicKey: address }, { $set: { location: geo} },
    { useFindAndModify: false }, function (err, user) {
      if (err) throw err
      console.log(user.local.username||user.google.email+"'s location is tracked");
    })
}



