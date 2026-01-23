import { Tag } from '@navikt/ds-react';
import { ForesporselStatus } from '../../enum/foresporsel-status';
import { useTranslation } from 'next-i18next';

interface IStatusBar {
    status: ForesporselStatus;
}

export default function StatusBar({ status }: IStatusBar) {
    const { t: translate } = useTranslation();

    return (
        <>
            {(() => {
                switch (status) {
                    case ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG:
                        return (
                            <Tag
                                data-color="warning"
                                variant="outline"
                                size="small"
                                className="mt-3"
                            >
                                {translate('status.venter_paa_samtykke_fra_deg')}
                            </Tag>
                        );
                    case ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN:
                        return (
                            <Tag
                                data-color="warning"
                                variant="outline"
                                size="small"
                                className="mt-3"
                            >
                                {translate('status.venter_paa_samtykke_fra_den_andre_forelderen')}
                            </Tag>
                        );
                    case ForesporselStatus.KANSELLERT:
                        return (
                            <Tag
                                data-color="neutral"
                                variant="outline"
                                size="small"
                                className="mt-3"
                            >
                                {translate('status.kansellert')}
                            </Tag>
                        );
                    default:
                        return (
                            <Tag
                                data-color="success"
                                variant="outline"
                                size="small"
                                className="mt-3"
                            >
                                {translate('status.under_behandling')}
                            </Tag>
                        );
                }
            })()}
        </>
    );
}
