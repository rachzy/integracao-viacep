export default function formatDate(date: string): Date {
  if (!date.includes("/")) {
    return new Date(`${date} 00:00:00`);
  }

  const [day, month, year] = date.split("/");
  return new Date(`${+year}-${+month}-${+day} 00:00:00`);
}
