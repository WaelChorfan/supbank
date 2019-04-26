
// // var p="0407dcd793d257611c2027d4bc725e09233682ae92f1072bfa2d1458087d060f6d88bd449339e56eb3273808e8385fface0ab71c998dcee42292372426e25c8fb4"
// var p="Scarletroar_Duke_45"

// var userLoc = require('./utils/geo-location').userLoc

// userLoc(p)



const publicIp = require('public-ip');
const geoip = require('geoip-lite');
const User = require('./app/models/user');


var f= async () => {
    const ip = await publicIp.v4();
    
    const geo = geoip.lookup(ip);
  console.log("-------"+geo);
    // User.update({ "nickName" : "Scarletroar_Duke_45" }, { $set: { location: geo } }, function (err, user) {
    //     if (err) throw err
    //     console.log(user);
    // })
}

f()