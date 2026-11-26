import type * as React from 'react';

import { CodeBlock, PageHeader, registryUrl, Section } from '~/components/docs';
import { EditIcon, FavoriteFillIcon, FavoriteIcon, SendIcon } from '~/icons';
import { Link } from '@tanstack/react-router';
import { Button } from '@/registry/m3ui/ui/button';
import { ExtendedFab } from '@/registry/m3ui/ui/fab';
import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

export function GettingStartedPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Material 3 Expressive for React"
        description="A shadcn registry of Material 3 Expressive components built on UI SDK's accessible behaviors. Tokens come straight from Google's sources, springs run as CSS linear() easings, and every component is source code you own."
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button size="md" render={<Link to="/components" />}>
          <SendIcon />
          Browse components
        </Button>
        <ToggleButton size="md" variant="tonal" shape="square">
          Toggle me
        </ToggleButton>
        <ToggleIconButton size="md" variant="filled" aria-label="Favorite">
          <FavoriteIcon className="in-data-pressed:hidden" />
          <FavoriteFillIcon className="not-in-data-pressed:hidden" />
        </ToggleIconButton>
        <ExtendedFab icon={<EditIcon />}>Compose</ExtendedFab>
      </div>

      <Section
        title="Installation"
        description="Start from a project with Tailwind CSS v4 and shadcn/ui initialized (npx shadcn@latest init)."
      >
        <ol className="flex list-decimal flex-col gap-4 ps-6 type-body-large">
          <li className="flex flex-col gap-2">
            Add the @m3ui registry to components.json:
            <CodeBlock
              code={`npx shadcn@latest registry add @m3ui=${registryUrl}`}
              language="bash"
            />
          </li>
          <li className="flex flex-col gap-2">
            Install the theme. It adds M3 tokens and points the shadcn variables at M3 color roles:
            <CodeBlock code="npx shadcn@latest add @m3ui/theme" language="bash" />
          </li>
          <li className="flex flex-col gap-2">
            Add components:
            <CodeBlock
              code="npx shadcn@latest add @m3ui/button @m3ui/icon-button @m3ui/fab"
              language="bash"
            />
          </li>
        </ol>
      </Section>

      <Section title="Theming">
        <p className="type-body-large max-inline-2xl">
          Tokens are plain CSS variables (<code>--md-sys-color-*</code>,{' '}
          <code>--md-sys-shape-*</code>, <code>--md-sys-motion-*</code>) exposed to Tailwind as
          utilities like <code>bg-primary-container</code>, <code>rounded-corner-large</code>,{' '}
          <code>type-title-medium</code> and <code>shadow-elevation-3</code>. Dark mode follows the{' '}
          <code>.dark</code> class. Build your own scheme on the{' '}
          <Link to="/theme" className="text-primary underline">
            theme page
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
