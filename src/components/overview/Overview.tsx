import { Heading, BodyShort, Button } from "@navikt/ds-react";
import GreetingCard from "../card/greeting-card/GreetingCard";
import OverviewCard from "../card/overview-card/OverviewCard";
import Link from "next/link";
import { useReisekostnad } from "../../context/reisekostnadContext";

export default function OverviewStartPage() {
  const { userInformation } = useReisekostnad();

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex flex-col gap-10 items-center">
        <GreetingCard name={"Navn"} gender={"kvinne"} />
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
          {userInformation?.foresporslerSomMotpart.map((request, index) => {
            return (
              <OverviewCard
                key={index}
                name={request.hovedpart.fornavn}
                // TODO hvilket felt skal dette sjekkes mot?
                status="Venter på signering"
                foresporselId={request.idForesporsel.toString()}
              />
            );
          })}
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
