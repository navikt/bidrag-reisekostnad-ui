/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISession } from '../lib/security/session';
import { getCorrelationIdFromContext } from '../lib/logging/als';
import { logger } from '../lib/logging/logger';

type FetchMethods = 'GET' | 'POST' | 'PUT';
export class CustomError extends Error {
    public correlationId: string | null;
    status = 500;

    constructor(
        name: string,
        correlationId: string | null,
        message: string,
        stack?: string,
        cause?: unknown | undefined
    ) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this);
        }
        this.stack = this.stack + "\r\n\r\n" + stack;
        this.correlationId = correlationId;
    }
}
export class ApiError extends CustomError {
    declare public status: number;
    // @ts-ignore
    public data: any;
    public ok = false;
    public error?: Error;

    constructor(
        message: string,
        stack: string,
        correlationId?: string,
        status?: number,
        error?: Error
    ) {
        super("ApiException", correlationId ?? null, message, stack, error?.cause);
        this.status = status ?? 500;
        this.error = error;
    }
}
export interface IFetchConfig {
    params?: object;
    headers?: HeadersInit;
}

export interface IApiResponse<T = any> {
    ok: boolean;
    status: number;
    headers?: Headers;
    data: T;
}

async function parseResponseBody(response: Response) {
    const responseText = await response.text();
    try {
        const body = JSON.parse(responseText);
        return {
            json: true,
            body,
        };
    } catch (e) {
        logger.error(e);
        return {
            json: false,
            body: responseText,
        };
    }
}

export class DefaultConsumer {
    private readonly audience: string;
    private baseUrl: string;
    private session: ISession;
    constructor(audience: string, baseUrl: string, session: ISession) {
        this.audience = audience;
        this.baseUrl = baseUrl;
        this.session = session;
    }
    protected get<T>(url: string, config?: IFetchConfig) {
        return this.fetchResponse<T>(url, 'GET', undefined, config);
    }
    protected put<T>(url: string, body?: string | object, config?: IFetchConfig) {
        return this.fetchResponse<T>(url, 'PUT', body, config);
    }
    protected post<T>(url: string, body?: string | object, config?: IFetchConfig) {
        return this.fetchResponse<T>(url, 'POST', body, config);
    }

    async fetchResponse<T>(
        url: string,
        method: FetchMethods,
        body?: string | object,
        config?: IFetchConfig
    ): Promise<IApiResponse<T>> {
        const idToken = await this.session.getOBOToken(this.audience);
        const bodyString = typeof body == 'string' ? body : JSON.stringify(body);
        const headers: HeadersInit = {
            'X-Correlation-ID': getCorrelationIdFromContext(),
            Authorization: 'Bearer ' + idToken,
            'Content-type': 'application/json; charset=UTF-8',
            'Nav-Consumer-Id': 'bidrag-reisekostnad-ui',
            ...config?.headers,
        };
        const fullUrl = this.baseUrl + url;
        console.log(fullUrl);
        return fetch(fullUrl, {
            body: bodyString,
            method,
            headers,
        })
            .then(async (response: Response) => {
                // ok=2xx, let frontend handle 4xx and 5xx errors
                if (!response.ok) {
                    throw response;
                }

                const responseParsed = await parseResponseBody(response);
                return {
                    ok: true,
                    status: response.status,
                    headers: response.headers,
                    data: responseParsed.body,
                } as IApiResponse<T>;
            })
            .catch(async (err: any) => {
                logger.error(err);
                const correlationId =
                    err?.headers?.get('x-correlation-id') || getCorrelationIdFromContext();
                const responseBody =
                    typeof err.text === 'function' ? await err?.text() : err.message;
                const errorMessage =
                    `Det skjedde feil ved kall mot ${fullUrl} med http-metode ${method}. ` +
                    `Fikk respons fra endepunkt med feilmelding=${err.statusText} og feilkode=${err.status}`;
                throw new ApiError(errorMessage, responseBody, correlationId, err.status);
            });
    }
}
