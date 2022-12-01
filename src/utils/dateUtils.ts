import dayjs from "dayjs";

export function calculateAge(date: string) {
  return dayjs().diff(dayjs(date), "year");
}

export function today(): string {
  return dayjs().format("DD-MM-YYYY");
}
