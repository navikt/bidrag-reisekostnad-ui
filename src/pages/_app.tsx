import type { AppProps } from 'next/app';
import { ReisekostnadProvider } from '../context/reisekostnadContext';
import '../styles/globals.css';
import TokenInput from '../components/TokenInput';
import { NoSessionModal } from '../components/session/NoSessionModal';
import { SWRConfig } from 'swr';
import { fetcher } from '../utils/api.utils';
import { appWithTranslation } from 'next-i18next';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
    /* empty */
}

function App({ Component, pageProps }: AppProps) {
    return (
        <ReisekostnadProvider>
            <SWRConfig value={{ fetcher }}>
                <main className="max-w-[680px] mx-auto px-4 py-18 leading-xlarge tracking-wide">
                    <Component {...pageProps} />
                </main>
                <TokenInput />
                <NoSessionModal />
            </SWRConfig>
        </ReisekostnadProvider>
    );
}

export default appWithTranslation(App);
