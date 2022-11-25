import { Heading, BodyShort, Button } from "@navikt/ds-react";
import GreetingCard from "../card/greeting-card/GreetingCard";
import OverviewCard from "../card/overview-card/OverviewCard";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OverviewStartPage() {
  const { data, error } = useSWR('/api/brukerinformasjon', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex flex-col gap-10 items-center">
        <GreetingCard name={data.brukersFornavn} gender={"kvinne"} />
        <div className="flex flex-col gap-6">
          <BodyShort>
            Kari Nordmann har sendt en forerspørsel om fordeling av reisekostnader for Barn 1,
            dd.mm.yyyy til deg.
          </BodyShort>
          <BodyShort>Det trenges ditt samtykke, slik at NAV kan behandle den videre.</BodyShort>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Heading level="2" size="small">
            Oversikt
          </Heading>
          <OverviewCard name="Kari Nordmann" status="Venter på signering" />
        </div>
      </div>
      <div className="flex space-x-12">
        <Link href="/foresporsel">
          <Button type="button">Opprett en ny fordeling av reisekostnader</Button>
        </Link>
      </div>
    </div>
  );
}
