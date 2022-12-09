import { SuccessStroke } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { useEffect } from "react";
import { useState } from "react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { IPerson } from "../../../types/foresporsel";
import { getBarnInformationText } from "../../../utils/stringUtils";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

interface IForesporselKvitteringContainerProps {
  barn: IPerson[];
  sentDate: string;
  showWarning?: boolean;
}

export default function ForesporselKvitteringContainer({
  barn,
  sentDate,
  showWarning = false,
}: IForesporselKvitteringContainerProps) {
  const [barnOver15, setBarnOver15] = useState<IPerson[]>();
  const [barnUnder15, setBarnUnder15] = useState<IPerson[]>();
  const { t: translate } = useTranslation();
  const { t: kvitteringTranslate } = useTranslation("kvittering");

  const year = translate("aar");

  useEffect(() => {
    setBarnOver15(barn.filter((person) => person.alder >= 15));
    setBarnUnder15(barn.filter((person) => person.alder < 15));
  }, []);

  return (
    <ConfirmationLayout title={kvitteringTranslate("foresporsel.title")}>
      <div className="grid gap-8">
        <div className="grid gap-1">
          <span className="flex items-center">
            <SuccessStroke color="green" fontSize="50" />
            {kvitteringTranslate("foresporsel.description", { date: sentDate })}
          </span>
          {barnOver15 && barnOver15.length > 0 && (
            <ul className="list-none flex flex-col gap-3">
              {barnOver15?.map((person, i) => {
                return (
                  <li key={i}>
                    {parse(
                      kvitteringTranslate("foresporsel.automatisk_til_nav", {
                        barnInfo: getBarnInformationText(person, year),
                      })
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {barnUnder15 && barnUnder15.length > 0 && (
            <ul className="list-none flex flex-col gap-3">
              {barnUnder15.map((person, i) => {
                return (
                  <li key={i}>
                    {parse(
                      kvitteringTranslate("foresporsel.trenger_samtykke", {
                        barnInfo: getBarnInformationText(person, year),
                      })
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div>
          <Heading level="2" size="medium" spacing>
            {kvitteringTranslate("foresporsel.content.title")}
          </Heading>
          <strong>{kvitteringTranslate("foresporsel.content.subtitle_1")}</strong>
          <div>{parse(kvitteringTranslate("foresporsel.content.body_1"))}</div>
          <strong>{kvitteringTranslate("foresporsel.content.subtitle_1")}</strong>
          <div>{parse(kvitteringTranslate("foresporsel.content.body_2"))}</div>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
