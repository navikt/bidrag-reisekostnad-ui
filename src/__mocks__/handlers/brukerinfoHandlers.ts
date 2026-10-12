import { http, HttpResponse } from 'msw/http';
import { delay } from 'msw/utils/delay';
import { IBrukerinformasjon } from '../../types/foresporsel';
import { BRUKER_INFORMASJON_1 } from '../testdata/brukerinformasjon';

export const brukerinfoHandlers = [
    http.get('/api/brukerinformasjon', async () => {
        await delay(100);
        return HttpResponse.json<IBrukerinformasjon>(BRUKER_INFORMASJON_1);
    }),
];
