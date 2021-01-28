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

export const formatToDBTime = time => {
  const formattedLength = time.split(":").map(el => parseInt(el));
  formattedLength[1] = Math.round(formattedLength[1] * 5 / 3);
  if(formattedLength[1] < 10){
    formattedLength[1] = `0${formattedLength[1]}`;
  }
  return parseFloat(formattedLength.join("."));
}

export const timeIntToStr = (time) => {
  if(time < 10){
    let timeArray = time.toString().split('.');
    timeArray[0] = '0' + timeArray[0];
    timeArray[1] = Math.round((parseInt(timeArray[1]) * (3 / 5)));
    console.log(typeof timeArray[1]);
    if (!timeArray[1]) {
      timeArray[1] = '00'
    } else if (parseInt(timeArray[1]) < 10){
      timeArray[1] = `0${timeArray[1]}`;
    }
    return timeArray.join(':');
  } else {
    let timeArray = time.toString().split('.');
    console.log(timeArray);
    timeArray[1] = Math.round((parseInt(timeArray[1]) * (3 / 5)));
    if (!timeArray[1]) {
      timeArray[1] = '00';
    } else if (parseInt(timeArray[1]) < 10){
      timeArray[1] = `0${timeArray[1]}`;
    }
    return timeArray.join(':');
  }
}