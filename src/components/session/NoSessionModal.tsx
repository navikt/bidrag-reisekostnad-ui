import { Button, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./NoSessionModal.module.css";
import { WarningColored } from "@navikt/ds-icons";
import useSWR from "swr";
import {ISessionData} from "../../pages/api/auth/session";
import {fetcher} from "../../lib/api.utils";
import {useCountdown} from "../hooks/useCountdown";

export function NoSessionModal() {
  const router = useRouter();
  const { data: session, error: isError } = useSWR<ISessionData>("/api/auth/session", fetcher);
  const [modalOpen, setModalOpen] = useState(false);

  const isLoading = !isError && !session

  useCountdown(session?.expiresIn ?? 1, ()=>setModalOpen(true))

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }

    if (process.env.NEXT_PUBLIC_IS_PRODUCTION == "true") {
      if (isLoading) return;

      if (!session || isError) {
        setModalOpen(true);
      } else {
        setModalOpen(false)
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
          <p>
            Sesjonen din har utløpt, og du må logge inn med BankID på nytt for å fortsette.
          </p>
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