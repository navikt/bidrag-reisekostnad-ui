import Head from "next/head";

interface IPageMetaProps {
  title: string;
}

export function PageMeta({ title }: IPageMetaProps) {
  return (
    <Head>
      <title>{`${title} - Fordeling av reisekostnader`}</title>
      <meta content="Fordeling av reisekostnader" key="title" />
    </Head>
  );
}
