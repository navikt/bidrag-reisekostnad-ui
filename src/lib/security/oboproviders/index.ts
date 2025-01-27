import { IAuthProvider } from '../providers/AuthProvider';
import tokenx from './tokenx';
import { withOboTokenCache } from '../cache/withOboTokenCache';

export async function oboToken(provider: IAuthProvider, subject_token: string) {
    switch (provider.name) {
        case 'idporten':
            return async (audience: string) =>
                (await withOboTokenCache(tokenx.exchangeToken()))(subject_token, audience);
        case 'mock':
            return async (audience: string) =>
                (await withOboTokenCache(tokenx.exchangeToken()))(subject_token, audience);
        default:
            throw new Error('Missing token issuer for this provider');
    }
}
