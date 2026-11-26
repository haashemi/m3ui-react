import { Link, type LinkProps } from '@tanstack/react-router';
import * as React from 'react';

import { CheckIcon, CodeIcon } from '~/icons';
import { slugify } from '~/lib/slug';
import { cn } from '@/lib/utils';
import { Button } from '@/registry/m3ui/ui/button';
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
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <section id={id ?? slugify(title)} className="flex scroll-mbs-6 flex-col gap-4">
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

export function SubSection({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <section id={id ?? slugify(title)} className="flex scroll-mbs-6 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="type-title-large">{title}</h3>
        {description ? (
          <p className="type-body-medium text-on-surface-variant max-inline-2xl">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3 type-body-large text-on-surface max-inline-2xl">
      {children}
    </div>
  );
}

export function Code({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <code className="rounded-corner-extra-small bg-surface-container-highest px-1 font-mono text-on-surface">
      {children}
    </code>
  );
}

export function DocLink({
  to,
  children,
}: {
  to: NonNullable<LinkProps['to']>;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Link to={to} className="text-primary underline">
      {children}
    </Link>
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

export function CopyButton({ text }: { text: string }): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <IconButton size="sm" aria-label="Copy code" onClick={copy}>
      {copied ? <CheckIcon /> : <CopyGlyph />}
    </IconButton>
  );
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  collapsible = false,
  className,
}: {
  code: string;
  language?: string;
  title?: string;
  collapsible?: boolean;
  className?: string;
}): React.JSX.Element {
  const [expanded, setExpanded] = React.useState(false);
  const collapsed = collapsible && !expanded;
  const text = code.trim();

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-corner-large bg-surface-container-highest',
        className,
      )}
    >
      {title ? (
        <div className="flex items-center border-be border-outline-variant px-4 type-label-large text-on-surface-variant block-10">
          {title}
        </div>
      ) : null}
      <pre
        className={cn(
          'overflow-x-auto p-4 pe-14 type-body-medium font-mono text-on-surface',
          collapsed && 'overflow-hidden max-block-40',
        )}
      >
        <code data-language={language}>{text}</code>
      </pre>
      <div className={cn('absolute inset-e-2', title ? 'inset-bs-12' : 'inset-bs-2')}>
        <CopyButton text={text} />
      </div>
      {collapsible ? (
        <div
          className={cn(
            'flex justify-center p-2',
            collapsed &&
              'absolute inset-x-0 inset-be-0 bg-linear-to-t from-surface-container-highest pbs-12',
          )}
        >
          <Button
            size="xs"
            variant="tonal"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Collapse code' : 'View code'}
          </Button>
        </div>
      ) : null}
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
