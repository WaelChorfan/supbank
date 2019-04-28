function checkTxn(form) {
    //check public key 
    var b = document.getElementById("senderBalance").innerHTML;
    if (b < this.amount) {
      alert('You do not have enough coins to perform this transaction');
      //stop
      return false;
    }
    // go on
    return true;
  }


  function getAddress() {
    var x = document.getElementById("toADDRESS").value;
    document.getElementById("ad").innerHTML = x
  }