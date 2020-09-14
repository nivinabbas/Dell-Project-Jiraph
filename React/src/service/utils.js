exports.isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

exports.dateFormat = (date) => {
  const ye = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(date);
  const mo = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(date);
  const da = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(date);

  return `${ye}-${mo}-${da}`;
}

exports.lastMonth = () => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);

  return date;
}