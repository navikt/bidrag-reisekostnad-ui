import { LinkPanel, Tag } from "@navikt/ds-react";
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
    <LinkPanel href={`/foresporsel/${idForespørsel}`} border>
      <LinkPanel.Title className="text-medium">Reisekostnader</LinkPanel.Title>
      <LinkPanel.Description>Fra: {hovedpart.fornavn}</LinkPanel.Description>
      <Status barn={barn} />
    </LinkPanel>
  );
}
