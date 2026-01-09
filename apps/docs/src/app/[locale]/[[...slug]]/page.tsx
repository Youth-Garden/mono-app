import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { routing } from '../../../i18n/routing';
import { source } from '../../../source';

export default async function Page(props: {
  params: Promise<{ slug?: string[]; locale: string }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.locale);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>
        <h1>{page.data.title}</h1>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params = await source.generateParams();
  const locales = routing.locales;

  const paths = [];
  for (const locale of locales) {
    for (const param of params) {
      const page = source.getPage(param.slug, locale);
      if (page) {
        paths.push({ ...param, locale });
      }
    }
  }
  return paths;
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[]; locale: string }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.locale);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
