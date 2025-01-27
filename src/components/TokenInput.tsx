import React from 'react';
import { ReactElement } from 'react';
import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';

export default function TokenInput(): ReactElement | null {
    const [idToken, setIdToken] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const isDevelopment = process.env.NEXT_PUBLIC_IS_PRODUCTION !== 'true';
    if (!isDevelopment || !isOpen) {
        return null;
    }

    function onFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        document.cookie = `token=${idToken}`;
    }

    return (
        <div
            style={{
                padding: '0 10px',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'white',
                position: 'fixed',
                bottom: 0,
                zIndex: 100000,
                border: '1px solid red',
                width: '100%',
                gap: '5px',
            }}
        >
            <div>Idporten token:</div>
            <form onSubmit={onFormSubmit}>
                <input
                    style={{ width: '50vw' }}
                    type="text"
                    aria-label="token"
                    onChange={(e) => setIdToken(e.target.value)}
                />
                <button>submit</button>
            </form>
            <div>
                Running in dev mode. Security is disabled, provide id token manually. You can get id
                token by visiting{' '}
                <a href="https://bidrag-reisekostnad.ekstern.dev.nav.no/api/dev/token">
                    https://bidrag-reisekostnad.ekstern.dev.nav.no/api/dev/token
                </a>{' '}
            </div>
            <Button
                type={'button'}
                size={'xsmall'}
                style={{ alignSelf: 'flex-end' }}
                variant={'tertiary'}
                icon={<XMarkIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => setIsOpen(false)}
            />
        </div>
    );
}
