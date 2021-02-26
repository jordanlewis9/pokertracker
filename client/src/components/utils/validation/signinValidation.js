const errorElement = (element, message) => {
  const paragraph = document.createElement('p');
  paragraph.innerHTML = message;
  paragraph.classList.add('input__error');
  paragraph.classList.add(`error__${element}`);
  return paragraph;
}

const signinValidation = (formProps) => {
  let isError = false;
  let inputError = [];
  const username = document.querySelector('.user-form__username').closest('.signin-form__input--container');
  const password = document.querySelector('.user-form__password').closest('.signin-form__input--container');

  if (!formProps.username) {
    isError = true;
    inputError.push('username');
    username.insertAdjacentElement('beforeend', errorElement('username', 'Username cannot be empty'));
  }
  if (!formProps.password) {
    isError = true;
    inputError.push('password');
    password.insertAdjacentElement('beforeend', errorElement('password', 'Password cannot be empty'));
  }

  const noTagsRegex = /<.+>/ig;
  if (noTagsRegex.test(formProps.username)) {
    isError = true;
    inputError.push('username');
    username.insertAdjacentElement('beforeend', errorElement('username', 'Invalid format'));
  }
  if (noTagsRegex.test(formProps.password)) {
    isError = true;
    inputError.push('password');
    password.insertAdjacentElement('beforeend', errorElement('password', 'Invalid format'));
  }
  return [isError, inputError];
}

export default signinValidation