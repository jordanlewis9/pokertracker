const errorElement = (element, message) => {
  const paragraph = document.createElement('p');
  paragraph.innerHTML = message;
  paragraph.classList.add('input__error');
  paragraph.classList.add(`error__${element}`);
  return paragraph;
}

const userValidation = (formProps) => {
  let isError = false;
  let inputErrors = [];

  const firstName = document.querySelector('.user-form__first_name').closest('.user__input--container');
  const lastName = document.querySelector('.user-form__last_name').closest('.user__input--container');
  const email = document.querySelector('.user-form__email').closest('.user__input--container');
  const password = document.querySelector('.user-form__password').closest('.user__input--container');
  const nameRegex = /^[a-zA-Z]{2,}(-[a-zA-Z]{2,}|\s[a-zA-Z]{2,})?(\.)?$/i;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,63}@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/i;
  
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
  if (!formProps.password) {
    isError = true;
    inputErrors.push('password');
    password.insertAdjacentElement('beforeend', errorElement('password', "Field cannot be empty"));
  }
  if (!nameRegex.test(formProps.first_name) && formProps.first_name) {
    isError = true;
    inputErrors.push("first_name");
    firstName.insertAdjacentElement('beforeend', errorElement("first_name", 'Invalid format'));
  }
  if (!nameRegex.test(formProps.last_name) && formProps.last_name) {
    isError = true;
    inputErrors.push("last_name");
    lastName.insertAdjacentElement('beforeend', errorElement("last_name", 'Invalid format'));
  }
  if (!emailRegex.test(formProps.email) && formProps.email) {
    isError = true;
    inputErrors.push('email');
    email.insertAdjacentElement('beforeend', errorElement('email', "Invalid format"));
  }
  if (Object.keys(formProps).indexOf('username') !== -1) {
    const username = document.querySelector('.user-form__username').closest('.user__input--container');
    if (!formProps.username) {
      isError = true;
      inputErrors.push('username');
      username.insertAdjacentElement('beforeend', errorElement('username', "Field cannot be empty"));
    }
    const usernameRegex = /^[a-zA-Z0-9]{4,16}$/;
    if (formProps.username && !usernameRegex.test(formProps.username)) {
      isError = true;
      inputErrors.push('username');
      username.insertAdjacentElement('beforeend', errorElement('username', "Username must be between 4 and 16 alphanumeric characters"));
    }
  }
  if (formProps.password) {
    const specialChar = /\W/;
    const uppercaseChar = /[A-Z]/;
    const numberChar = /[0-9]/;
    const numberOfChars = /^.{8,64}$/;
    const noTags = /<.+>/ig;
    if (noTags.test(formProps.password)) {
      isError = true;
      inputErrors.push('password');
      password.insertAdjacentElement('beforeend', errorElement('password', "Invalid format"));
    } else if (!numberOfChars.test(formProps.password)) {
      isError = true;
      inputErrors.push('password');
      password.insertAdjacentElement('beforeend', errorElement('password', "Password must contain at least 8 characters"));
    } else if (!specialChar.test(formProps.password) || !uppercaseChar.test(formProps.password) || !numberChar.test(formProps.password)) {
      isError = true;
      inputErrors.push('password');
      password.insertAdjacentElement('beforeend', errorElement('password', "Password must contain at least 1 uppercase, 1 special character, and 1 number"));
    }
  }
  return [isError, inputErrors];
}

export default userValidation;