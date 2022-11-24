import {ApiError} from "@navikt/bidrag-ui-common";
import { v4 as uuidV4 } from "uuid";
import {ISession} from "../lib/security/session";

type FetchMethods = "GET" | "POST" | "PUT";

export interface FetchConfig {
    params?: object;
    headers?: HeadersInit;
}

export interface ApiResponse<T = any> {
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
        return {
            json: false,
            body: responseText,
        };
    }
}

export class DefaultConsumer {
    private readonly audience: string
    private baseUrl: string
    private session: ISession
    constructor(audience: string, baseUrl: string, session: ISession) {
        this.audience = audience;
        this.baseUrl = baseUrl;
        this.session = session
    }
    protected get<T>(url: string, config?: FetchConfig) {
       return this.fetchResponse<T>(url, "GET", undefined, config)
    }
    protected put<T>(url: string, body?: string, config?: FetchConfig) {
       return this.fetchResponse<T>(url, "PUT", body, config)
    }
    protected post<T>(url: string, body?: string, config?: FetchConfig) {
       return this.fetchResponse<T>(url, "POST", body, config)
    }

   async fetchResponse<T>(
        url: string,
        method: FetchMethods,
        body?: BodyInit,
        config?: FetchConfig
    ): Promise<ApiResponse<T>> {
        const idToken = await this.session.getOBOToken(this.audience)
        const headers: HeadersInit = {
            "X-Correlation-ID": uuidV4(),
            Authorization: "Bearer " + idToken,
            "Content-type": "application/json; charset=UTF-8",
            "Nav-Consumer-Id": "bidrag-reisekostnad-ui",
            ...config?.headers,
        };
        const fullUrl = this.baseUrl + url
       return fetch(fullUrl, {
            body,
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
            } as ApiResponse<T>;
        })
        .catch(async (err: any) => {
            const correlationId = err?.headers?.get("x-correlation-id") || uuidV4();
            const responseBody = typeof err.text === "function" ? await err?.text() : err.message;
            const errorMessage =
                `Det skjedde feil ved kall mot ${url} med http-metode ${method}. ` +
                `Fikk respons fra endepunkt med feilmelding=${err.statusText} og feilkode=${err.status}`;
            throw new ApiError(errorMessage, responseBody, correlationId, err.status);
        });
    }
}
