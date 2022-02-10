function validateMyForm(nr) {
  if (grecaptcha.getResponse(nr) == ""){
      document.getElementsByClassName('warning_captcha')[nr].innerHTML = 'Potwierdź captche';
      return false;
  } else {
      return true;
  }
}