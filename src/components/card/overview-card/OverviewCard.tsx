import { Next } from "@navikt/ds-icons";
import { LinkPanel, Panel } from "@navikt/ds-react";
import Link from "next/link";
import { IForesporsel } from "../../../types/foresporsel";
import { getBarnInformationText } from "../../../utils/stringUtils";
import BarnOver15Alert from "../../alert/barn-over-15-alert/BarnOver15Alert";
import StatusBar from "../../status-bar/StatusBar";

interface IOverviewCardProps {
  foresporsel: IForesporsel;
}

export default function OverviewCard({ foresporsel }: IOverviewCardProps) {
  const { idForespørsel, hovedpart, barn, erAlleOver15, status } = foresporsel;

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
        <StatusBar status={status} />
        <BarnOver15Alert barn={barn} />
      </div>
      <Next className="navds-link-panel__chevron" aria-hidden />
    </Panel>
  );
}
