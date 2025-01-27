import { Heading } from '@navikt/ds-react';
import { Gender } from '../../../enum/gender';
import { NavVeilederKvinne } from '../../../svg-icons/NavVeilederKvinne';
import NavVeilederMann from '../../../svg-icons/NavVeilederMann';
import { useTranslation } from 'next-i18next';

interface IGreetingCardProps {
    name: string;
    gender: Gender;
}
export default function GreetingCard({ name, gender }: IGreetingCardProps) {
    const { t: oversiktTranslate } = useTranslation('oversikt');
    const { t: translate } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-5">
            {gender === Gender.KVINNE ? (
                <NavVeilederKvinne id="kvinne-logo" title={translate('logo_title.kvinne')} />
            ) : (
                <NavVeilederMann id="mann-logo" title={translate('logo_title.mann')} />
            )}
            <Heading level="1" size="large">
                {oversiktTranslate('greeting')} {name}
            </Heading>
        </div>
    );
}
