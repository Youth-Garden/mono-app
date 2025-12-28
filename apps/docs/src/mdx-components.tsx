import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    pre: ({ ref, ...props }: any) => (
      <CodeBlock keepBackground {...props}>
        <Pre ref={ref} {...props} />
      </CodeBlock>
    ),
    ...components,
  };
}
