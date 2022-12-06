import { Heading, Button, Alert } from "@navikt/ds-react";
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
        <div className="w-full flex flex-col gap-10">
          <GreetingCard name={userInformation.fornavn} gender={userInformation.kjønn} />
          <div>
            <p>
              På denne siden finner du en oversikt over dine saker om fordeling av reisekostnader.
              Det vil si at hvis du har noen saker, finner du både de du har sendt inn selv og de
              som du eventuelt har mottatt fra den andre forelderen.
            </p>
            <p>I tillegg kan du fra denne siden sende inn en ny sak til behandling.</p>
          </div>
          {forespørslerSomMotpart.length === 0 && forespørslerSomHovedpart.length == 0 && (
            <Alert variant="info">Du har ingen saker om fordeling av reisekostnader</Alert>
          )}
          <div>
            <Link href="/foresporsel">
              <Button type="button">Send inn en ny sak om fordeling av reisekostnader</Button>
            </Link>
          </div>
          {forespørslerSomMotpart.length > 0 && (
            <>
              <div className="w-full flex flex-col gap-5">
                {forespørslerSomMotpart && (
                  <Heading level="1" size="small">
                    Saker du har mottatt fra den andre forelderen:
                  </Heading>
                )}
                {forespørslerSomMotpart
                  .filter((foresporsel) => !foresporsel.erAlleOver15)
                  .map((request, index) => {
                    return <OverviewCard key={index} foresporsel={request} />;
                  })}
              </div>
            </>
          )}
          {forespørslerSomHovedpart.length > 0 && (
            <div className="w-full flex flex-col gap-5">
              <Heading level="1" size="small">
                Saker du har sendt inn:
              </Heading>
              {forespørslerSomHovedpart.map((request, index) => {
                return <OverviewCard key={index} foresporsel={request} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
