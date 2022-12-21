import { CheckboxGroup, Checkbox, Alert, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { getBarnInformationText } from "../../../../utils/stringUtils";
import { useTranslation } from "next-i18next";
import { IPerson } from "../../../../types/person";

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
  const { t: foresporselTranslate } = useTranslation("opprettForesporsel");

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
        legend={foresporselTranslate("checkbox.legend")}
        onChange={(val: string[]) => handleChange(val)}
        value={selectedBarn}
        error={showError && translate("errors.velg_barn")}
      >
        {allBarn.map((barn, i) => {
          return (
            <Checkbox
              key={i}
              value={barn.ident}
              data-testid={`checkboxgroup.opprett.barn-${barn.ident}`}
            >
              {getBarnInformationText(barn, translate("aar"))}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      {foundPersonOver15 && (
        <Alert variant="info" className="w-[80%]">
          {foresporselTranslate("alert.barn_over_15")}
        </Alert>
      )}
      {foundPersonCouldBe15In30Days && (
        <Alert variant="info" className="w-[80%]">
          {foresporselTranslate("alert.barn_bli_15_i_lopet_av_behandling")}
        </Alert>
      )}
    </div>
  );
}
