import { Next } from "@navikt/ds-icons";
import { LinkPanel, Panel } from "@navikt/ds-react";
import Link from "next/link";
import { IForesporsel } from "../../../types/foresporsel";
import { formatDate } from "../../../utils/dateUtils";
import { isAutomaticSubmission } from "../../../utils/foresporselUtils";
import { getBarnInformationText } from "../../../utils/stringUtils";
import BarnOver15Alert from "../../alert/barn-over-15-alert/BarnOver15Alert";
import StatusBar from "../../status-bar/StatusBar";
import { useTranslation } from "next-i18next";

interface IOverviewCardProps {
  foresporsel: IForesporsel;
}

export default function OverviewCard({ foresporsel }: IOverviewCardProps) {
  const { id, opprettet, barn, status, samtykkefrist } = foresporsel;
  const { t: translate } = useTranslation();

  return (
    <Link className="no-underline" href={`/foresporsel/${id}`} passHref data-testid="overviewcard">
      <Panel className="navds-link-panel cursor-pointer" border>
        <div className="w-full navds-link-panel__content text-gray-900">
          <LinkPanel.Title className="text-large text-gray-900">
            {translate("title.fordeling_av_reisekostnader_for")}
          </LinkPanel.Title>
          <LinkPanel.Description className="text-gray-900">
            <div className="w-full grid grid-cols-2">
              <ul className="grid gap-2 p-0 m-0">
                {barn.map((person, i) => {
                  return (
                    <li className="list-none" key={i}>
                      <strong className="text-medium">
                        {getBarnInformationText(person, translate("aar"))}
                      </strong>
                    </li>
                  );
                })}
              </ul>
              <div className="grid justify-end whitespace-pre-wrap text-medium">
                <span>{translate("sendt", { date: opprettet ? formatDate(opprettet) : "" })}</span>
                {samtykkefrist && (
                  <span>
                    {translate("samtykkefrist", {
                      date: formatDate(samtykkefrist),
                    })}
                  </span>
                )}
              </div>
            </div>
          </LinkPanel.Description>
          <StatusBar status={status} />
          {isAutomaticSubmission(foresporsel) && <BarnOver15Alert barn={barn} />}
        </div>
        <Next className="navds-link-panel__chevron" aria-hidden="true" />
      </Panel>
    </Link>
  );
}
