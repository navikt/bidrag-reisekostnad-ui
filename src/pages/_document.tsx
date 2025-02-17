import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import {
    DecoratorComponentsReact,
    DecoratorFetchProps,
    DecoratorLocale,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';

const decoratorProps: DecoratorFetchProps = {
    // @ts-ignore
    env: process.env.DEKORATOR_ENV ?? 'prod',
    params: {
        chatbot: false,
        simple: false,
        context: 'privatperson',
        redirectToApp: true,
        level: 'Level4',
        breadcrumbs: [
            { title: 'Familie og barn', url: 'https://www.nav.no/familie' },
            {
                title: 'Bor ikke sammen med barnet mitt',
                url: 'https://www.nav.no/bor-ikke-med-barnet-mitt',
            },
            {
                title: 'Fordele reisekostnader ved samvær',
                url: 'https://www.nav.no/fordele-reisekostnader',
            },
            { title: 'Fordeling  av reisekostnader', url: 'https://bidrag-reisekostnad.nav.no/' },
        ],
        language: 'nb',
    },
};

class MyDocument extends Document<{ decorator: DecoratorComponentsReact }> {
    static async getInitialProps(ctx: DocumentContext) {
        /*const originalRenderPage = ctx.renderPage;
        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            });

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`*/
        const initialProps = await Document.getInitialProps(ctx);

        //const { locale } = ctx;
        //const language = locale === undefined ? 'en' : (locale as DecoratorLocale);

        const decorator:
            | DecoratorComponentsReact
            | {
                  Header: () => JSX.Element;
                  Scripts: () => JSX.Element;
                  Footer: () => JSX.Element;
                  HeadAssets: () => JSX.Element;
              } = await fetchDecoratorReact({
            ...decoratorProps,
            //            ...{ language: language },
        }).catch((err) => {
            console.error(err);
            const empty = () => <></>;
            return {
                Footer: empty,
                Header: empty,
                Scripts: empty,
                HeadAssets: empty,
            };
        });

        return {
            ...initialProps,
            decorator,
            //           locale: language,
        };
    }

    render(): JSX.Element {
        const Decorator = this.props.decorator;
        return (
            <Html lang={'nb'}>
                <Head>
                    <Decorator.HeadAssets />
                </Head>
                <body>
                    <Decorator.Header />
                    <Main />
                    <Decorator.Footer />
                    <Decorator.Scripts />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
export default MyDocument;
