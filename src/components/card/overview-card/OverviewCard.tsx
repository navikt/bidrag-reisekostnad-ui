import { Next } from "@navikt/ds-icons";
import { LinkPanel, Panel } from "@navikt/ds-react";
import Link from "next/link";
import { IForesporsel } from "../../../types/foresporsel";
import { formatDate } from "../../../utils/dateUtils";
import { getBarnInformationText } from "../../../utils/stringUtils";
import BarnOver15Alert from "../../alert/barn-over-15-alert/BarnOver15Alert";
import StatusBar from "../../status-bar/StatusBar";

interface IOverviewCardProps {
  foresporsel: IForesporsel;
}

export default function OverviewCard({ foresporsel }: IOverviewCardProps) {
  const { id, opprettet, barn, status } = foresporsel;

  return (
    <Link className="no-underline" href={`/foresporsel/${id}`} passHref>
      <Panel className="navds-link-panel cursor-pointer" border>
        <div className="w-full navds-link-panel__content text-gray-900">
          <LinkPanel.Title className="text-large text-gray-900">Reisekostnader</LinkPanel.Title>
          <LinkPanel.Description className="text-gray-900">
            <div className="w-full grid grid-cols-[80%_30%]">
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
              <div className="grid">
                <span>Sendt inn:</span>
                <span>{opprettet ? formatDate(opprettet) : ""}</span>
              </div>
            </div>
          </LinkPanel.Description>
          <StatusBar status={status} />
          <BarnOver15Alert barn={barn} />
        </div>
        <Next className="navds-link-panel__chevron" aria-hidden />
      </Panel>
    </Link>
  );
}
