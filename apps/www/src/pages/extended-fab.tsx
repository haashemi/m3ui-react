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

export function ExtendedFabPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Extended FAB"
        description="Extended FABs pair the primary action's icon with a label. The label can collapse, leaving a regular FAB, as people scroll."
      />
      <ComponentPreview name="extended-fab/demo" />

      <Section title="Installation">
        <Installation item="extended-fab" />
      </Section>

      <UsageSection
        imports="import { ExtendedFab } from '@/components/ui/extended-fab';"
        code="<ExtendedFab icon={<EditIcon />}>Compose</ExtendedFab>"
      />

      <Section title="Notes">
        <Prose>
          <p>
            Set <Code>extended={'{false}'}</Code> to collapse the label. Padding, gap and the
            label&apos;s width animate on the default spatial spring. The label stays in the
            accessibility tree, so the button keeps its name.
          </p>
          <p>
            It shares color styles with <DocLink to="/components/fab">FAB</DocLink>, and its sizes
            match the FAB&apos;s heights.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'extended-fab/variants' },
          {
            title: 'Sizes',
            name: 'extended-fab/sizes',
            description: 'Small (56dp), medium (80dp) and large (96dp).',
          },
          { title: 'Collapse', name: 'extended-fab/collapse' },
          { title: 'Without an icon', name: 'extended-fab/without-icon' },
        ]}
      />
      <RtlSection name="extended-fab/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="ExtendedFab"
          description="A UI SDK Button styled as an M3 extended FAB."
          inherits={{ label: 'Button', doc: 'button' }}
          props={[
            {
              name: 'variant',
              type: "'primary-container' | 'secondary-container' | 'tertiary-container' | 'primary' | 'secondary' | 'tertiary'",
              default: "'primary-container'",
            },
            { name: 'size', type: "'small' | 'medium' | 'large'", default: "'small'" },
            { name: 'icon', type: 'React.ReactNode', description: 'Shown before the label.' },
            {
              name: 'extended',
              type: 'boolean',
              default: 'true',
              description: 'Shows the label. False collapses it into a FAB.',
            },
          ]}
        />
      </Section>
    </>
  );
}
