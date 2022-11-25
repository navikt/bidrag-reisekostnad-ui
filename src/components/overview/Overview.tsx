import { Heading, BodyShort } from "@navikt/ds-react";
import GreetingCard from "../card/greeting-card/GreetingCard";
import OverviewCard from "../card/overview-card/OverviewCard";
import { useReisekostnad } from "../../context/reisekostnadContext";

export default function OverviewStart({ name }: { name: string }) {
  const { userInformation } = useReisekostnad();

  if (!userInformation) {
    return null;
  }

  const { forespørslerSomMotpart } = userInformation;

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex flex-col gap-10 items-center">
        {/* TODO mangler kjønn */}
        <GreetingCard name={name} gender={"kvinne"} />
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
