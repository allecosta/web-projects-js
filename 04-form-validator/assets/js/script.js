const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement.parentElement; // Input dentro do label - parentElement.parentElement
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement.parentElement; // Input dentro do label - parentElement.parentElement
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'OPS! Este email não é valido');
  }
}

function checkRequired(inputArr) {
  let isRequired = false;
  
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} é obrigatório`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} deverá ter pelo menos ${min} caracteres`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} deverá ter mais que ${max} caracteres`);
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'OPS! As senhas informadas não correspondem');
  } else {
    showSuccess(input2);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);

});
