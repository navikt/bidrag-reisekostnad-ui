import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IBrukerinformasjon } from "../types/foresporsel";
import {DefaultConsumer} from "./DefaultConsumer";
import {ISession} from "../lib/security/session";

export default class PersonService extends DefaultConsumer {
  constructor(session: ISession) {
    super(environment.audiences.bidrag_person, environment.url.bidragPerson, session);
  }

  async hentBrukerInformasjon(ident: string): Promise<IBrukerinformasjon | null> {
    const response = await this.post<IBrukerinformasjon>("/informasjon", JSON.stringify({ident}));

    if (response.status !== HTTPStatus.OK) {
      throw new Error(`Fikk respons ${response.status}`);
    }

    return response.data;
  }
}
