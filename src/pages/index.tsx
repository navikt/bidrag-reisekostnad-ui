import Overview from "../views/overview/Overview";
import { useEffect } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";
import { fetcher } from "../utils/apiUtils";
import { Loader } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import {logger} from "../lib/logging/logger";

export default function Home() {
  const { data, error } = useSWRImmutable("/api/brukerinformasjon", fetcher);
  const { updateUserInformation } = useReisekostnad();

  useEffect(() => {
    if (data) {
      logger.info("Lastet informasjon om bruker " + data.brukersFornavn);
      updateUserInformation(data);
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;

  if (!data)
    return (
      <div className="w-full flex flex-col items-center">
        <Loader size="3xlarge" title="venter..." variant="interaction" />
      </div>
    );

  return <Overview name={data.brukersFornavn} />;
}
