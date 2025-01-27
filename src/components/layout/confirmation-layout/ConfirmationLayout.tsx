import { Heading } from '@navikt/ds-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { PageMeta } from '../../page-meta/PageMeta';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'next-i18next';

interface IConfirmationLayoutProps extends PropsWithChildren {
    title: string;
}

export default function ConfirmationLayout({ title, children }: IConfirmationLayoutProps) {
    const { t: translate } = useTranslation();

    return (
        <>
            <PageMeta title={title} />
            <div className="w-full grid gap-10">
                <div className="flex flex-col gap-10 items-center">
                    <Heading level="1" size="xlarge">
                        {title}
                    </Heading>
                    <div className="w-full flex">{children}</div>
                </div>
                <div className="grid gap-2">
                    <Link
                        href="/"
                        className="no-underline flex gap-2 items-center hover:underline"
                        passHref
                        data-testid="button.til_oversikten"
                    >
                        {translate('button.til_oversikten')}
                        <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                    </Link>
                </div>
            </div>
        </>
    );
}
