import { Next } from "@navikt/ds-icons";
import { LinkPanel, Panel, Tag } from "@navikt/ds-react";
import Link from "next/link";
import { IForesporsel, IPerson } from "../../../types/foresporsel";
import { calculateAge } from "../../../utils/dateUtils";

interface IOverviewCardProps {
  foresporsel: IForesporsel;
}
interface IStatusProps {
  barn: IPerson[];
}

function Status({ barn }: IStatusProps) {
  const isOver15 = barn
    .map((person) => person.fødselsdato)
    .every((date) => calculateAge(date) >= 15);

  if (isOver15) {
    return (
      <Tag variant="success" size="small" className="mt-3">
        Automatisk sendt inn til NAV
      </Tag>
    );
  }

  return (
    <Tag variant="warning" size="small" className="mt-3">
      Venter på signering
    </Tag>
  );
}

export default function OverviewCard({ foresporsel }: IOverviewCardProps) {
  const { idForespørsel, hovedpart, barn } = foresporsel;

  return (
    <Panel className="navds-link-panel" border>
      <div className="navds-link-panel__content text-gray-900">
        <Link className="no-underline" href={`/foresporsel/${idForespørsel}`} passHref>
          <LinkPanel.Title className="text-medium text-gray-900">Reisekostnader</LinkPanel.Title>
          <LinkPanel.Description className="text-gray-900">
            Fra: {hovedpart.fornavn}
          </LinkPanel.Description>
          <Status barn={barn} />
        </Link>
      </div>
      <Next className="navds-link-panel__chevron" aria-hidden />
    </Panel>
  );
}
