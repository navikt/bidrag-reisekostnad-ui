import { useState } from "react";
import { ApiOperation } from "../enum/api";
import useSWRImmutable from "swr/immutable";
import { HTTPStatus } from "../enum/HttpStatus";

import { requestBody } from "../utils/apiUtils";
import { INyForespørsel } from "../types/payload/foresporselPayload";

export default function useForesporselApi() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { mutate } = useSWRImmutable("/api/brukerinformasjon");

  function updateStatesBeforeCall(): void {
    if (failed) {
      setFailed(false);
    }

    setSubmitting(true);
  }

  function updateStatesAfterCall(result: Response, successStatusCode: HTTPStatus): void {
    if (result.status === successStatusCode) {
      mutate();
      setSuccess(true);
    } else {
      setFailed(true);
    }
    setSubmitting(false);
  }

  async function createForesporsel(identer: string[]): Promise<void> {
    try {
      updateStatesBeforeCall();

      const result = await fetch(
        "/api/foresporsel/ny",
        requestBody(ApiOperation.POST, { identerBarn: [...identer] } as INyForespørsel)
      );

      updateStatesAfterCall(result, HTTPStatus.OK);
    } catch (error: unknown) {
      setFailed(true);
    }
  }

  async function trekkeForesporsel(foresporselId: number): Promise<void> {
    try {
      updateStatesBeforeCall();

      const result = await fetch(
        "/api/foresporsel/trekke",
        requestBody(ApiOperation.PUT, { foresporselId })
      );

      updateStatesAfterCall(result, HTTPStatus.CREATED);
    } catch (error: unknown) {
      setFailed(true);
    }
  }

  async function samtykkeForesporsel(foresporselId: number): Promise<void> {
    try {
      updateStatesBeforeCall();

      const result = await fetch(
        "/api/foresporsel/samtykke",
        requestBody(ApiOperation.PUT, { foresporselId })
      );

      updateStatesAfterCall(result, HTTPStatus.CREATED);
    } catch (error: unknown) {
      setFailed(true);
    }
  }

  return { submitting, failed, success, createForesporsel, trekkeForesporsel, samtykkeForesporsel };
}
