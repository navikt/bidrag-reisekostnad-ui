import { Alert, BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { WarningColored } from "@navikt/ds-icons";
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
  cancelText = "Avbryr",
  loading = false,
  showError = false,
  errorMessage = "Det skjedde en feil",
}: IConfirmModalProps) {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <Modal
      className="p-5"
      open={open}
      onClose={onClose}
      closeButton={false}
      aria-labelledby="modal-heading"
    >
      <Modal.Content className="grid gap-5">
        {showError && <Alert variant="error">{errorMessage}</Alert>}
        <Heading spacing level="1" size="medium" id="modal-heading">
          {header}
        </Heading>
        <BodyShort className="flex gap-4" spacing>
          <WarningColored fontSize="35" />
          {content}
        </BodyShort>
      </Modal.Content>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={onSubmit} loading={loading}>
          {submitText}
        </Button>
        <Button variant="tertiary" onClick={onCancel}>
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
}
