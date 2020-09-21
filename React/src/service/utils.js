exports.isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

/**
 * returns two dates with difference of month  
 * startDate
 * endDate
 * format MM-DD-YYYY
 *  */
exports.datesFormat = () => {
  let startDate = new Date();
  let endDate = new Date();
  startDate.setMonth(endDate.getMonth() - 1);
  let endMonth = endDate.getMonth() + 1 < 10 ? `0${endDate.getMonth() + 1}` : endDate.getMonth() + 1;
  let startMonth = startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1;

  const dates = [`${startDate.getFullYear()}-${startMonth}-${startDate.getDate()}`, `${endDate.getFullYear()}-${endMonth}-${endDate.getDate()}`]
  return dates;
}