import { Heading, BodyShort, ConfirmationPanel, Button, Link } from "@navikt/ds-react";
import React from "react";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { NavVeilederKvinne } from "../../svg-icons/NavVeilederKvinne";

export function FrontPage() {
  const { isAgree, updateIsAgree } = useReisekostnad();

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="grid gap-3">
        <NavVeilederKvinne />
        <Heading level="1" size="xlarge">
          Hei Navn
        </Heading>
      </div>
      <BodyShort>Dine rettigheter og plikter?</BodyShort>
      <ConfirmationPanel
        checked={isAgree}
        label="Jeg har lest og forstått...."
        onChange={() => updateIsAgree(!isAgree)}
        size="small"
      ></ConfirmationPanel>
      <div className="flex space-x-12">
        <Button>Neste</Button>
        <Button type="button" variant="secondary">
          Avbryt
        </Button>
      </div>
      <Link href="#">Les om hvordan NAV behandler personopplysningene dine.</Link>
    </div>
  );
}
