import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { map } from '../.map';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(map),
});
