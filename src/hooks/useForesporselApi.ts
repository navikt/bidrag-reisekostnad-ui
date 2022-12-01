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

  async function createForesporsel(identer: string[]): Promise<void> {
    try {
      if (failed) {
        setFailed(false);
      }

      setSubmitting(true);
      const result = await fetch(
        "/api/foresporsel/ny",
        requestBody(ApiOperation.POST, { identerBarn: [...identer] } as INyForespørsel)
      );

      if (result.status === HTTPStatus.OK) {
        mutate();
        setSuccess(true);
      } else {
        setFailed(true);
      }
      setSubmitting(false);
    } catch (error: unknown) {
      setFailed(true);
    }
  }

  async function trekkeForesporsel(foresporselId: number): Promise<void> {
    try {
      if (failed) {
        setFailed(false);
      }

      setSubmitting(true);
      const result = await fetch(
        "/api/foresporsel/trekke",
        requestBody(ApiOperation.PUT, { foresporselId })
      );

      if (result.status === HTTPStatus.CREATED) {
        mutate();
        setSuccess(true);
      } else {
        setFailed(true);
      }
      setSubmitting(false);
    } catch (error: unknown) {
      setFailed(true);
    }
  }

  return { submitting, failed, success, createForesporsel, trekkeForesporsel };
}
