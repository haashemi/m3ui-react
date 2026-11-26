import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { CodeBlock, CopyButton } from '~/components/docs';
import { toDisplaySource } from '~/lib/source';
import registry from '@/registry/m3ui/registry.json';
import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/m3ui/ui/tabs';

const packageManagers = ['pnpm', 'npm', 'yarn', 'bun'] as const;
type PackageManager = (typeof packageManagers)[number];

const runners: Record<PackageManager, string> = {
  pnpm: 'pnpm dlx',
  npm: 'npx',
  yarn: 'yarn dlx',
  bun: 'bunx --bun',
};

const installers: Record<PackageManager, string> = {
  pnpm: 'pnpm add',
  npm: 'npm install',
  yarn: 'yarn add',
  bun: 'bun add',
};

const storageKey = 'm3ui-package-manager';
const listeners = new Set<() => void>();

function isPackageManager(value: string | null): value is PackageManager {
  return packageManagers.some((manager) => manager === value);
}

function readPackageManager(): PackageManager {
  try {
    const stored = localStorage.getItem(storageKey);
    return isPackageManager(stored) ? stored : 'pnpm';
  } catch (_error) {
    return 'pnpm';
  }
}

function writePackageManager(value: PackageManager): void {
  try {
    localStorage.setItem(storageKey, value);
  } catch (_error) {
    // Storage can be unavailable; the choice then lasts for this page only.
  }
  current = value;
  for (const listener of listeners) listener();
}

let current: PackageManager | undefined = undefined;

function usePackageManager(): [PackageManager, (value: PackageManager) => void] {
  const value = React.useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    () => (current ??= readPackageManager()),
  );
  return [value, writePackageManager];
}

export function PackageManagerCommand({
  kind,
  args,
}: {
  kind: 'run' | 'install';
  args: string;
}): React.JSX.Element {
  const [manager, setManager] = usePackageManager();
  const command = `${(kind === 'run' ? runners : installers)[manager]} ${args}`;
  return (
    <div className="overflow-hidden rounded-corner-large bg-surface-container-highest">
      <div className="flex items-center justify-between gap-2 border-be border-outline-variant py-2 ps-3 pe-2">
        <ConnectedButtonGroup
          size="xs"
          variant="tonal"
          aria-label="Package manager"
          deselectable={false}
          value={[manager]}
          onValueChange={(value) => {
            const [next] = value;
            if (next !== undefined && isPackageManager(next)) setManager(next);
          }}
        >
          {packageManagers.map((name) => (
            <ConnectedButtonGroupItem key={name} value={name}>
              {name}
            </ConnectedButtonGroupItem>
          ))}
        </ConnectedButtonGroup>
        <CopyButton text={command} />
      </div>
      <pre className="overflow-x-auto p-4 type-body-medium font-mono text-on-surface">
        <code data-language="bash">{command}</code>
      </pre>
    </div>
  );
}

const registrySources = import.meta.glob<string>('../../../../registry/m3ui/ui/*.tsx', {
  query: '?raw',
  import: 'default',
});

const sourceCache = new Map<string, Promise<string>>();

function registrySource(file: string): Promise<string> {
  const cached = sourceCache.get(file);
  if (cached) return cached;
  const load = registrySources[`../../../../registry/m3ui/${file}`];
  const source = load ? load().then(toDisplaySource) : Promise.resolve('');
  sourceCache.set(file, source);
  return source;
}

function SourceFile({ file }: { file: string }): React.JSX.Element {
  const source = React.use(registrySource(file));
  return <CodeBlock code={source} title={file.replace(/^ui\//u, 'components/ui/')} collapsible />;
}

function registryItem(name: string) {
  const item = registry.items.find((entry) => entry.name === name);
  if (!item) throw new Error(`Unknown registry item "${name}"`);
  return item;
}

function Step({
  index,
  title,
  children,
}: {
  index: number;
  title: React.ReactNode;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <li className="flex gap-4">
      <span className="flex shrink-0 items-center justify-center rounded-full bg-secondary-container type-label-large text-on-secondary-container block-7 inline-7">
        {index}
      </span>
      <div className="flex flex-col gap-3 pbs-0.5 inline-full min-inline-0">
        <p className="type-body-large">{title}</p>
        {children}
      </div>
    </li>
  );
}

function componentPath(name: string): string {
  return `/components/${name}`;
}

function ItemLink({ name }: { name: string }): React.JSX.Element {
  const { title } = registryItem(name);
  if (name === 'ripple') return <span className="font-medium">{title}</span>;
  return (
    <Link to={componentPath(name)} className="font-medium text-primary underline">
      {title}
    </Link>
  );
}

function ManualInstallation({ item }: { item: string }): React.JSX.Element {
  const { dependencies, registryDependencies, files } = registryItem(item);
  const siblings = registryDependencies
    .filter((name) => name.startsWith('@m3ui/') && name !== '@m3ui/theme')
    .map((name) => name.slice('@m3ui/'.length));

  const steps: { key: string; title: React.ReactNode; content?: React.ReactNode }[] = [
    {
      key: 'theme',
      title: (
        <>
          Install the{' '}
          <Link to="/" hash="installation" className="text-primary underline">
            M3UI theme
          </Link>{' '}
          if your project doesn&apos;t have it yet.
        </>
      ),
    },
  ];
  if (dependencies.length > 0) {
    steps.push({
      key: 'dependencies',
      title: 'Install the following dependencies:',
      content: <PackageManagerCommand kind="install" args={dependencies.join(' ')} />,
    });
  }
  if (siblings.length > 0) {
    steps.push({
      key: 'siblings',
      title: (
        <>
          Add the components this one is built on:{' '}
          {siblings.map((name, index) => (
            <React.Fragment key={name}>
              {index > 0 ? ', ' : null}
              <ItemLink name={name} />
            </React.Fragment>
          ))}
          .
        </>
      ),
    });
  }
  steps.push(
    {
      key: 'source',
      title: 'Copy and paste the following code into your project.',
      content: (
        <React.Suspense fallback={null}>
          {files.map((file) => (
            <SourceFile key={file.path} file={file.path} />
          ))}
        </React.Suspense>
      ),
    },
    { key: 'paths', title: 'Update the import paths to match your project setup.' },
  );

  return (
    <ol className="flex flex-col gap-6">
      {steps.map((step, index) => (
        <Step key={step.key} index={index + 1} title={step.title}>
          {step.content}
        </Step>
      ))}
    </ol>
  );
}

export function Installation({ item }: { item: string }): React.JSX.Element {
  return (
    <Tabs defaultValue="command">
      <TabsList variant="secondary" className="self-start">
        <TabsTab value="command">Command</TabsTab>
        <TabsTab value="manual">Manual</TabsTab>
      </TabsList>
      <TabsPanel value="command">
        <div className="pbs-4">
          <PackageManagerCommand kind="run" args={`shadcn@latest add @m3ui/${item}`} />
        </div>
      </TabsPanel>
      <TabsPanel value="manual">
        <div className="pbs-6">
          <ManualInstallation item={item} />
        </div>
      </TabsPanel>
    </Tabs>
  );
}
