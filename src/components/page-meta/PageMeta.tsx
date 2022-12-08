import Head from "next/head";
import { useTranslation } from "next-i18next";

interface IPageMetaProps {
  title: string;
}

export function PageMeta({ title }: IPageMetaProps) {
  const { t: translate } = useTranslation();
  const content = translate("page_meta_content");

  return (
    <Head>
      <title>{`${title} - ${content}`}</title>
      <meta content={content} key="title" />
    </Head>
  );
}
