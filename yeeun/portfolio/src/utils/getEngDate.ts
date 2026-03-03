export default function getEngDate(timestamp: string | Date): string {
  const date: Date =
    timestamp instanceof Date ? timestamp : new Date(timestamp);

  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName: string = months[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
}
