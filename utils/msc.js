var generateName = require('sillyname');
var sillyName = generateName();

module.exports = 
function genNickName() {
	var x =Math.floor( Math.random() * 7 )
	var y=Math.floor( Math.random() * 7 )
	return (sillyName+x+y).replace(" ","")
}

