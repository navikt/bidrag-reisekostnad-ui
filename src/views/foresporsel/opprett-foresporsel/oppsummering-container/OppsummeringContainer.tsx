import { Accordion, ConfirmationPanel, Heading, Link } from "@navikt/ds-react";

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
        Bekreftelse
      </Heading>
      {/* TODO */}
      <span>Hva betyr det å samtykke.....</span>
      <ConfirmationPanel
        checked={checked}
        label="Jeg bekrefter at jeg har gitt korrekte opplysninger."
        onChange={() => updateChecked(!checked)}
        size="small"
        className="w-[70%]"
        // TODO
        error={showError && "Feilmelding"}
      ></ConfirmationPanel>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Slik behandler NAV personopplysningene dine</Accordion.Header>
          <Accordion.Content>
            <span>
              Vi innhenter og mottar opplysninger om deg for å behandle saken din. Opplysningene vi
              innhenter kommer enten fra deg eller fra offentlige registre:
            </span>
            <ul>
              <li>hvilke barn du er registrert som forelder til.</li>
              <li>hvem den andre forelderen er.</li>
              <li>Inntekten din.</li>
              {/* TODO */}
              <li>Her kommer det nok me</li>
            </ul>
            <span>
              Du har rett til innsyn i saken din. Vil du vite mer om hvordan NAV behandler
              personopplysninger? Se {/* TODO ER LENKE RIKTIG? */}
              <Link href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten">
                nav.no/personvern
              </Link>
            </span>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
