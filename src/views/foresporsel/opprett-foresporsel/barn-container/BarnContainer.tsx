import { CheckboxGroup, Checkbox, Alert, Heading } from "@navikt/ds-react";
import { useState } from "react";
import Collapse from "../../../../components/collapse/Collapse";
import { GJELDER_BARN_SOM_IKKE_VISES_HER_COLLAPSE } from "../../../../constants/collapse-data";
import { IPerson } from "../../../../types/foresporsel";
import { getBarnInformationText } from "../../../../utils/stringUtils";
import { useTranslation } from "next-i18next";

interface IBarnContainerProps {
  allBarn: IPerson[];
  foundPersonOver15: boolean;
  foundPersonCouldBe15In30Days: boolean;
  showError: boolean;
  onSelectBarn: (selectedBarn: string[]) => void;
}

export default function BarnContainer({
  allBarn,
  foundPersonOver15,
  foundPersonCouldBe15In30Days,
  showError,
  onSelectBarn,
}: IBarnContainerProps) {
  const [selectedBarn, setSelectedBarn] = useState<string[]>([]);
  const { t: translate } = useTranslation();

  function handleChange(val: string[]) {
    setSelectedBarn(val);
    onSelectBarn(val);
  }

  return (
    <div className="w-full grid gap-5">
      <Heading size="large" level="2">
        Barn
      </Heading>
      <CheckboxGroup
        legend="Velg barn forespørselen gjelder for:"
        onChange={(val: string[]) => handleChange(val)}
        value={selectedBarn}
        // TODO
        error={showError && "Velg minst et av barna"}
      >
        {allBarn.map((barn, i) => {
          return (
            <Checkbox key={i} value={barn.ident}>
              {getBarnInformationText(barn, translate("aar"))}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      <Collapse data={GJELDER_BARN_SOM_IKKE_VISES_HER_COLLAPSE} />
      {foundPersonOver15 && (
        <Alert variant="info" className="w-[80%]">
          Når reisekostnadene gjelder for barn som er 15 år eller eldre, trengs det ikke samtykke
          fra den andre forelderen for at NAV kan behandle saken. Da går saken automatisk videre til
          behandling.
        </Alert>
      )}
      {foundPersonCouldBe15In30Days && (
        <Alert variant="info" className="w-[80%]">
          TEKST FOR BARN SOM KAN BLI 15 ÅR I LØPER AV BEHANDLINGER
        </Alert>
      )}
    </div>
  );
}
