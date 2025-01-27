import { IPerson } from '../types/person';
import { formatDate } from './date.utils';

export function getBarnInformationText(person: IPerson, year: string): string {
    return `${person.fornavn} ${formatDate(person.fødselsdato)}, ${person.alder} ${year}`;
}
