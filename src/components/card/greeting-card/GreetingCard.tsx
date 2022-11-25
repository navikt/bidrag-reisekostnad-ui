import { Heading } from "@navikt/ds-react";
import React from "react";
import { NavVeilederKvinne } from "../../../svg-icons/NavVeilederKvinne";
import NavVeilederMann from "../../../svg-icons/NavVeilederMann";

interface IGreetingCardProps {
  name: string;
  gender: "kvinne" | "mann";
}
export default function GreetingCard({ name, gender }: IGreetingCardProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      {gender === "kvinne" ? <NavVeilederKvinne /> : <NavVeilederMann />}
      <Heading level="1" size="large">
        Hei {name}
      </Heading>
    </div>
  );
}
