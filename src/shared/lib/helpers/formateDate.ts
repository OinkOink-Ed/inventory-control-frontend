export function formateDate(value: string) {
  const date = new Date(value);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formateDay = day < 10 ? `0${String(day)}` : day;
  const formateMonth = month < 10 ? `0${String(month)}` : month;

  const fullDate = `${String(formateDay)}.${String(formateMonth)}.${String(
    year
  )}`;

  return fullDate;
}
