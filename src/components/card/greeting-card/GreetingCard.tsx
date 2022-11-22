import { Heading } from "@navikt/ds-react";
import React from "react";
import { NavVeilederKvinne } from "../../../svg-icons/NavVeilederKvinne";

export default function GreetingCard() {
  return (
    <div className="grid gap-3">
      <NavVeilederKvinne />
      <Heading level="1" size="large">
        Hei Navn
      </Heading>
    </div>
  );
}
