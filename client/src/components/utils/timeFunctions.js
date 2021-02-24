export const formatResultTime = (time) => {
  let timeArray = time.toString().split('.');

  if (timeArray[1] === '00'){
    return `${timeArray[0]} hours 0 minutes`;
  } else if (timeArray[1] === '99'){
    return`${parseInt(timeArray[0]) + 1} hours 0 minutes`;
  }

  timeArray[1] = Math.round((parseInt(timeArray[1]) * (3 / 5)));
  return `${timeArray[0]} hours ${timeArray[1]} minutes`;
}

export const timeIntToStr = (time) => {
  let timeArray = time.toString().split('.');
  if (timeArray[1].length === 1) {
    timeArray[1] += '0';
  }
  timeArray[1] = Math.round((parseInt(timeArray[1]) * (3 / 5)));
  if (!timeArray[1]) {
    timeArray[1] = '00';
  } 
  if (parseInt(timeArray[1]) < 10){
    timeArray[1] = `0${timeArray[1]}`;
  }
  if(time < 10){
    timeArray[0] = '0' + timeArray[0];
  }
    return timeArray.join(':');
}