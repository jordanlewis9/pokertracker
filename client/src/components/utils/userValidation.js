const errorElement = (element, message) => {
  const paragraph = document.createElement('p');
  paragraph.innerHTML = message;
  paragraph.classList.add('input__error');
  paragraph.classList.add(`error__${element}`);
  return paragraph;
}

const userValidation = (formProps) => {
  console.log('name validation')
  let isError = false;
  let inputErrors = [];
  const username = document.querySelector('.user-form__username').closest('.user__input--container');
  const firstName = document.querySelector('.user-form__first_name').closest('.user__input--container');
  const lastName = document.querySelector('.user-form__last_name').closest('.user__input--container');
  const email = document.querySelector('.user-form__email').closest('.user__input--container');
  const password = document.querySelector('.user-form__password').closest('.user__input--container');
  const nameRegex = /^\w{2,}(-\w{2,}|\s\w{2,})?$/i;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,63}@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/i;
  // const passwordRegex = 
  if (!formProps.first_name) {
    isError = true;
    inputErrors.push('first_name');
    firstName.insertAdjacentElement('beforeend', errorElement('first_name', "Field cannot be empty"));
  }
  if (!formProps.last_name) {
    isError = true;
    inputErrors.push('last_name');
    lastName.insertAdjacentElement('beforeend', errorElement('last_name', "Field cannot be empty"));
  }
  if (!formProps.email) {
    isError = true;
    inputErrors.push('email');
    email.insertAdjacentElement('beforeend', errorElement('email', "Field cannot be empty"));
  }
  if (!nameRegex.test(formProps.first_name)) {
    isError = true;
    inputErrors.push("first_name");
    firstName.insertAdjacentElement('beforeend', errorElement("first_name", 'Invalid format'));
  }
  if (!nameRegex.test(formProps.last_name)) {
    isError = true;
    inputErrors.push("last_name");
    lastName.insertAdjacentElement('beforeend', errorElement("last_name", 'Invalid format'));
  }
  if (!emailRegex.test(formProps.email)) {
    isError = true;
    inputErrors.push('email');
    email.insertAdjacentElement('beforeend', errorElement('email', "Invalid format"));
  }
  return [isError, inputErrors];
}

const emailValidation = (formProps) => {
  console.log('email validation');
}

export default userValidation;