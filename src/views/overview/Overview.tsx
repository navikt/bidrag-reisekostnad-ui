import { Heading, BodyShort, Button } from "@navikt/ds-react";
import Link from "next/link";
import GreetingCard from "../../components/card/greeting-card/GreetingCard";
import OverviewCard from "../../components/card/overview-card/OverviewCard";
import { PageMeta } from "../../components/page-meta/PageMeta";
import { useReisekostnad } from "../../context/reisekostnadContext";

export default function Overview() {
  const { userInformation } = useReisekostnad();

  if (!userInformation) {
    return null;
  }

  const { forespørslerSomMotpart, forespørslerSomHovedpart } = userInformation;

  return (
    <>
      <PageMeta title="Oversikt" />
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-10 items-center">
          <GreetingCard name={userInformation.fornavn} gender={userInformation.kjønn} />
          {forespørslerSomMotpart.length > 0 && (
            <>
              <div className="flex flex-col gap-6">
                {/* TODO: MIDLERTIDIG LØSNING. TEKSTEN ER VELDIG SPESIFIKK MOT EN MOTPART, MEN EN PERSON KAN FÅ FORESØPLER FRA FLERE FORSKJELLIGE MOTPART */}
                <BodyShort>
                  {forespørslerSomMotpart[0].hovedpart.fornavn} har sendt en forerspørsel om
                  fordeling av reisekostnader for
                  {forespørslerSomMotpart[0].barn.map((person, i) => {
                    return (
                      <p key={i}>
                        {person.fornavn}, {person.fødselsdato}
                      </p>
                    );
                  })}
                </BodyShort>
                <BodyShort>
                  Det trenges ditt samtykke, slik at NAV kan behandle den videre.
                </BodyShort>
              </div>
              <div className="w-full flex flex-col gap-5">
                {forespørslerSomMotpart && (
                  <Heading level="2" size="small">
                    Sendt til deg:
                  </Heading>
                )}
                {forespørslerSomMotpart.map((request, index) => {
                  return <OverviewCard key={index} foresporsel={request} />;
                })}
              </div>
            </>
          )}
          {forespørslerSomHovedpart.length > 0 && (
            <div className="w-full flex flex-col gap-5">
              <Heading level="2" size="small">
                Sendt fra deg:
              </Heading>
              {forespørslerSomHovedpart.map((request, index) => {
                return <OverviewCard key={index} foresporsel={request} />;
              })}
            </div>
          )}
        </div>
        <Link href="/foresporsel">
          <Button>Opprett en ny fordeling av reisekostnader</Button>
        </Link>
      </div>
    </>
  );
}
