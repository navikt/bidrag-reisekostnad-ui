import Overview from "../views/overview/Overview";
import { useEffect } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";
import { logger } from "../lib/logging/logger";
import { IBrukerinformasjon } from "../types/foresporsel";
import Spinner from "../components/spinner/spinner/spinner";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR<IBrukerinformasjon>("/api/brukerinformasjon");
  const { updateUserInformation } = useReisekostnad();

  useEffect(() => {
    if (data) {
      logger.info("Lastet informasjon om bruker " + data.fornavn);
      updateUserInformation(data);
    }
  }, [data]);

  if (!data) return <Spinner />;

  return <Overview />;
}
