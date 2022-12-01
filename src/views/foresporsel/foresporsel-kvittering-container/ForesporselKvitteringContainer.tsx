import { SuccessStroke } from "@navikt/ds-icons";
import { Alert } from "@navikt/ds-react";
import { useEffect } from "react";
import { useState } from "react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { IPerson } from "../../../types/foresporsel";
import { today } from "../../../utils/dateUtils";
import { getBarnInformationText } from "../../../utils/stringUtils";

interface IForesporselKvitteringContainerProps {
  barn: IPerson[];
}

export default function ForesporselKvitteringContainer({
  barn,
}: IForesporselKvitteringContainerProps) {
  const [barnOver15, setBarnOver15] = useState<IPerson[]>();
  const [barnUnder15, setBarnUnder15] = useState<IPerson[]>();

  useEffect(() => {
    console.log(barn);
    setBarnOver15(barn.filter((person) => person.alder >= 15));
    setBarnUnder15(barn.filter((person) => person.alder < 15));
  }, [barn]);

  return (
    <ConfirmationLayout>
      <div className="grid gap-8">
        <div className="grid gap-8">
          <span className="flex items-center">
            <SuccessStroke color="green" fontSize="50" />
            {`Du har sendt inn en forerspørsel om fordeling av reisekostnader til NAV ${today()}.`}
          </span>
          <ul className="list-none flex flex-col gap-3">
            {barnOver15?.map((person) => {
              return (
                <li>{`Forerspørsel for ${getBarnInformationText(
                  person
                )} går til NAV automatisk og trenger ikke signering fra motparten`}</li>
              );
            })}
            {barnUnder15?.map((person) => {
              return (
                <li>{`Forerspørsel for ${getBarnInformationText(
                  person
                )} må samtykkes slik at NAV skal behandle den videre`}</li>
              );
            })}
          </ul>
        </div>
        <Alert variant="warning" className="flex place-content-center">
          Forerspørselen er ikke gyldig før motparten har samtykket. Han/hun kan allerede nå logge
          seg inn NAV sine sider og samtykke fordeling av reisekostnader. Du bør gjøre motparten
          oppmerksom på dette. Hvis motparten ikke har signert innen tre dager vil vi sende han en
          påminnelse per sms.
        </Alert>
      </div>
    </ConfirmationLayout>
  );
}