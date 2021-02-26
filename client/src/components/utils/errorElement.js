const errorElement = (element, message) => {
  const paragraph = document.createElement('p');
  paragraph.innerHTML = message;
  paragraph.classList.add('input__error');
  paragraph.classList.add(`error__${element}`);
  return paragraph;
}

export default errorElement;