import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, DocLink, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

export function FabPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="FAB"
        description="Floating action buttons hold the most important action on a screen. Three sizes and six color styles."
      />
      <ComponentPreview name="fab/demo" />

      <Section title="Installation">
        <Installation item="fab" />
      </Section>

      <UsageSection
        imports="import { Fab } from '@/components/ui/fab';"
        code={`<Fab aria-label="Compose">
  <EditIcon />
</Fab>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Use one FAB per screen, for its primary action. Give it an <Code>aria-label</Code>{' '}
            because the icon is its only content.
          </p>
          <p>
            Position it yourself, usually at the bottom end of the screen with{' '}
            <Code>fixed inset-e-4 inset-be-4</Code>. Logical insets keep it on the correct side in
            right-to-left layouts.
          </p>
          <p>
            For a FAB with a visible label, use an{' '}
            <DocLink to="/components/extended-fab">Extended FAB</DocLink>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'fab/variants' },
          {
            title: 'Sizes',
            name: 'fab/sizes',
            description: 'FAB (56dp), medium FAB (80dp) and large FAB (96dp).',
          },
          { title: 'Placement', name: 'fab/placement' },
          { title: 'Disabled', name: 'fab/disabled' },
        ]}
      />
      <RtlSection name="fab/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="Fab"
          description="A UI SDK Button styled as an M3 floating action button."
          inherits={{ label: 'Button', doc: 'button' }}
          props={[
            {
              name: 'variant',
              type: "'primary-container' | 'secondary-container' | 'tertiary-container' | 'primary' | 'secondary' | 'tertiary'",
              default: "'primary-container'",
            },
            { name: 'size', type: "'default' | 'medium' | 'large'", default: "'default'" },
            { name: 'aria-label', type: 'string', description: 'Names the action.' },
          ]}
        />
      </Section>
    </>
  );
}
