const sessionErrorRemoval = (errorArea) => {
  errorArea.forEach(item => {
    if (item === "invalidTimeFormat") {
      let containedError = document.querySelector(`.session__time_length--container`);
      let errorContainer = document.querySelector(`.error__${item}`);
      containedError.removeChild(errorContainer);
    } else if (item === "invalidCurrencyFormat") {
      let errorContainer = document.querySelector(`.error__${item}`);
      let containedError = errorContainer.closest('.session__input--container');
      containedError.removeChild(errorContainer);
    } else if (item === "invalidDateFormat") {
      let errorContainer = document.querySelector(`.error__${item}`);
      let containedError = document.querySelector('.session__date_play--container');
      containedError.removeChild(errorContainer);
    } else {
      let containedError = document.querySelector(`.session__${item}--container`);
      let errorContainer = document.querySelector(`.error__${item}`);
      containedError.removeChild(errorContainer);
    }
  });
}

export default sessionErrorRemoval;