import { Next } from "@navikt/ds-icons";
import { LinkPanel, Panel, Tag } from "@navikt/ds-react";
import Link from "next/link";
import { IForesporsel } from "../../../types/foresporsel";
import { getBarnInformationText } from "../../../utils/stringUtils";
import BarnOver15Alert from "../../alert/barn-over-15-alert/BarnOver15Alert";

interface IOverviewCardProps {
  foresporsel: IForesporsel;
}
interface IStatusProps {
  isOver15: boolean;
}

function Status({ isOver15 }: IStatusProps) {
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
  const { idForespørsel, hovedpart, barn, erAlleOver15 } = foresporsel;

  return (
    <Panel className="navds-link-panel cursor-pointer" border>
      <div className="w-full navds-link-panel__content text-gray-900">
        <Link className="no-underline" href={`/foresporsel/${idForespørsel}`} passHref>
          <LinkPanel.Title className="text-large text-gray-900">Reisekostnader</LinkPanel.Title>
          <LinkPanel.Description className="text-gray-900">
            <div className="w-full grid grid-cols-[70%_30%]">
              <div className="flex gap-2">
                <span>For: </span>
                <div className="grid gap-2">
                  {barn.map((person, i) => {
                    return (
                      <b className="text-medium" key={i}>
                        {getBarnInformationText(person)}
                      </b>
                    );
                  })}
                </div>
              </div>
              <span>Fra: {hovedpart.fornavn}</span>
            </div>
          </LinkPanel.Description>
        </Link>
        <Status isOver15={erAlleOver15} />
        <BarnOver15Alert barn={barn} />
      </div>
      <Next className="navds-link-panel__chevron" aria-hidden />
    </Panel>
  );
}
