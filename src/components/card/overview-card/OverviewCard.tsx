import { ChevronRightIcon } from '@navikt/aksel-icons';
import { LinkPanel, Panel } from '@navikt/ds-react';
import Link from 'next/link';
import { IForesporsel } from '../../../types/foresporsel';
import { formatDate } from '../../../utils/date.utils';
import { isAutomaticSubmission } from '../../../utils/foresporsel.utils';
import { getBarnInformationText } from '../../../utils/string.utils';
import BarnOver15Alert from '../../alert/barn-over-15-alert/BarnOver15Alert';
import StatusBar from '../../status-bar/StatusBar';
import { useTranslation } from 'next-i18next';
import { ForesporselStatus } from '../../../enum/foresporsel-status';

interface IOverviewCardProps {
    foresporsel: IForesporsel;
}

export default function OverviewCard({ foresporsel }: IOverviewCardProps) {
    const { id, opprettet, barn, status, samtykkefrist, samtykket, deaktivert } = foresporsel;
    const { t: translate } = useTranslation();

    function getDateToBeShowed() {
        switch (status) {
            case ForesporselStatus.KANSELLERT:
                return (
                    deaktivert &&
                    translate('kansellert', {
                        date: formatDate(deaktivert),
                    })
                );
            case ForesporselStatus.UNDER_BEHANDLING:
                return (
                    samtykket &&
                    translate('samtykket', {
                        date: formatDate(samtykket),
                    })
                );
            case ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG:
                return (
                    samtykkefrist &&
                    translate('samtykkefrist', {
                        date: formatDate(samtykkefrist),
                    })
                );
            case ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN:
                return (
                    samtykkefrist &&
                    translate('samtykkefrist', {
                        date: formatDate(samtykkefrist),
                    })
                );
            default:
                return '';
        }
    }

    return (
        <Link
            className="no-underline"
            href={`/foresporsel/${id}`}
            passHref
            data-testid={`overviewcard-${id}`}
        >
            <Panel className="navds-link-panel cursor-pointer" border>
                <div className="w-full navds-link-panel__content text-gray-900">
                    <LinkPanel.Title className="text-large text-gray-900">
                        {translate('title.fordeling_av_reisekostnader_for')}
                    </LinkPanel.Title>
                    <LinkPanel.Description className="text-gray-900">
                        <div className="w-full grid grid-cols-2">
                            <ul className="flex flex-col gap-2 p-0 m-0">
                                {barn.map((person, i) => {
                                    return (
                                        <li className="list-none" key={i}>
                                            <strong className="text-medium">
                                                {getBarnInformationText(person, translate('aar'))}
                                            </strong>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="grid justify-end whitespace-pre-wrap text-medium">
                                <span>
                                    {translate('opprettet', {
                                        date: opprettet ? formatDate(opprettet) : '',
                                    })}
                                </span>
                                <span>{getDateToBeShowed()}</span>
                            </div>
                        </div>
                    </LinkPanel.Description>
                    <StatusBar status={status} />
                    {isAutomaticSubmission(foresporsel) && <BarnOver15Alert barn={barn} />}
                </div>
                <ChevronRightIcon title="a11y-title" fontSize="1.5rem" />
            </Panel>
        </Link>
    );
}
