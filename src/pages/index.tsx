import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import OverviewStartPage from "../components/overview/start-page/OverviewStartPage";

// export function getStaticProps() {
// }

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fordeling av reisekostnader</title>
        <meta name="description" content="Fordeling av reisekostnader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <OverviewStartPage />
      </main>
    </div>
  );
}
