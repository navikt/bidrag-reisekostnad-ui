import { DefaultRestService } from "@navikt/bidrag-ui-common";
import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IBrukerinformasjon } from "../types/foresporsel";

export default class ReisekosnadService extends DefaultRestService {
  constructor() {
    super("bidrag-reisekostnad", environment.url.bidragReisekostnad);
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
