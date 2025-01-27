import { CheckmarkIcon } from '@navikt/aksel-icons';
import ConfirmationLayout from '../../../components/layout/confirmation-layout/ConfirmationLayout';
import { useTranslation } from 'next-i18next';
import parse from 'html-react-parser';
import { ForesporselStatus } from '../../../enum/foresporsel-status';
import { useEffect, useState } from 'react';

interface ISamtykkeKvitteringProps {
    status: ForesporselStatus;
    barnInformation: string[];
    erHovedpart: boolean;
}

export default function SamtykkeKvittering({
    status,
    barnInformation,
    erHovedpart,
}: ISamtykkeKvitteringProps) {
    const { t: translate } = useTranslation('kvittering');
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();

    useEffect(() => {
        if (status === ForesporselStatus.UNDER_BEHANDLING) {
            if (erHovedpart) {
                setTitle(translate('samtykke.ja.den_andre_parten.title') as string);
                setDescription(translate('samtykke.ja.den_andre_parten.description') as string);
            } else {
                setTitle(translate('samtykke.ja.den_som_samtykket.title') as string);
                setDescription(translate('samtykke.ja.den_som_samtykket.description') as string);
            }
        } else {
            if (erHovedpart) {
                setTitle(translate('samtykke.nei.den_andre_parten.title') as string);
                setDescription(
                    translate('samtykke.nei.den_andre_parten.description', {
                        barn: barnInformation,
                    }) as string
                );
            } else {
                setTitle(translate('samtykke.nei.den_som_samtykket.title') as string);
                setDescription(
                    translate('samtykke.nei.den_som_samtykket.description', {
                        barn: barnInformation,
                    }) as string
                );
            }
        }
    }, [status, erHovedpart]);

    if (!description || !title) {
        return null;
    }

    return (
        <ConfirmationLayout title={title}>
            <div className="flex gap-8">
                <div className="pt-[36px]">
                    <CheckmarkIcon title="a11y-title" color="green" fontSize="60px" />
                </div>
                <div className="flex flex-col gap-7">
                    <div className="whitespace-pre-wrap">{parse(description)}</div>
                </div>
            </div>
        </ConfirmationLayout>
    );
}
