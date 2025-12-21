import { PageData } from 'fumadocs-core/source';
import { TableOfContents } from 'fumadocs-core/server';
import type { ComponentType } from 'react';

export interface BaseCollectionEntry {
  _file: {
    path: string;
    absolutePath: string;
    locale?: string;
  };
}

export interface MDXPage extends PageData, BaseCollectionEntry {
  body: ComponentType<unknown>;
  toc: TableOfContents;
  full: boolean;
  description?: string;
}

export const map: MDXPage[] = [];
