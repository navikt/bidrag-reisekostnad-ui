import Head from "next/head";
import OverviewStart from "../components/overview/Overview";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/brukerinformasjon", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Fordeling av reisekostnader</title>
        <meta name="description" content="Fordeling av reisekostnader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <OverviewStart name={data.brukersFornavn} />
    </div>
  );
}
