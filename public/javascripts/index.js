
function checkForm(form) {
  var re = /\S+@\S+\.\S+/;
  if (!re.test(form.email.value)) {
    alert('is not a valid mail !');
    form.email.focus();
    return false;
  }

  if (form.pwd1.value !== form.pwd2.value) {
    alert("Error: Passwords must be the same !");
    form.pwd2.value = ''
    form.pwd1.focus();
    return false;
  }

  if (form.pwd1.value != "" && form.pwd1.value == form.pwd2.value) {
    if (form.pwd1.value.length < 6) {
      alert("Error: Password must contain at least six characters!");
      form.pwd1.focus();
      return false;
    }

    if (form.pwd1.value == form.email.value) {
      alert("Error: Password must be different from email !");
      form.pwd1.focus();
      return false;
    }

  }

  return true;
}


