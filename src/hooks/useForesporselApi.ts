import { useState } from 'react';
import { ApiOperation } from '../enum/api';
import { HTTPStatus } from '../enum/HttpStatus';

import { requestBody } from '../utils/api.utils';
import { INyForespørsel } from '../types/payload/foresporselPayload';
import { useSWRConfig } from 'swr';

export function useForesporselApi() {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [failed, setFailed] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const { mutate } = useSWRConfig();

    function updateStatesBeforeCall(): void {
        if (failed) {
            setFailed(false);
        }

        setSubmitting(true);
    }

    async function updateStatesAfterCall(result: Response, successCode: HTTPStatus): Promise<void> {
        if (result.status === successCode) {
            await mutate('/api/brukerinformasjon');

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
                '/api/foresporsel/ny',
                requestBody(ApiOperation.POST, { identerBarn: [...identer] } as INyForespørsel)
            );

            await updateStatesAfterCall(result, HTTPStatus.CREATED);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            setFailed(true);
        }
    }

    async function trekkeForesporsel(foresporselId: number): Promise<void> {
        try {
            updateStatesBeforeCall();

            const result = await fetch(
                '/api/foresporsel/trekke',
                requestBody(ApiOperation.PUT, foresporselId)
            );

            await updateStatesAfterCall(result, HTTPStatus.OK);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            setFailed(true);
        }
    }

    async function samtykkeForesporsel(foresporselId: number): Promise<void> {
        try {
            updateStatesBeforeCall();

            const result = await fetch(
                '/api/foresporsel/samtykke',
                requestBody(ApiOperation.PUT, foresporselId)
            );

            await updateStatesAfterCall(result, HTTPStatus.OK);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            setFailed(true);
        }
    }

    return {
        submitting,
        failed,
        success,
        createForesporsel,
        trekkeForesporsel,
        samtykkeForesporsel,
    };
}
