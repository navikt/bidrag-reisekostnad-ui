import { Alert, BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { ExclamationmarkTriangleFillIcon } from "@navikt/aksel-icons";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

interface IConfirmModalProps {
  open: boolean;
  header: string;
  content: string;
  submitText: string;
  onSubmit: () => void;
  onCancel: () => void;
  onClose: () => void;
  cancelText?: string;
  loading?: boolean;
  showError?: boolean;
  errorMessage?: string;
}

export default function ConfirmModal({
  open,
  header,
  content,
  submitText,
  onSubmit,
  onCancel,
  onClose,
  cancelText,
  loading = false,
  showError = false,
  errorMessage = "Det skjedde en feil",
}: IConfirmModalProps) {
  const { t: translate } = useTranslation();

  /* TODO: Is this needed? Old API?
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);
   */

  return (
    <Modal
      className="p-5"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-heading"
    >
      <Modal.Body className="grid gap-5">
        {showError && <Alert variant="error">{errorMessage}</Alert>}
        <Heading spacing level="1" size="medium" id="modal-heading">
          {header}
        </Heading>
        <BodyShort className="flex gap-4 items-center" spacing>
          <ExclamationmarkTriangleFillIcon title="a11y-title" fontSize="35px" color="#C77300"/>
          {content}
        </BodyShort>
      </Modal.Body>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={onSubmit} loading={loading}>
          {submitText}
        </Button>
        <Button variant="tertiary" onClick={onCancel}>
          {cancelText ?? translate("button.avbryt")}
        </Button>
      </div>
    </Modal>
  );
}
