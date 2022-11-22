import { BodyShort, ConfirmationPanel, Button, Link } from "@navikt/ds-react";
import React, { useState } from "react";
import GreetingCard from "../../card/greeting-card/GreetingCard";

export default function RequestStartPage() {
  const [isAgree, setIsAgree] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-10 items-center">
      <GreetingCard />
      <BodyShort>Dine rettigheter og plikter?</BodyShort>
      <ConfirmationPanel
        checked={isAgree}
        label="Jeg har lest og forstått...."
        onChange={() => setIsAgree(!isAgree)}
        size="small"
      ></ConfirmationPanel>
      <div className="flex space-x-12">
        <Button>Neste</Button>
        <Button type="button" variant="secondary">
          Avbryt
        </Button>
      </div>
      <Link href="https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad#NAV140507">
        Les om hvordan NAV behandler personopplysningene dine.
      </Link>
    </div>
  );
}
