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

export function IconButtonPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Icon Button"
        description="Icon buttons help people take minor actions with a single tap. Four color styles, five sizes, three widths and two shapes."
      />
      <ComponentPreview name="icon-button/demo" />

      <Section title="Installation">
        <Installation item="icon-button" />
      </Section>

      <UsageSection
        imports="import { IconButton } from '@/components/ui/icon-button';"
        code={`<IconButton aria-label="Settings">
  <SettingsIcon />
</IconButton>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            An icon button has no visible label, so always give it an <Code>aria-label</Code>.
          </p>
          <p>
            Pass one SVG as the child. It&apos;s sized by the button&apos;s size (20 to 40px) and
            filled with <Code>currentColor</Code>. Mirror icons that point a way, like arrows, in
            right-to-left text with <Code>rtl:-scale-x-100</Code>.
          </p>
          <p>
            For an icon that stays selected, like Favorite, use a{' '}
            <DocLink to="/components/toggle-icon-button">Toggle Icon Button</DocLink>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'icon-button/variants' },
          {
            title: 'Sizes',
            name: 'icon-button/sizes',
            description: 'Extra small (32dp) to extra large (136dp).',
          },
          {
            title: 'Widths',
            name: 'icon-button/widths',
            description: 'Narrow, default and wide containers change the horizontal padding.',
          },
          {
            title: 'Shapes',
            name: 'icon-button/shapes',
            description: 'Press and hold to see the corners morph.',
          },
          { title: 'Disabled', name: 'icon-button/disabled' },
        ]}
      />
      <RtlSection name="icon-button/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="IconButton"
          description="A UI SDK Button sized and shaped for a single icon."
          inherits={{ label: 'Button', doc: 'button' }}
          props={[
            {
              name: 'variant',
              type: "'filled' | 'tonal' | 'outlined' | 'standard'",
              default: "'standard'",
            },
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
            { name: 'width', type: "'narrow' | 'default' | 'wide'", default: "'default'" },
            { name: 'shape', type: "'round' | 'square'", default: "'round'" },
            { name: 'aria-label', type: 'string', description: 'Names the action.' },
            { name: 'disabled', type: 'boolean', default: 'false' },
          ]}
        />
      </Section>
    </>
  );
}
