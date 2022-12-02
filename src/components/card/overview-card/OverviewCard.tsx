import { Next } from "@navikt/ds-icons";
import { LinkPanel, Panel } from "@navikt/ds-react";
import Link from "next/link";
import { ForesporselStatus } from "../../../enum/foresporsel-status";
import { IForesporsel } from "../../../types/foresporsel";
import { formatDate } from "../../../utils/dateUtils";
import { isAutomaticSubmission } from "../../../utils/foresporselUtils";
import { getBarnInformationText } from "../../../utils/stringUtils";
import BarnOver15Alert from "../../alert/barn-over-15-alert/BarnOver15Alert";
import StatusBar from "../../status-bar/StatusBar";

interface IOverviewCardProps {
  foresporsel: IForesporsel;
}

export default function OverviewCard({ foresporsel }: IOverviewCardProps) {
  const { id, opprettet, barn, status, kreverSamtykke, samtykket, journalført } = foresporsel;

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
              <div className="flex flex-col">
                <span>Sendt inn:</span>
                <span>{opprettet ? formatDate(opprettet) : ""}</span>
              </div>
            </div>
          </LinkPanel.Description>
          <StatusBar status={status} />
          {foresporsel.status === ForesporselStatus.AUTOMATISK_SENDT_INN_TIL_NAV && (
            <BarnOver15Alert barn={barn} />
          )}
        </div>
        <Next className="navds-link-panel__chevron" aria-hidden />
      </Panel>
    </Link>
  );
}
