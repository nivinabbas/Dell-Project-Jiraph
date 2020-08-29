export const formatDate = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);
  return `${day}-${month}-${year}`;
};

export const prepareDateForRequest = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });
  const [
    { value: m },
    ,
    { value: d },
    ,
    { value: y },
  ] = dateTimeFormat.formatToParts(date);
  console.log([y, m, d]);
  return [y, m - 1, d]; //Return as an array with y,m,d sequence
};
