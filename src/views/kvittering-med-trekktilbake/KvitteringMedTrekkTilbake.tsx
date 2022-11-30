import { Button } from "@navikt/ds-react";
import Link from "next/link";
import ConfirmationLayout from "../../components/layout/confirmation-layout/ConfirmationLayout";

interface IKvitteringMedTrekkTilbakeProps {
  barnInformation: string[];
}

export default function KvitteringMedTrekkTilbake({
  barnInformation,
}: IKvitteringMedTrekkTilbakeProps) {
  return (
    <ConfirmationLayout>
      <div className="flex flex-col gap-15">
        <div>
          <span>For</span>
          {barnInformation.map((information, index) => {
            return <b key={index}>{information}</b>;
          })}
        </div>
        <div>
          <span>Sendt inn:</span>
        </div>
      </div>
      <div className="flex gap-8">
        <Link href="/" passHref>
          <Button type="button" variant="primary">
            TILBAKE TIL OVERSIKTEN
          </Button>
        </Link>
        <Button type="button" variant="secondary">
          TREKK TILBAKE
        </Button>
      </div>
    </ConfirmationLayout>
  );
}
