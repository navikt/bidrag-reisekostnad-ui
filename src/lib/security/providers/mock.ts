import { JWTVerifyResult } from 'jose';
import { decodeJwt } from 'jose';
import { MockProvider } from './AuthProvider';
import { NextApiRequest } from 'next';

async function verifyToken(token: string): Promise<JWTVerifyResult> {
    return {
        payload: decodeJwt(token),
        protectedHeader: {
            alg: 'mock',
        },
    };
}

const mockTokenProvider: MockProvider = {
    name: 'mock',
    getToken: (req: NextApiRequest) => req.cookies['token'] ?? process.env.IDPORTEN_TOKEN!,
    verifyToken,
};
export default mockTokenProvider;
