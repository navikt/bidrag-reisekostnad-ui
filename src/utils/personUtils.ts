import { IPerson } from "../types/foresporsel";
import { calculateAge } from "./dateUtils";

export function getPersonOver15YearsOld(person: IPerson[]): IPerson[] {
  return person.filter((i) => i.alder >= 15);
}

export function isAgeOver15YearsOld(fodselsdato: string): boolean {
  return calculateAge(fodselsdato) >= 15;
}

export function isEveryoneOver15YearsOld(person: IPerson[]): boolean {
  return person.every((i) => isAgeOver15YearsOld(i.fødselsdato));
}

export function mapToPersonWithAge(person: IPerson[]): IPerson[] {
  return person.map((p) => ({ ...p, alder: calculateAge(p.fødselsdato) }));
}
