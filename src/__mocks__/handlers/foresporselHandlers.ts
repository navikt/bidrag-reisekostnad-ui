import { http, HttpResponse, delay } from 'msw';

export const opprettNyForesporselHandlers = [
    http.post('/api/foresporsel/ny', async () => {
        await delay(100);
        return new HttpResponse(null, {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200,
        });
    }),
];

export const trekkeForesporselHandlers = [
    http.put('/api/foresporsel/trekke', async () => {
        await delay(100);
        return new HttpResponse(null, {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 201,
        });
    }),
];

export const samtykkeForesporselHandlers = [
    http.put('/api/foresporsel/samtykke', async () => {
        await delay(100);
        return new HttpResponse(null, {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 201,
        });
    }),
];
