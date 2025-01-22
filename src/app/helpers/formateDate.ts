export function formateDate(value: string) {
  const date = new Date(value);

  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formateDay = day < 10 ? `0${day}` : day;
  const formateMonth = month < 10 ? `0${month}` : month;

  const fullDate = `${formateDay}.${formateMonth}.${year}`;

  return fullDate;
}
