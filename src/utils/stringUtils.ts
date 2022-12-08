import { IPerson } from "../types/foresporsel";
import { formatDate } from "./dateUtils";

export function getBarnInformationText(person: IPerson, year: string): string {
  return `${person.fornavn} ${formatDate(person.fødselsdato)}, ${person.alder} ${year}`;
}
