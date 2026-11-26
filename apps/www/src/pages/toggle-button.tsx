import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import { ComponentPreview, RtlSection } from '~/components/component-preview';
import {
  Code,
  CodeBlock,
  DocLink,
  PageHeader,
  Prose,
  Section,
  SubSection,
} from '~/components/docs';
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

      <Section title="Usage">
        <CodeBlock code="import { ToggleButton } from '@/components/ui/toggle-button';" />
        <CodeBlock code="<ToggleButton defaultPressed>Save</ToggleButton>" />
      </Section>

      <Section title="Notes">
        <Prose>
          <p>
            It shares sizes and shapes with <DocLink to="/components/button">Button</DocLink>. The
            text color style has no selected state, so it isn&apos;t offered.
          </p>
          <p>
            The selected state is exposed as <Code>aria-pressed</Code> and <Code>data-pressed</Code>
            . Swap outlined and filled icons with <Code>in-data-pressed:hidden</Code> and{' '}
            <Code>not-in-data-pressed:hidden</Code>.
          </p>
          <p>
            To choose one or several options from a set, use a{' '}
            <DocLink to="/components/button-group">Button Group</DocLink> with connected items.
          </p>
        </Prose>
      </Section>

      <ToggleButtonExamples />
      <RtlSection name="toggle-button/rtl" />
      <ToggleButtonApi />
    </>
  );
}

function ToggleButtonExamples(): React.JSX.Element {
  return (
    <Section title="Examples">
      <SubSection title="Color styles">
        <ComponentPreview name="toggle-button/variants" />
      </SubSection>
      <SubSection title="Sizes">
        <ComponentPreview name="toggle-button/sizes" />
      </SubSection>
      <SubSection
        title="Shapes"
        description="A round button turns square when selected; a square one turns round."
      >
        <ComponentPreview name="toggle-button/shapes" />
      </SubSection>
      <SubSection title="Controlled">
        <ComponentPreview name="toggle-button/controlled" />
      </SubSection>
      <SubSection title="Disabled">
        <ComponentPreview name="toggle-button/disabled" />
      </SubSection>
    </Section>
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
