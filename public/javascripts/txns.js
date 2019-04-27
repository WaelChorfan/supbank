function checkTxn(form) {
    //check public key 
    var from = document.getElementById("fromADDRESS").innerHTML;
    var to = document.getElementById("toADDRESS").value;
    var b = document.getElementById("senderBalance").innerHTML;

    console.log("from == to", from.localeCompare(to));
    console.log("from =" + from);
    console.log("to =" + to);
    console.log("balance=" + b);

    if (from == to) {
      alert("Your cannot send coins to your own wallet");
      return false;
    } else {
      // go on
      return true;
    }

    if (b < this.amount) {
      alert('You do not have enough coins to perform this transaction');
      //stop
      return false;
    }
    // go on
    return true;
  }