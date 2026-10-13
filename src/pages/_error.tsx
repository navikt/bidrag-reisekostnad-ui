import { useRouter } from 'next/router';

import { BodyShort, Heading, Link, List, Page, VStack } from '@navikt/ds-react';

function Error({ statusCode }: { statusCode: number }) {
    const router = useRouter();

    return (
        <Page>
            <Page.Block width="text" gutters>
                <VStack gap="space-64" data-aksel-template="500-v4">
                    <VStack gap="space-48" align="start">
                        <div>
                            <BodyShort textColor="subtle" size="small">
                                Statuskode {statusCode}
                            </BodyShort>
                            <Heading level="1" size="large" spacing>
                                Beklager, noe gikk galt
                            </Heading>
                            <VStack>
                                <BodyShort>
                                    En teknisk feil på våre servere gjør at siden er utilgjengelig.
                                    Dette skyldes ikke noe du gjorde.
                                </BodyShort>
                                <VStack>
                                    <BodyShort>Du kan prøve å</BodyShort>
                                    <List>
                                        <List.Item>
                                            vente noen minutter og{' '}
                                            <Link href="#" onClick={() => location.reload()}>
                                                laste siden på nytt
                                            </Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link href="#" onClick={router.back}>
                                                gå tilbake til forrige side
                                            </Link>
                                        </List.Item>
                                    </List>
                                </VStack>
                                <BodyShort>
                                    Hvis problemet vedvarer, kan du heller bruke{' '}
                                    <Link
                                        href="https://www.nav.no/start/reisekostnader-samvaer?stegvalg=1"
                                        target="_blank"
                                    >
                                        skjema som sendes i posten
                                    </Link>
                                    . Hvis du trenger hjelp, kan du{' '}
                                    <Link href="https://nav.no/kontaktoss" target="_blank">
                                        kontakte oss (åpnes i ny fane)
                                    </Link>
                                </BodyShort>
                            </VStack>
                        </div>
                    </VStack>

                    <div lang="en">
                        <Heading level="2" size="large" spacing>
                            Something went wrong
                        </Heading>
                        <BodyShort spacing>
                            This was caused by a technical fault on our servers. Please refresh this
                            page or try again in a few minutes.
                        </BodyShort>
                        <BodyShort>
                            If the problem persists you can try{' '}
                            <Link
                                href="https://www.nav.no/start/reisekostnader-samvaer/en"
                                target="_blank"
                            >
                                sending a form in the mail
                            </Link>
                            . If you need help, you can{' '}
                            <Link href="https://nav.no/kontaktoss/en" target="_blank">
                                contact us (opens in a new tab)
                            </Link>
                        </BodyShort>
                    </div>
                </VStack>
            </Page.Block>
        </Page>
    );
}

Error.getInitialProps = ({
    res,
    err,
}: {
    res: { statusCode: number };
    err: { statusCode: number };
}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 500;
    return {
        statusCode,
    };
};

export default Error;