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

export function ToggleIconButtonPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Toggle Icon Button"
        description="Toggle icon buttons stay selected after a press. Selecting one swaps its colors and morphs its shape: round turns square, square turns round."
      />
      <ComponentPreview name="toggle-icon-button/demo" />

      <Section title="Installation">
        <Installation item="toggle-icon-button" />
      </Section>

      <UsageSection
        imports="import { ToggleIconButton } from '@/components/ui/toggle-icon-button';"
        code={`<ToggleIconButton aria-label="Favorite">
  <FavoriteIcon />
</ToggleIconButton>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            It shares sizes, widths and shapes with{' '}
            <DocLink to="/components/icon-button">Icon Button</DocLink>. Give it an{' '}
            <Code>aria-label</Code> that names the setting, not its state; screen readers announce
            the state from <Code>aria-pressed</Code>.
          </p>
          <p>
            Swap an outlined icon for a filled one when selected with{' '}
            <Code>in-data-pressed:hidden</Code> and <Code>not-in-data-pressed:hidden</Code>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'toggle-icon-button/variants' },
          { title: 'Sizes', name: 'toggle-icon-button/sizes' },
          {
            title: 'Shapes',
            name: 'toggle-icon-button/shapes',
            description: 'A round button turns square when selected; a square one turns round.',
          },
          { title: 'Controlled', name: 'toggle-icon-button/controlled' },
          { title: 'Disabled', name: 'toggle-icon-button/disabled' },
        ]}
      />
      <RtlSection name="toggle-icon-button/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="ToggleIconButton"
          description="A UI SDK Toggle styled as an M3 icon button."
          inherits={{ label: 'Toggle', doc: 'toggle' }}
          props={[
            {
              name: 'variant',
              type: "'filled' | 'tonal' | 'outlined' | 'standard'",
              default: "'standard'",
            },
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
            { name: 'width', type: "'narrow' | 'default' | 'wide'", default: "'default'" },
            { name: 'shape', type: "'round' | 'square'", default: "'round'" },
            { name: 'pressed', type: 'boolean', description: 'Controls the selected state.' },
            { name: 'defaultPressed', type: 'boolean', default: 'false' },
            { name: 'onPressedChange', type: '(pressed: boolean, details) => void' },
            { name: 'disabled', type: 'boolean', default: 'false' },
          ]}
        />
      </Section>
    </>
  );
}
