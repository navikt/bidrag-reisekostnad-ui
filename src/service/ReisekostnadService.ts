import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IForesporsel } from "../types/foresporsel";
import {DefaultConsumer} from "./DefaultConsumer";
import {ISession} from "../lib/security/session";

export default class ReisekosnadService extends DefaultConsumer {
  constructor(session: ISession) {
    super(environment.audiences.bidrag_reisekostnad_api, environment.url.bidragReisekostnad, session);
  }

  // TODO
  async hentForesporsel(ident: string): Promise<IForesporsel | null> {
    const response = await this.post<IForesporsel>("/sak", JSON.stringify(ident));

    if (response.status !== HTTPStatus.OK) {
      throw new Error(`Fikk respons ${response.status}`);
    }

    return null;
  }
}
