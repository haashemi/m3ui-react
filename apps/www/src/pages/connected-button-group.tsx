import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, CompositionSection, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

export function ConnectedButtonGroupPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Connected Button Group"
        description="Connected button groups let people select options, switch views or sort elements. They replace segmented buttons: inner corners tighten when pressed and round fully when selected."
      />
      <ComponentPreview name="connected-button-group/demo" />

      <Section title="Installation">
        <Installation item="connected-button-group" />
      </Section>

      <UsageSection
        imports={`import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/components/ui/connected-button-group';`}
        code={`<ConnectedButtonGroup aria-label="View" defaultValue={['day']}>
  <ConnectedButtonGroupItem value="day">Day</ConnectedButtonGroupItem>
  <ConnectedButtonGroupItem value="week">Week</ConnectedButtonGroupItem>
</ConnectedButtonGroup>`}
      />

      <CompositionSection
        tree={`ConnectedButtonGroup
└── ConnectedButtonGroupItem`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            The group is a UI SDK ToggleGroup: one Tab stop, arrow keys between items (swapped in
            right-to-left text), and a value that lists the selected items.
          </p>
          <p>
            Set <Code>deselectable={'{false}'}</Code> for single selection where one item must stay
            selected, or <Code>multiple</Code> to select several.
          </p>
          <p>
            Items read <Code>size</Code> and <Code>variant</Code> from the group. Icon-only items
            need an <Code>aria-label</Code>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'connected-button-group/variants' },
          { title: 'Sizes', name: 'connected-button-group/sizes' },
          { title: 'Multiple selection', name: 'connected-button-group/multiple' },
          { title: 'Icons', name: 'connected-button-group/icons' },
          { title: 'Controlled', name: 'connected-button-group/controlled' },
        ]}
      />
      <RtlSection name="connected-button-group/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="ConnectedButtonGroup"
          description="A UI SDK ToggleGroup whose items connect into one shape."
          inherits={{ label: 'ToggleGroup', doc: 'toggle' }}
          props={[
            {
              name: 'variant',
              type: "'elevated' | 'filled' | 'tonal' | 'outlined'",
              default: "'filled'",
            },
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
            { name: 'value', type: 'string[]', description: 'The selected items, controlled.' },
            { name: 'defaultValue', type: 'string[]' },
            { name: 'onValueChange', type: '(value: string[], details) => void' },
            { name: 'multiple', type: 'boolean', default: 'false' },
            { name: 'deselectable', type: 'boolean', default: 'true' },
          ]}
        />
        <ApiComponent
          name="ConnectedButtonGroupItem"
          description="A UI SDK Toggle styled from the group's size and variant."
          inherits={{ label: 'Toggle', doc: 'toggle' }}
          props={[
            { name: 'value', type: 'string', description: 'Identifies the item in the group.' },
            { name: 'disabled', type: 'boolean', default: 'false' },
          ]}
        />
      </Section>
    </>
  );
}
