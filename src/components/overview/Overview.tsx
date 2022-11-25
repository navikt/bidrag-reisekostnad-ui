import { Heading, BodyShort, Button } from "@navikt/ds-react";
import GreetingCard from "../card/greeting-card/GreetingCard";
import OverviewCard from "../card/overview-card/OverviewCard";
import Link from "next/link";
import { useReisekostnad } from "../../context/reisekostnadContext";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OverviewStartPage() {
  const { data, error } = useSWR("/api/brukerinformasjon", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { userInformation } = useReisekostnad();

  if (!userInformation) {
    return null;
  }

  const { forespørslerSomMotpart } = userInformation;

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex flex-col gap-10 items-center">
        {/* TODO mangler kjønn */}
        <GreetingCard name={data.brukersFornavn} gender={"kvinne"} />
        {forespørslerSomMotpart.length > 0 && (
          <>
            <div className="flex flex-col gap-6">
              {/* TODO: MIDLERTIDIG LØSNING. TEKSTEN ER VELDIG SPESIFIKK MOT EN MOTPART, MEN EN PERSON KAN FÅ FORESØPLER FRA FLERE FORSKJELLIGE MOTPART */}
              <BodyShort>
                {forespørslerSomMotpart[0].hovedpart.fornavn} har sendt en forerspørsel om fordeling
                av reisekostnader for Barn 1, dd.mm.yyyy til deg.
              </BodyShort>
              <BodyShort>Det trenges ditt samtykke, slik at NAV kan behandle den videre.</BodyShort>
            </div>
            <div className="w-full flex flex-col gap-2">
              {forespørslerSomMotpart && (
                <Heading level="2" size="small">
                  Oversikt
                </Heading>
              )}
              {forespørslerSomMotpart?.map((request, index) => {
                return <OverviewCard key={index} foresporsel={request} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
