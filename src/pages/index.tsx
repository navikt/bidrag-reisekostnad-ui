import Overview from "../views/overview/Overview";
import { useEffect } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";
import useSWRImmutable from "swr/immutable";
import { logger } from "../lib/logging/logger";
import { IBrukerinformasjon } from "../types/foresporsel";
import Spinner from "../components/spinner/spinner/spinner";

export default function Home() {
  const { data } = useSWRImmutable<IBrukerinformasjon>("/api/brukerinformasjon");
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
