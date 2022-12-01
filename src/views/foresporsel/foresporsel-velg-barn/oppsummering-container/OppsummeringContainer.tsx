import { ConfirmationPanel, Heading } from "@navikt/ds-react";

interface IOppsummeringContainerProps {
  checked: boolean;
  showError: boolean;
  updateChecked: (checked: boolean) => void;
}

export default function OppsummeringContainer({
  checked,
  showError,
  updateChecked,
}: IOppsummeringContainerProps) {
  return (
    <div className="w-full flex flex-col gap-5">
      <Heading size="large" level="2">
        Samtykke
      </Heading>
      {/* TODO */}
      <span>Hva betyr det å samtykke.....</span>
      <ConfirmationPanel
        checked={checked}
        label="Jeg samtrykker at opplysningene jeg har oppgir er korrekte"
        onChange={() => updateChecked(!checked)}
        size="small"
        className="w-[70%]"
        // TODO
        error={showError && "Feilmelding"}
      ></ConfirmationPanel>
    </div>
  );
}
