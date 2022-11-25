import Head from "next/head";
import Overview from "../views/overview/Overview";
import useSWR from "swr";
import { useEffect } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/brukerinformasjon", fetcher);
  const { updateUserInformation } = useReisekostnad();
  useEffect(() => {
    if (data) {
      updateUserInformation(data);
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Fordeling av reisekostnader</title>
        <meta name="description" content="Fordeling av reisekostnader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Overview name={data.brukersFornavn} />
    </div>
  );
}
