import type { AppProps } from "next/app";
import { ReisekostnadProvider } from "../context/reisekostnadContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReisekostnadProvider>
      <main className="max-w-3xl mx-auto px-4 py-18 ">
        <Component {...pageProps} />
      </main>
    </ReisekostnadProvider>
  );
}
