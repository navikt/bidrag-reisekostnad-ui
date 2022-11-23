import dayjs from "dayjs";

export function calculateAge(date: string) {
  return dayjs().diff(dayjs(date), "year");
}
