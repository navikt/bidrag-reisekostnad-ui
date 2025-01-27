import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import OpprettForesporsel from '../../views/foresporsel/opprett-foresporsel/OpprettForesporsel';
import useSWRImmutable from 'swr/immutable';
import { IBrukerinformasjon } from '../../types/foresporsel';
import { useReisekostnad } from '../../context/reisekostnadContext';
import Spinner from '../../components/spinner/spinner/spinner';
import { GetStaticPropsContext } from 'next';

export default function Foresporsel() {
    const { data } = useSWRImmutable<IBrukerinformasjon>('/api/brukerinformasjon');
    const { userInformation, updateUserInformation } = useReisekostnad();

    useEffect(() => {
        if (data) {
            updateUserInformation(data);
        }
    }, [data]);

    if (!userInformation || !data) {
        return <Spinner />;
    }

    return <OpprettForesporsel />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nb', [
                'common',
                'kvittering',
                'opprettForesporsel',
            ])),
        },
    };
}
