import React from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import {
  Components as DecoratorComponents,
  fetchDecoratorReact,
  Locale,
  Props as DecoratorProps,
} from "@navikt/nav-dekoratoren-moduler/ssr";

const decoratorProps: DecoratorProps = {
  // @ts-ignore
  env: process.env.DEKORATOR_ENV ?? "dev",
  chatbot: false,
  simple: false,
  context: "privatperson",
  enforceLogin: false,
  redirectToApp: true,
  level: "Level4",
  // TODO
  breadcrumbs: [
    { title: "Familie og barn", url: "https://www.nav.no/familie" },
    { title: "Fordeling  av reisekostnader", url: "https://www.nav.no/reisekostnad" },
  ],
  language: "nb",
};

export default class MyDocument extends Document<DecoratorComponents> {
  static async getInitialProps(ctx: DocumentContext) {
    const { locale } = ctx;
    const initialProps = await Document.getInitialProps(ctx);
    const language = locale === undefined ? "nb" : (locale as Locale);

    const Dekorator: DecoratorComponents = await fetchDecoratorReact({
      ...decoratorProps,
      language: language,
    }).catch((err) => {
      console.error(err);
      const empty = () => <></>;
      return {
        Footer: empty,
        Header: empty,
        Scripts: empty,
        Styles: empty,
      };
    });

    return {
      ...initialProps,
      ...Dekorator,
      locale: language,
    };
  }

  render(): JSX.Element {
    const { Styles, Scripts, Header, Footer, locale } = this.props;
    return (
      <Html lang={locale}>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-16x16.png`}
          />
          <link
            rel="shortcut icon"
            href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon.ico`}
          />
          <Styles />
        </Head>
        <body>
          <Scripts />
          <Header />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
