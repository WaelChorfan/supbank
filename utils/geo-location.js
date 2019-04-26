const publicIp = require('public-ip');
const geoip = require('geoip-lite');
const User = require('../app/models/user');
function userLoc(p) {
    console.log(p);

    async () => {
        const ip = await publicIp.v4();
        const geo = geoip.lookup(ip);
        User.update({ nickName: p }, { $set: { location: geo } }, function (err, user) {
            console.log(user);
        })
    }
    
}


module.exports.userLoc = userLoc;