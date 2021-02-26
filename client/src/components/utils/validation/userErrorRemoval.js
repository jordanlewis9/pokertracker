const userErrorRemoval = (errorArea) => {
  errorArea.forEach(item => {
    let errorParagraph = document.querySelector(`.error__${item}`);
    let containedError = errorParagraph.closest('.user__input--container');
    containedError.removeChild(errorParagraph);
  });
}

export default userErrorRemoval;