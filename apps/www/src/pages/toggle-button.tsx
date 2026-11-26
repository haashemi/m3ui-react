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

export function ToggleButtonPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Toggle Button"
        description="Toggle buttons stay selected after a press. Selecting one swaps its colors and morphs its shape: round turns square, square turns round."
      />
      <ComponentPreview name="toggle-button/demo" />

      <Section title="Installation">
        <Installation item="toggle-button" />
      </Section>

      <UsageSection
        imports="import { ToggleButton } from '@/components/ui/toggle-button';"
        code="<ToggleButton defaultPressed>Save</ToggleButton>"
      />

      <Section title="Notes">
        <Prose>
          <p>
            It shares sizes and shapes with <DocLink to="/components/button">Button</DocLink>. The
            text color style has no selected state, so it isn&apos;t offered.
          </p>
          <p>
            Keep the label the same in both states: screen readers announce whether it&apos;s
            pressed. The selected state is exposed as <Code>aria-pressed</Code> and{' '}
            <Code>data-pressed</Code>. Swap outlined and filled icons with{' '}
            <Code>in-data-pressed:hidden</Code> and <Code>not-in-data-pressed:hidden</Code>.
          </p>
          <p>
            To choose one or several options from a set, use a{' '}
            <DocLink to="/components/connected-button-group">Connected Button Group</DocLink>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'toggle-button/variants' },
          { title: 'Sizes', name: 'toggle-button/sizes' },
          {
            title: 'Shapes',
            name: 'toggle-button/shapes',
            description: 'A round button turns square when selected; a square one turns round.',
          },
          { title: 'Controlled', name: 'toggle-button/controlled' },
          { title: 'Disabled', name: 'toggle-button/disabled' },
        ]}
      />
      <RtlSection name="toggle-button/rtl" />
      <ToggleButtonApi />
    </>
  );
}

function ToggleButtonApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="ToggleButton"
        description="A UI SDK Toggle styled as an M3 button."
        inherits={{ label: 'Toggle', doc: 'toggle' }}
        props={[
          {
            name: 'variant',
            type: "'elevated' | 'filled' | 'tonal' | 'outlined'",
            default: "'filled'",
          },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
          { name: 'shape', type: "'round' | 'square'", default: "'round'" },
          { name: 'pressed', type: 'boolean', description: 'Controls the selected state.' },
          { name: 'defaultPressed', type: 'boolean', default: 'false' },
          { name: 'onPressedChange', type: '(pressed: boolean, details) => void' },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]}
      />
    </Section>
  );
}
