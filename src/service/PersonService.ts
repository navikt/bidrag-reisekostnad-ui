import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IForesporsel } from "../types/foresporsel";
import {DefaultConsumer} from "./DefaultConsumer";
import {ISession} from "../libs/security/session";
import {IPersonResponse} from "../types/person";
import {capitalizeFirstLetter} from "../libs/string.util";
import {IPerson} from "../types/person";

export default class PersonService extends DefaultConsumer {
  constructor(session: ISession) {
    super(environment.audiences.bidrag_person, environment.url.bidragPerson, session);
  }

  async hentPersonInfo(ident: string): Promise<IPerson | null> {
    const response = await this.post<IPersonResponse>("/informasjon", JSON.stringify({ident}));

    if (response.status !== HTTPStatus.OK) {
      throw new Error(`Fikk respons ${response.status}`);
    }

    const person = response.data
    return {
      navn: `${capitalizeFirstLetter(person?.fornavn)} ${capitalizeFirstLetter(person?.mellomnavn)} ${capitalizeFirstLetter(person?.etternavn)}`.replaceAll("  ", " "),
      fodselsnummer: ident
    };
  }
}
