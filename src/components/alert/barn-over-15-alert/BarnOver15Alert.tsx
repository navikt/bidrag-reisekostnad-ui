import { Alert } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { IPerson } from "../../../types/foresporsel";
import { getPersonOver15YearsOld } from "../../../utils/personUtils";
import { getBarnInformationText } from "../../../utils/stringUtils";

interface IBarnOver15AlertProps {
  barn: IPerson[];
}

export default function BarnOver15Alert({ barn }: IBarnOver15AlertProps) {
  const [barnOver15, setBarnOver15] = useState<IPerson[]>();
  useEffect(() => {
    const personOver15 = getPersonOver15YearsOld(barn);
    if (personOver15.length > 0) {
      setBarnOver15(personOver15);
    }
  }, [barn]);

  if (!barnOver15) {
    return null;
  }

  return (
    <Alert variant="info" className="mt-5 text-gray-900">
      {barnOver15.map((person, i) => {
        return <b key={i}>{getBarnInformationText(person)}</b>;
      })}
      <span>
        har blitt 15 år mens forerspørselen ventet på samtykke, derfor gikk forerspørselen
        automatisk til NAV. Du kan lese mer om saksbehandling av reisekostnader for barn over 15 på
        NAV sine sider.
      </span>
    </Alert>
  );
}
