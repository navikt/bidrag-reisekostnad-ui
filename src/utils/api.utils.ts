import { ApiOperation } from '../enum/api';

export const fetcher = (url: string) =>
    fetch(url).then(async (res) => {
        if (res.status === 401) {
            throw Error('No session');
        }
        if (res.status >= 500) {
            const response = await res.json();
            throw { status: res.status, message: response?.message };
        }
        return res.json();
    });

/* eslint-disable @typescript-eslint/no-explicit-any */
export function requestBody(type: ApiOperation, body: any): RequestInit {
    return {
        method: type,
        body: JSON.stringify(body),
    };
}
