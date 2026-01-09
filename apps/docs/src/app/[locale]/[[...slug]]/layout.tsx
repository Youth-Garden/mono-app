import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '../../../source';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tree = source.pageTree;

  return (
    <DocsLayout tree={tree} nav={{ title: 'Spectre Docs' }}>
      {children}
    </DocsLayout>
  );
}
