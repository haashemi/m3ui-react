import * as React from 'react';

import { Code, CodeBlock, Section } from '~/components/docs';
import { LanguageSelector } from '~/components/language-selector';
import { toDisplaySource } from '~/lib/source';
import { type Language, LanguageContext } from '~/lib/translation';
import { cn } from '@/lib/utils';

interface ExampleModule {
  default: React.ComponentType;
}

const exampleModules = import.meta.glob<ExampleModule>('../examples/**/*.tsx');
const exampleSources = import.meta.glob<string>('../examples/**/*.tsx', {
  query: '?raw',
  import: 'default',
});

const elements = new Map<string, Promise<React.ReactElement>>();
const sources = new Map<string, Promise<string>>();

function cached<T>(cache: Map<string, Promise<T>>, name: string, load: () => Promise<T>) {
  const hit = cache.get(name);
  if (hit) return hit;
  const promise = load();
  cache.set(name, promise);
  return promise;
}

function loader<T>(loaders: Record<string, () => Promise<T>>, name: string): () => Promise<T> {
  const load = loaders[`../examples/${name}.tsx`];
  if (!load) throw new Error(`Unknown example "${name}"`);
  return load;
}

function exampleElement(name: string): Promise<React.ReactElement> {
  return cached(elements, name, () =>
    loader(exampleModules, name)().then((module) => React.createElement(module.default)),
  );
}

function exampleSource(name: string): Promise<string> {
  return cached(sources, name, () => loader(exampleSources, name)().then(toDisplaySource));
}

function Example({ name }: { name: string }): React.ReactElement {
  return React.use(exampleElement(name));
}

function ExampleCode({ name }: { name: string }): React.JSX.Element {
  const source = React.use(exampleSource(name));
  return <CodeBlock code={source} collapsible className="rounded-none" />;
}

export function ComponentPreview({
  name,
  rtl = false,
  className,
}: {
  name: string;
  rtl?: boolean;
  className?: string;
}): React.JSX.Element {
  const [language, setLanguage] = React.useState<Language>('fa');

  return (
    <div className="overflow-hidden rounded-corner-extra-large border border-outline-variant">
      {rtl ? (
        <div className="flex items-center border-be border-outline-variant bg-surface-container-low px-2 block-12">
          <LanguageSelector value={language} onValueChange={setLanguage} />
        </div>
      ) : null}
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-4 bg-surface-container-low p-8 min-block-48 md:p-10',
          className,
        )}
      >
        <LanguageContext value={language}>
          <React.Suspense fallback={null}>
            <Example name={name} />
          </React.Suspense>
        </LanguageContext>
      </div>
      <React.Suspense fallback={null}>
        <ExampleCode name={name} />
      </React.Suspense>
    </div>
  );
}

export function RtlSection({ name }: { name: string }): React.JSX.Element {
  return (
    <Section
      title="RTL"
      description={
        <>
          Components use logical properties and read the direction from the page. Set{' '}
          <Code>dir=&quot;rtl&quot;</Code> on <Code>&lt;html&gt;</Code> or any ancestor.
        </>
      }
    >
      <ComponentPreview name={name} rtl />
    </Section>
  );
}
