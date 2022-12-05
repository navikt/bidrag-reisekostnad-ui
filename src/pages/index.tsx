import Overview from "../views/overview/Overview";
import { useEffect } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";
import { IBrukerinformasjon } from "../types/foresporsel";
import Spinner from "../components/spinner/spinner/spinner";
import useSWR from "swr";
import { generateAndStoreCorrelationIdAsCookie } from "../lib/logging/types";
import { fetcher } from "../utils/apiUtils";

export default function Home() {
  const { data } = useSWR<IBrukerinformasjon>("/api/brukerinformasjon", fetcher);
  const { updateUserInformation } = useReisekostnad();

  useEffect(generateAndStoreCorrelationIdAsCookie, []);

  useEffect(() => {
    if (data) {
      updateUserInformation(data);
    }
  }, [data]);

  if (!data) return <Spinner />;

  return <Overview />;
}
