import type { AppProps } from "next/app";
import { ReisekostnadProvider } from "../context/reisekostnadContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReisekostnadProvider>
      <Component {...pageProps} />
    </ReisekostnadProvider>
  );
}
