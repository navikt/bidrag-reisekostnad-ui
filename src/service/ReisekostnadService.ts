import { HTTPStatus } from "../enum/HttpStatus";
import environment from "../environment";
import { IBrukerinformasjon } from "../types/foresporsel";
import { DefaultConsumer, IApiResponse } from "./DefaultConsumer";
import { ISession } from "../lib/security/session";
import { INyForespørsel } from "../types/payload/foresporselPayload";
import { logger } from "../lib/logging/logger";

export default class ReisekostnadService extends DefaultConsumer {
  constructor(session: ISession) {
    super(
      environment.audiences.bidrag_reisekostnad_api,
      environment.url.bidragReisekostnad,
      session,
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
    logger.info("Lage en ny forepørsel for " + nyForeporsel);
    return await this.post<void>("/api/v1/reisekostnad/forespoersel/ny", nyForeporsel);
  }

  async trekkeForesporsel(foresporselId: number): Promise<IApiResponse<unknown>> {
    logger.info(`Trekke forespørsel: ${foresporselId} tilbake`);

    return await this.put<void>(`/api/v1/reisekostnad/forespoersel/trekke?id=${foresporselId}`);
  }

  async samtykkeForesporsel(foresporselId: number): Promise<IApiResponse<unknown>> {
    logger.info(`Samtykke forespørsel: ${foresporselId}`);

    return await this.put(`/api/v1/reisekostnad/forespoersel/samtykke?id=${foresporselId}`);
  }
}
