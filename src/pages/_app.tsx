import type { AppProps } from "next/app";
import { ReisekostnadProvider } from "../context/reisekostnadContext";
import "../styles/globals.css";
import TokenInput from "../components/TokenInput";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReisekostnadProvider>
      <main className="max-w-max mx-auto px-4 py-18">
        <Component {...pageProps} />
      </main>
      <TokenInput />
    </ReisekostnadProvider>
  );
}
