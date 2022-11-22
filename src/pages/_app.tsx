import type { AppProps } from "next/app";
import { ReisekostnadProvider } from "../context/reisekostnadContext";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReisekostnadProvider>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    </ReisekostnadProvider>
  );
}
