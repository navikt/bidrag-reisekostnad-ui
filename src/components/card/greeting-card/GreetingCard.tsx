import { Heading } from "@navikt/ds-react";
import React from "react";
import { Gender } from "../../../enum/gender";
import { NavVeilederKvinne } from "../../../svg-icons/NavVeilederKvinne";
import NavVeilederMann from "../../../svg-icons/NavVeilederMann";
import { useTranslation } from "next-i18next";

interface IGreetingCardProps {
  name: string;
  gender: Gender;
}
export default function GreetingCard({ name, gender }: IGreetingCardProps) {
  const { t: translate } = useTranslation("oversikt");

  return (
    <div className="flex flex-col items-center gap-5">
      {gender === Gender.KVINNE ? <NavVeilederKvinne /> : <NavVeilederMann />}
      <Heading level="1" size="large">
        {translate("greeting")} {name}
      </Heading>
    </div>
  );
}
