
 var pwd2=document.getElementById("pwd1")
 var pwd1=document.getElementById("pwd2")
 var email=document.getElementById("email")


function checkForm(form) {
  var re = /\S+@\S+\.\S+/;
  if (!re.test(email.value)) {
    alert('is not a valid mail !');
    email.focus();
    return false;
  }

  if (pwd1.value !== pwd2.value) {
    alert("Error: Passwords must be the same !");
    pwd2.value = ''
    pwd1.focus();
    return false;
  }

  if (pwd1.value != "" && pwd1.value == pwd2.value) {
    if (pwd1.value.length < 6) {
      alert("Error: Password must contain at least six characters!");
      pwd1.focus();
      return false;
    }

    if (pwd1.value == email.value) {
      alert("Error: Password must be different from email !");
      pwd1.focus();
      return false;
    }

  }

  return true;
}


