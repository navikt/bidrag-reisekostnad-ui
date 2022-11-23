import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IForesporsel } from "../types/foresporsel";
import {DefaultConsumer} from "./DefaultConsumer";
import {ISession} from "../libs/security/session";
import { IBrukerinformasjon } from "../types/foresporsel";

export default class ReisekosnadService extends DefaultConsumer {
  constructor(session: ISession) {
    super(environment.audiences.bidrag_reisekostnad_api, environment.url.bidragReisekostnad, session);
  }

  // TODO
  async hentForesporsel(ident: string): Promise<IBrukerinformasjon | null> {
    const response = await this.post<IBrukerinformasjon>("/sak", JSON.stringify(ident));

    if (response.status !== HTTPStatus.OK) {
      throw new Error(`Fikk respons ${response.status}`);
    }

    return null;
  }
}
