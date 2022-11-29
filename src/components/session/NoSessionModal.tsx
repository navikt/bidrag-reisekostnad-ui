import { Button, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./NoSessionModal.module.css";
import { WarningColored } from "@navikt/ds-icons";
import useSWR from "swr";
import { ISessionData } from "../../pages/api/auth/session";
import { useCountdown } from "../hooks/useCountdown";

export function NoSessionModal() {
  const router = useRouter();
  const { data: session, error: isError } = useSWR<ISessionData>("/api/auth/session");
  const [modalOpen, setModalOpen] = useState(false);

  const isLoading = !isError && !session;

  const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION == "true";
  const hasExpired = useCountdown(session?.expiresIn ?? 1000);

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }

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
      onClose={() => {
        return;
      }}
      open={modalOpen}
      closeButton={false}
      shouldCloseOnOverlayClick={false}
    >
      <Modal.Content>
        <div className={styles.iconContainer}>
          <WarningColored className={styles.icon} />
        </div>
        <Heading size={"medium"} spacing>
          Du er i ferd med å logge ut
        </Heading>
        <p>Sesjonen din har utløpt og du må logge inn på nytt for å fortsette.</p>
        <p>Merk at du vil miste dine ulagrede endringer etter innlogging.</p>
        <div className={styles.actionButtonsContainer}>
          <Button variant="primary" onClick={login}>
            Logg inn på nytt
          </Button>
          <Button variant="tertiary" onClick={() => router.push("https://nav.no/")}>
            Gå til forsiden
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
