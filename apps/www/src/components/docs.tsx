import * as React from 'react';

import { CheckIcon, CodeIcon } from '~/icons';
import { cn } from '@/lib/utils';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export const registryUrl = 'https://haashemi.github.io/m3ui-react/r/{name}.json';

export function PageHeader({
  title,
  description,
  item,
}: {
  title: string;
  description: string;
  item?: string;
}): React.JSX.Element {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="type-display-small">{title}</h1>
      <p className="type-body-large text-on-surface-variant max-inline-2xl">{description}</p>
      {item ? <CodeBlock code={`npx shadcn@latest add @m3ui/${item}`} language="bash" /> : null}
    </header>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="type-headline-small">{title}</h2>
        {description ? (
          <p className="type-body-medium text-on-surface-variant max-inline-2xl">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Preview({
  children,
  code,
  className,
}: {
  children: React.ReactNode;
  code?: string;
  className?: string;
}): React.JSX.Element {
  const [showCode, setShowCode] = React.useState(false);
  return (
    <div className="overflow-hidden rounded-corner-extra-large bg-surface-container-low">
      <div
        className={cn('flex flex-wrap items-center justify-center gap-4 p-8 md:p-10', className)}
      >
        {children}
      </div>
      {code ? (
        <>
          <div className="flex justify-end px-3 pbe-3">
            <IconButton
              size="sm"
              aria-label={showCode ? 'Hide code' : 'Show code'}
              aria-expanded={showCode}
              onClick={() => setShowCode((value) => !value)}
            >
              <CodeIcon />
            </IconButton>
          </div>
          {showCode ? <CodeBlock code={code} /> : null}
        </>
      ) : null}
    </div>
  );
}

export function CodeBlock({
  code,
  language = 'tsx',
}: {
  code: string;
  language?: string;
}): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative rounded-corner-large bg-surface-container-highest">
      <pre className="overflow-x-auto p-4 pe-14 type-body-medium font-mono text-on-surface">
        <code data-language={language}>{code.trim()}</code>
      </pre>
      <div className="absolute inset-e-2 inset-bs-2">
        <IconButton size="sm" aria-label="Copy code" onClick={copy}>
          {copied ? <CheckIcon /> : <CopyGlyph />}
        </IconButton>
      </div>
    </div>
  );
}

function CopyGlyph(): React.JSX.Element {
  return (
    <svg viewBox="0 -960 960 960" aria-hidden="true">
      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Z" />
    </svg>
  );
}
