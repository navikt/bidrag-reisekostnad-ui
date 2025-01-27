import { useEffect } from 'react';
import { useState } from 'react';
import { useReisekostnad } from '../../../context/reisekostnadContext';
import BarnContainer from './barn-container/BarnContainer';
import { Alert, Button, ConfirmationPanel, Heading } from '@navikt/ds-react';
import { useForesporselApi } from '../../../hooks/useForesporselApi';
import { PageMeta } from '../../../components/page-meta/PageMeta';
import ConfirmModal from '../../../components/modal/confirm-modal/ConfirmModal';
import { useRouter } from 'next/router';
import { today } from '../../../utils/date.utils';
import { getAllBarn, getBarnWithNoActiveForesporsler } from '../../../utils/person.utils';
import Link from 'next/link';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import Collapse from '../../../components/collapse/Collapse';
import { useTranslation } from 'next-i18next';
import ForesporselKvittering from '../../kvittering/foresporsel-kvittering/ForesporselKvitteringContainer';
import { IPerson } from '../../../types/person';
import parse from 'html-react-parser';

export default function OpprettForesporsel() {
    const [availableBarn, setAvailableBarn] = useState<IPerson[]>([]);
    const [allBarn, setAllBarn] = useState<IPerson[]>();
    const [selectedBarn, setSelectedBarn] = useState<string[]>([]);
    const [foundPersonOver15, setFoundPersonOver15] = useState<boolean>(false);
    const [foundPersonCouldBe15In30Days, setFoundPersonCouldBe15In30Days] =
        useState<boolean>(false);
    const [showBarnError, setShowBarnError] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [showConfirmError, setShowConfirmError] = useState<boolean>(false);

    const { userInformation } = useReisekostnad();
    const { submitting, success, createForesporsel, failed } = useForesporselApi();
    const router = useRouter();
    const { t: translate } = useTranslation();
    const { t: foresporselTranslate } = useTranslation('opprettForesporsel');

    useEffect(() => {
        if (userInformation) {
            const barn = getBarnWithNoActiveForesporsler(userInformation);
            setAllBarn(getAllBarn(userInformation));
            setAvailableBarn(barn);
            setFoundPersonOver15(barn.some((i) => i.erOver15));
            setFoundPersonCouldBe15In30Days(barn.some((i) => i.er15Om30Dager));
        }
    }, [userInformation]);

    useEffect(() => {
        if (confirm) {
            setShowConfirmError(false);
        }
    }, [confirm]);

    function onSelectBarn(selectedIdents: string[]) {
        if (showBarnError) {
            setShowBarnError(false);
        }

        setSelectedBarn(selectedIdents);
    }

    async function onSubmit() {
        if (!confirm) {
            setShowConfirmError(true);
        }

        const hasSelectedBarn = selectedBarn.length !== 0;

        setShowBarnError(!hasSelectedBarn);

        if (hasSelectedBarn && confirm) {
            createForesporsel(selectedBarn);
        }
    }

    return (
        <div className="grid gap-10">
            <PageMeta title={foresporselTranslate('page_title')} />
            {success && (
                <ForesporselKvittering
                    barn={availableBarn.filter((barn) => selectedBarn.includes(barn.ident))}
                    sentDate={today()}
                />
            )}
            {!success && failed && <Alert variant="error">{translate('errors.tekniskfeil')}</Alert>}
            {!success && (
                <>
                    <Heading size="xlarge" level="1">
                        {foresporselTranslate('title')}
                    </Heading>
                    {availableBarn.length === 0 && (
                        <>
                            {allBarn && allBarn.length > 1 ? (
                                <Alert className="whitespace-pre-wrap" variant="info">
                                    {parse(translate('alert.barna_har_foresporsel'))}
                                </Alert>
                            ) : (
                                <Alert className="whitespace-pre-wrap" variant="info">
                                    {parse(translate('alert.barnet_har_foresporsel'))}
                                </Alert>
                            )}
                            <Link
                                href="/"
                                className="no-underline flex gap-2 items-center hover:underline"
                                passHref
                            >
                                <ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />
                                {translate('button.til_oversikten')}
                            </Link>
                        </>
                    )}
                    {availableBarn.length > 0 && (
                        <div className="grid gap-8">
                            <BarnContainer
                                allBarn={availableBarn}
                                foundPersonOver15={foundPersonOver15}
                                foundPersonCouldBe15In30Days={foundPersonCouldBe15In30Days}
                                onSelectBarn={onSelectBarn}
                                showError={showBarnError}
                            />
                            <Collapse
                                data={foresporselTranslate('accordion.barn_som_ikke_vises', {
                                    returnObjects: true,
                                })}
                            />
                            <Collapse
                                contentClassNames="flex flex-col gap-3"
                                data={foresporselTranslate(
                                    'accordion.behandling_av_personligopplysning',
                                    {
                                        returnObjects: true,
                                    }
                                )}
                            />
                            <ConfirmationPanel
                                data-testid="confirmationpanel.opprett.maa.samtykke"
                                checked={confirm}
                                label={parse(foresporselTranslate('confirm'))}
                                onChange={() => setConfirm((x) => !x)}
                                size="small"
                                error={showConfirmError && translate('errors.maa_samtykke')}
                            ></ConfirmationPanel>
                            <div className="flex gap-5">
                                <Button
                                    data-testid="button.send_inn"
                                    onClick={onSubmit}
                                    loading={submitting}
                                >
                                    {translate('button.send_inn')}
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setOpen((current) => !current)}
                                >
                                    {translate('button.avbryt')}
                                </Button>
                            </div>
                            <ConfirmModal
                                open={open}
                                header={foresporselTranslate('modal.header')}
                                content={foresporselTranslate('modal.content')}
                                submitText={translate('button.ja')}
                                cancelText={translate('button.nei') as string}
                                onSubmit={() => router.push('/')}
                                onCancel={() => setOpen(false)}
                                onClose={() => setOpen(false)}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
