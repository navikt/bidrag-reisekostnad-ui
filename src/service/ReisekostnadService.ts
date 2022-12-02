import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IBrukerinformasjon } from "../types/foresporsel";
import { DefaultConsumer, IApiResponse } from "./DefaultConsumer";
import { ISession } from "../lib/security/session";
import { INyForespørsel } from "../types/payload/foresporselPayload";

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

  async opprettNyForesporsel(nyForeporsel: INyForespørsel): Promise<IApiResponse<unknown>> {
    const response = await this.post(
      "/api/v1/reisekostnad/forespoersel/ny",
      JSON.stringify(nyForeporsel)
    );

    return response;
  }

  async trekkeForesporsel(foresporselId: number): Promise<IApiResponse<unknown>> {
    const response = await this.put(`/api/v1/reisekostnad/forespoersel/trekke/${foresporselId}`);

    return response;
  }

  async samtykkeForesporsel(foresporselId: number): Promise<IApiResponse<unknown>> {
    const response = await this.put(`/api/v1/reisekostnad/forespoersel/samtykke/${foresporselId}`);

    return response;
  }
}
