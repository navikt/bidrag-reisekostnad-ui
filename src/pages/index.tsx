import Head from "next/head";
import OverviewStartPage from "../components/overview/Overview";

// export function getStaticProps() {
// }

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fordeling av reisekostnader</title>
        <meta name="description" content="Fordeling av reisekostnader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <OverviewStartPage />
    </div>
  );
}
