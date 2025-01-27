import idporten from './idporten';
import mockTokenProvider from './mock';

function withTokenProvider() {
    if (process.env.NODE_ENV == 'development' && process.env.ENABLE_MOCK_PROVIDER == 'true') {
        return mockTokenProvider;
    }

    return idporten;
}

const tokenProvider = withTokenProvider();
export default tokenProvider;
