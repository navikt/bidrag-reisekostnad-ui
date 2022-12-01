import { useState } from "react";
import { ApiOperation } from "../enum/api";
import useSWRImmutable from "swr/immutable";
import { HTTPStatus } from "../enum/HttpStatus";

import { requestBody } from "../utils/apiUtils";
import { INyForespørsel } from "../types/payload/foresporselPayload";

export default function useCreateForesporsel() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [failedToPost, setFailedToPost] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { mutate } = useSWRImmutable("/api/brukerinformasjon");

  async function createForesporsel(identer: string[]): Promise<void> {
    try {
      if (failedToPost) {
        setFailedToPost(false);
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
        setFailedToPost(true);
      }
      setSubmitting(false);
    } catch (error: any) {
      setFailedToPost(true);
    }
  }

  return { submitting, failedToPost, success, createForesporsel };
}
