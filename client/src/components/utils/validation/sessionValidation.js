const sessionValidation = (formProps) => {
  let isError = false;
  let inputErrors = [];
  for(const value in formProps) {
    if (!formProps[value]) {
      isError = true;
      inputErrors.push(value);
      let inputContainer = document.querySelector(`.session__${value}--container`);
      let errorMsg = document.createElement('p');
      errorMsg.innerHTML = 'Field cannot be empty';
      errorMsg.classList.add('input__error');
      errorMsg.classList.add(`error__${value}`);
      inputContainer.insertAdjacentElement('beforeend', errorMsg);
      continue;
    }
    if (value === "time_length") {
      const timeRegex = /^\d{2}:[0-5]\d$/;
      if (!timeRegex.test(formProps[value])){
        isError = true;
        inputErrors.push("invalidTimeFormat");
        let inputContainer = document.querySelector(`.session__${value}--container`);
        let errorMsg = document.createElement('p');
        const greaterThan60Regex = /^\d{2}:\d{2}$/;
        if (greaterThan60Regex.test(formProps[value])) {
          errorMsg.innerHTML = 'Minutes cannot be greater than 59';
        } else {
          errorMsg.innerHTML = 'Format must be hh:mm';
        }
        errorMsg.classList.add('input__error');
        errorMsg.classList.add('error__invalidTimeFormat');
        inputContainer.insertAdjacentElement('beforeend', errorMsg);
      }
    }
    if (value === "buyin" || value === "cashout") {
      const currencyRegex = /^\d{1,6}\.?\d{0,2}?$/;
      if (!currencyRegex.test(formProps[value])) {
        isError = true;
        inputErrors.push("invalidCurrencyFormat");
        let inputContainer = document.querySelector(`.session__${value}--container`);
        let errorMsg = document.createElement('p');
        errorMsg.innerHTML = 'Invalid format';
        errorMsg.classList.add('input__error');
        errorMsg.classList.add('error__invalidCurrencyFormat');
        inputContainer.insertAdjacentElement('beforeend', errorMsg);
      }
    }
    if (value === "date_play") {
      const dateRegex = /^(19|20)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
      if (!dateRegex.test(formProps[value])) {
        isError = true;
        inputErrors.push("invalidDateFormat");
        let inputContainer = document.querySelector(`.session__${value}--container`);
        let errorMsg = document.createElement('p');
        errorMsg.innerHTML = 'Date must be in mm/dd/yyyy format';
        errorMsg.classList.add('input__error');
        errorMsg.classList.add('error__invalidDateFormat');
        inputContainer.insertAdjacentElement('beforeend', errorMsg);
      }
    }
  }
  return [isError, inputErrors]
}

export default sessionValidation;