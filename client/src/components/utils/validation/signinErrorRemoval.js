const signinErrorRemoval = (errorAreas) => {
  errorAreas.forEach(item => {
    let errorParagraph = document.querySelector(`.error__${item}`);
    let containedError = errorParagraph.closest('.signin-form__input--container');
    containedError.removeChild(errorParagraph);
  })
}

export default signinErrorRemoval;