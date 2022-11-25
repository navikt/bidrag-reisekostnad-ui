import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IBrukerinformasjon } from "../types/foresporsel";
import { DefaultConsumer } from "./DefaultConsumer";
import { ISession } from "../lib/security/session";

export default class ReisekostnadService extends DefaultConsumer {
  constructor(session: ISession) {
    super(
      environment.audiences.bidrag_reisekostnad_api,
      environment.url.bidragReisekostnad,
      session
    );
  }

  async hentBrukerInformasjon(): Promise<IBrukerinformasjon | null> {
    const response = await this.get<IBrukerinformasjon>("/api/v1/reisekostnad/brukerinformasjon");

    if (response.status !== HTTPStatus.OK) {
      throw new Error(`Fikk respons ${response.status}`);
    }

    return response.data;
  }
}
