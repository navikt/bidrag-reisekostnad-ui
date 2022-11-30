import { useEffect } from "react";
import { useState } from "react";
import { IPerson } from "../../../types/foresporsel";
import { useReisekostnad } from "../../../context/reisekostnadContext";
import BarnContainer from "./barn-container/BarnContainer";
import OppsummeringContainer from "./oppsummering-container/OppsummeringContainer";
import { Button } from "@navikt/ds-react";
import Link from "next/link";

export default function ForesporselVelgBarn() {
  const [allBarn, setAllBarn] = useState<IPerson[]>();
  const [selectedBarn, setSelectedBarn] = useState<string[]>([]);
  const [foundPersonOver15, setFoundPersonOver15] = useState<boolean>(false);
  const [samtykke, setSamtykke] = useState<boolean>(false);
  const [showBarnError, setShowBarnError] = useState<boolean>(false);
  const [showSamtykkeError, setShowSamtykkeError] = useState<boolean>(false);
  const { userInformation } = useReisekostnad();

  useEffect(() => {
    if (userInformation) {
      const { barnMinstFemtenÅr, motparterMedFellesBarnUnderFemtenÅr } = userInformation;
      const fellesBarnUnder15Aar = motparterMedFellesBarnUnderFemtenÅr.flatMap(
        (barn) => barn.fellesBarnUnder15År
      );

      setAllBarn([...barnMinstFemtenÅr, ...fellesBarnUnder15Aar]);
      setFoundPersonOver15(fellesBarnUnder15Aar.length > 0);
    }
  }, [userInformation]);

  if (!allBarn) {
    return null;
  }

  function onSelectBarn(selectedIdents: string[]) {
    if (showBarnError) {
      setShowBarnError(false);
    }

    setSelectedBarn(selectedIdents);
  }

  function onSubmit() {
    setShowBarnError(selectedBarn.length === 0);
    setShowSamtykkeError(!samtykke);
    if (!showBarnError && !showSamtykkeError) {
      // TODO: send forespørsel til backend
    }
  }

  function onSamtykke(checked: boolean) {
    if (showSamtykkeError) {
      setShowSamtykkeError(false);
    }

    setSamtykke(checked);
  }

  return (
    <div className="w-full grid gap-10">
      <BarnContainer
        allBarn={allBarn}
        foundPersonOver15={foundPersonOver15}
        onSelectBarn={onSelectBarn}
        showError={showBarnError}
      />
      <OppsummeringContainer
        checked={samtykke}
        updateChecked={onSamtykke}
        showError={showSamtykkeError}
      />
      <div className="flex gap-5">
        <Button onClick={onSubmit}>SEND INN</Button>
        <Link href="/" className="no-underline" passHref>
          <Button type="button" variant="secondary">
            AVBRYT
          </Button>
        </Link>
      </div>
    </div>
  );
}
