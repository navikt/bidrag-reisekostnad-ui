import Overview from "../views/overview/Overview";
import useSWR from "swr";
import { useEffect } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";
import { fetcher } from "../utils/apiUtils";
import { Loader } from "@navikt/ds-react";

export default function Home() {
  const { data, error } = useSWR("/api/brukerinformasjon", fetcher);
  const { updateUserInformation } = useReisekostnad();

  useEffect(() => {
    if (data) {
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
