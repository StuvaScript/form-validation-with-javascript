import highFive from './icons/high-five.png';

import './normalize.css';
import './style.css';

const email = document.querySelector('#email');

email.addEventListener('input', (e) => {
  console.log(email.reportValidity());
  console.log(email.validity);
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Please enter an email address');
  } else {
    email.setCustomValidity('');
  }
});

document.querySelector('#country').addEventListener('change', checkZIP);
document.querySelector('#zip').addEventListener('input', checkZIP);

function checkZIP() {
  const constraints = {
    ch: [
      '^(CH-)?\\d{4}$',
      'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012',
    ],
    de: [
      '^(D-)?\\d{5}$',
      'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345',
    ],
    nl: [
      '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
      'Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
    ],
  };

  const country = document.querySelector('#country').value;

  const ZIPField = document.querySelector('#zip');

  const constraint = new RegExp(constraints[country][0], '');

  if (constraint.test(ZIPField.value)) {
    ZIPField.setCustomValidity('');
  } else {
    ZIPField.setCustomValidity(constraints[country][1]);
  }
}

const pass = document.querySelector('#pass');

pass.addEventListener('input', () => {
  if (document.querySelector('.strength')) {
    document.querySelector('.strength').remove();
  }
  const strength = document.createElement('span');
  strength.classList.add('strength');

  if (pass.value.length < 4) {
    strength.innerText = 'weak';
    strength.style.color = 'red';
  } else if (pass.value.length < 7) {
    strength.innerText = 'decent';
    strength.style.color = 'orange';
  } else if (pass.value.length < 10) {
    strength.innerText = 'good';
    strength.style.color = 'yellow';
  } else {
    strength.innerText = 'great!';
    strength.style.color = 'green';
  }
  pass.parentElement.append(strength);
});

const passConfirm = document.querySelector('#pass-confirm');

passConfirm.addEventListener('input', () => {
  if (pass.value !== passConfirm.value) {
    passConfirm.setCustomValidity('Passwords need to match');
  } else {
    passConfirm.setCustomValidity('');
  }
});

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (email.value === '') {
    email.setCustomValidity('Please enter an email address');
  } else if (document.querySelector('#zip').value === '') {
    checkZIP();
  } else if (pass.value === '') {
    pass.setCustomValidity('Please enter a password');
  } else if (passConfirm.value === '') {
    passConfirm.setCustomValidity('Please confirm your password');
  } else {
    const success = document.createElement('img');
    success.setAttribute('id', 'high-five');
    success.setAttribute('src', highFive);
    success.setAttribute('alt', 'Two hands high fiving.');
    document.querySelector('body').append(success);
  }
});
