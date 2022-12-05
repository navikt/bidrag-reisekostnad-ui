import Overview from "../views/overview/Overview";
import { useEffect } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";
import useSWRImmutable from "swr/immutable";
import { IBrukerinformasjon } from "../types/foresporsel";
import Spinner from "../components/spinner/spinner/spinner";
import { generateAndStoreCorrelationIdAsCookie } from "../lib/logging/types";

export default function Home() {
  const { data } = useSWRImmutable<IBrukerinformasjon>("/api/brukerinformasjon");
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
