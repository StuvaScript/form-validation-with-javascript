import './normalize.css';
import './style.css';

const email = document.querySelector('#email');
const form = document.querySelector('form');

email.addEventListener('input', (e) => {
  console.log(form.checkValidity());
  console.log(email.reportValidity());
  console.log(email.validity);
});
