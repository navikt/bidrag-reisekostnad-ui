import { IPerson } from "../types/foresporsel";

export function getBarnInformationText(person: IPerson): string {
  return `${person.fornavn}, ${person.fødselsdato}, ${person.alder} år `;
}
