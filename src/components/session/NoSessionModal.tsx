import { Button, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./NoSessionModal.module.css";
import { WarningColored } from "@navikt/ds-icons";
import useSWR from "swr";
import { ISessionData } from "../../pages/api/auth/session";
import { useCountdown } from "../hooks/useCountdown";
import { fetcher } from "../../utils/apiUtils";

export function NoSessionModal() {
  const router = useRouter();
  const { data: session, error: isError } = useSWR<ISessionData>("/api/auth/session", fetcher);
  const [modalOpen, setModalOpen] = useState(false);

  const isLoading = !isError && !session;

  const hasExpired = useCountdown(session?.expiresIn ?? 1000);

  useEffect(() => {
    setModalOpen(hasExpired);
  }, []);

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }

    if (process.env.NEXT_PUBLIC_IS_PRODUCTION == "false") {
      if (isLoading) return;

      if (!session || isError) {
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    }
  }, [session, isLoading, isError]);

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
