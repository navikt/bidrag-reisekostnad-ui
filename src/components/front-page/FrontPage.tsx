import { Heading, BodyShort, ConfirmationPanel, Button, BodyLong, Modal } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { NavVeilederKvinne } from "../../svg-icons/NavVeilederKvinne";

export function FrontPage() {
  const { isAgree, updateIsAgree } = useReisekostnad();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="grid gap-3">
        <NavVeilederKvinne />
        <Heading level="1" size="xlarge">
          Hei Navn
        </Heading>
      </div>
      <BodyShort>Dine rettigheter og plikter?</BodyShort>
      <ConfirmationPanel
        checked={isAgree}
        label="Jeg har lest og forstått...."
        onChange={() => updateIsAgree(!isAgree)}
        size="small"
      ></ConfirmationPanel>
      <div className="flex space-x-12">
        <Button variant="primary">Neste</Button>
        <Button type="button" variant="secondary">
          Avbryt
        </Button>
      </div>
      <Button variant="tertiary" size="small" onClick={() => setOpen(true)}>
        <p className="underline underline-offset-4">
          Les om hvordan NAV behandler personopplysningene dine.
        </p>
      </Button>
      <Modal
        open={open}
        className="p-6"
        aria-label="Hvordan NAV behandler personopplysningene dine"
        onClose={() => setOpen((x) => !x)}
        aria-labelledby="modal-heading"
      >
        <Modal.Content>
          <Heading spacing level="1" size="large" id="modal-heading">
            Slik behandler NAV personopplysningene dine
          </Heading>
          <BodyLong spacing>Informasjon....</BodyLong>
        </Modal.Content>
      </Modal>
    </div>
  );
}
