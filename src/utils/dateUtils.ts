import dayjs from "dayjs";

export function calculateAge(date: string) {
  return dayjs().diff(dayjs(date), "year");
}

export function today(): string {
  return dayjs().format("DD.MM.YYYY");
}

export function formatDate(date: string): string {
  return dayjs(date).format("DD.MM.YYYY");
}

export function is15YearsOldIn30Days(fodselsdato: string): boolean {
  if (calculateAge(fodselsdato) >= 15) {
    return false;
  }

  const next30Days = dayjs().add(30, "day");
  const ageIn30Days = dayjs(next30Days).diff(dayjs(fodselsdato), "year");

  return ageIn30Days >= 15;
}
