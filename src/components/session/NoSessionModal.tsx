import { BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./NoSessionModal.module.css";
import { ExclamationmarkTriangleFillIcon } from "@navikt/aksel-icons";
import { useCountdown } from "../../hooks/useCountdown";
import { useSession } from "../../utils/session.utils";

export function NoSessionModal() {
  const router = useRouter();
  const { session, isError } = useSession();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const isLoading = !isError && !session;

  const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION == "true";
  const hasExpired = useCountdown(session?.expiresIn ?? 1000);

  useEffect(() => {
    /* TODO: Check if needed.
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }
    */
    if (isProduction) {
      if (isLoading) return;

      setModalOpen(!session || isError || hasExpired);
    }
  }, [session, isLoading, isError, hasExpired]);

  function login() {
    window.location.reload();
  }

  return (
    <Modal
      className="modal-container modal-container--error"
      onClose={() => setModalOpen(false)}
      open={modalOpen}
      header={{
        heading: "Du er i ferd med å logge ut",
        size: "small",
        closeButton: false,
      }}
    >
      <Modal.Body className="grid gap-5">
        <div className="flex gap-4 items-center">
          <ExclamationmarkTriangleFillIcon title="a11y-title" fontSize="35px" color="#C77300" />
          <div>
            <BodyShort>
              Sesjonen din har utløpt og du må logge inn på nytt for å fortsette.
            </BodyShort>
            <BodyShort>Merk at du vil miste dine ulagrede endringer etter innlogging.</BodyShort>
          </div>
        </div>
        <div className={styles.actionButtonsContainer}>
          <Button variant="primary" onClick={login}>
            Logg inn på nytt
          </Button>
          <Button variant="tertiary" onClick={() => router.push("https://nav.no/")}>
            Gå til forsiden
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
