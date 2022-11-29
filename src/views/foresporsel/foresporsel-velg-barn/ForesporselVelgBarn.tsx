import { Alert, Button, Checkbox, CheckboxGroup, ConfirmationPanel, Link } from "@navikt/ds-react";
import { useEffect } from "react";
import { useState } from "react";
import { IPerson } from "../../../types/foresporsel";
import { getBarnInformationText } from "../../../utils/stringUtils";
import Stepper from "../../../components/stepper/stepper";
import { useReisekostnad } from "../../../context/reisekostnadContext";

export default function ForesporselVelgBarn() {
  const [allBarn, setAllBarn] = useState<IPerson[]>();
  const [foundPersonOver15, setFoundPersonOver15] = useState<boolean>();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [checked, setChecked] = useState<boolean>(false);
  const { userInformation } = useReisekostnad();

  useEffect(() => {
    if (userInformation) {
      const { barnMinstFemtenÅr, motparterMedFellesBarnUnderFemtenÅr } = userInformation;
      const fellesBarnUnder15År = motparterMedFellesBarnUnderFemtenÅr.flatMap(
        (barn) => barn.fellesBarnUnder15År
      );
      setAllBarn([...barnMinstFemtenÅr, ...fellesBarnUnder15År]);
      setFoundPersonOver15(fellesBarnUnder15År.length > 0);
    }
  }, [userInformation]);

  function handleChange(val: any[]) {
    console.log("val", val);
  }

  function onStepChange(step: number) {
    setActiveStep(step);
  }

  return (
    <div className="w-full grid gap-10">
      <Stepper header="Barn" step="1">
        {activeStep === 1 && (
          <div className="w-full grid gap-5">
            <CheckboxGroup
              legend="Velg barn søknaden gjelder for."
              onChange={(val: any[]) => handleChange(val)}
            >
              {allBarn?.map((barn, i) => {
                return (
                  <Checkbox key={i} value={barn.ident}>
                    {getBarnInformationText(barn)}
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
            {foundPersonOver15 && (
              <Alert variant="info" className="w-[80%]">
                Motparten trenger ikke å samtykke til behandling for barn over 15. Det betyr at
                søknaden skal automatisk gå til NAV. Motparten skal informeres om dette.
              </Alert>
            )}
            <div className="flex gap-5">
              <Button onClick={() => onStepChange(2)}>NESTE</Button>
              <Link href="/" className="no-underline">
                <Button type="button" variant="secondary">
                  AVBRYT
                </Button>
              </Link>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="w-full grid grid-cols-2 justify-start">
            <div className="flex flex-col gap-5">
              {allBarn?.map((barn, i) => {
                return <span key={i}>{getBarnInformationText(barn)}</span>;
              })}
            </div>
            <Button
              type="button"
              variant="tertiary"
              size="xsmall"
              className="hover:bg-transparent"
              onClick={() => onStepChange(1)}
            >
              ENDRE
            </Button>
          </div>
        )}
      </Stepper>
      <Stepper header="Oppsummering/ Innsending" step="2">
        {activeStep === 2 && (
          <div className="w-full flex flex-col gap-5">
            <span>Jeg ønsker at NAV skal behandle fordeling av reisekostnader for barn</span>
            {allBarn?.map((barn, i) => {
              return <b key={i}>{getBarnInformationText(barn)}</b>;
            })}
            <ConfirmationPanel
              checked={checked}
              label="Jeg samtrykker at opplysningene jeg har oppgir er korrekte"
              onChange={() => setChecked((current) => !current)}
              size="small"
              className="w-[60%]"
            ></ConfirmationPanel>
            <div className="flex gap-5">
              <Button onClick={() => onStepChange(2)}>NESTE</Button>
              <Link href="/" className="no-underline">
                <Button type="button" variant="secondary">
                  AVBRYT
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Stepper>
    </div>
  );
}
