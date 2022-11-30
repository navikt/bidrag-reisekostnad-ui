import { CheckboxGroup, Checkbox, Alert, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { IPerson } from "../../../../types/foresporsel";
import { getBarnInformationText } from "../../../../utils/stringUtils";

interface IBarnContainerProps {
  allBarn: IPerson[];
  foundPersonOver15: boolean;
  showError: boolean;
  onSelectBarn: (selectedBarn: string[]) => void;
}

export default function BarnContainer({
  allBarn,
  foundPersonOver15,
  showError,
  onSelectBarn,
}: IBarnContainerProps) {
  const [selectedBarn, setSelectedBarn] = useState<string[]>([]);

  function handleChange(val: any[]) {
    setSelectedBarn(val);
    onSelectBarn(val);
  }

  return (
    <div className="w-full grid gap-5">
      <Heading size="xlarge" level="1">
        Barn
      </Heading>
      <CheckboxGroup
        legend="Velg barn søknaden gjelder for."
        onChange={(val: any[]) => handleChange(val)}
        value={selectedBarn}
        // TODO
        error={showError && "Velg minst et av barna"}
      >
        {allBarn.map((barn, i) => {
          return (
            <Checkbox key={i} value={barn.ident}>
              {getBarnInformationText(barn)}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      {foundPersonOver15 && (
        <Alert variant="info" className="w-[80%]">
          Motparten trenger ikke å samtykke til behandling for barn over 15. Det betyr at søknaden
          skal automatisk gå til NAV. Motparten skal informeres om dette.
        </Alert>
      )}
    </div>
  );
}
