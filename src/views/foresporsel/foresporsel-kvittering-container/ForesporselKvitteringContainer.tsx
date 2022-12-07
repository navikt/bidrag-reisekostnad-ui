import { SuccessStroke } from "@navikt/ds-icons";
import { Alert } from "@navikt/ds-react";
import { useEffect } from "react";
import { useState } from "react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { IPerson } from "../../../types/foresporsel";
import { getBarnInformationText } from "../../../utils/stringUtils";

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

  useEffect(() => {
    setBarnOver15(barn.filter((person) => person.alder >= 15));
    setBarnUnder15(barn.filter((person) => person.alder < 15));
  }, []);

  return (
    <ConfirmationLayout>
      <div className="grid gap-8">
        <div className="grid gap-8">
          <span className="flex items-center">
            <SuccessStroke color="green" fontSize="50" />
            {`Du har sendt inn en forerspørsel om fordeling av reisekostnader til NAV ${sentDate}.`}
          </span>
          <ul className="list-none flex flex-col gap-3">
            {barnOver15?.map((person, i) => {
              return (
                <li key={i}>
                  Forerspørsel for <b>{getBarnInformationText(person)}</b> går til NAV automatisk og
                  trenger ikke signering fra motparten
                </li>
              );
            })}
            {barnUnder15?.map((person, i) => {
              return (
                <li key={i}>
                  Forerspørsel for <b>{getBarnInformationText(person)}</b> å samtykkes slik at NAV
                  skal behandle den videre
                </li>
              );
            })}
          </ul>
        </div>
        {showWarning && barnOver15 && barnOver15.length > 0 && (
          <Alert variant="warning" className="flex place-content-center">
            Forerspørselen er ikke gyldig før motparten har samtykket. Han/hun kan allerede nå logge
            seg inn NAV sine sider og samtykke fordeling av reisekostnader. Du bør gjøre motparten
            oppmerksom på dette. Hvis motparten ikke har signert innen tre dager vil vi sende han en
            påminnelse per sms.
          </Alert>
        )}
      </div>
    </ConfirmationLayout>
  );
}
