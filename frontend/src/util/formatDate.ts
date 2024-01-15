export default function formatDate(date: string): Date {
  console.log(date);

  if (!date.includes("/")) {
    return new Date(`${date} 00:00:00`);
  }

  const [day, month, year] = date.split("/");
  console.log(new Date(`${+year}-${+month}-${+day} 00:00:00`));
  return new Date(`${+year}-${+month}-${+day} 00:00:00`);
}
