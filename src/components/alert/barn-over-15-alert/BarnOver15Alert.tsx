import { Alert } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { getPersonOver15YearsOld } from "../../../utils/personUtils";
import { getBarnInformationText } from "../../../utils/stringUtils";
import { useTranslation } from "next-i18next";
import { IPerson } from "../../../types/person";

interface IBarnOver15AlertProps {
  barn: IPerson[];
}

export default function BarnOver15Alert({ barn }: IBarnOver15AlertProps) {
  const [barnOver15, setBarnOver15] = useState<IPerson[]>();
  const { t: translate } = useTranslation();
  const { t: overviewTranslate } = useTranslation("oversikt");

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
        return <b key={i}>{getBarnInformationText(person, translate("aar"))}</b>;
      })}
      <span>{overviewTranslate("automatisk_sendt_inn_messge")}</span>
    </Alert>
  );
}
