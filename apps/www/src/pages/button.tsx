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

export function ButtonPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Button"
        description="Buttons prompt most actions in a UI. Five sizes, five color styles, and round or square shapes whose corners morph when pressed."
      />
      <ComponentPreview name="button/demo" />

      <Section title="Installation">
        <Installation item="button" />
      </Section>

      <UsageSection
        imports="import { Button } from '@/components/ui/button';"
        code='<Button variant="filled">Button</Button>'
      />

      <Section title="Notes">
        <Prose>
          <p>
            Icons go in as children, before or after the label. They&apos;re sized by the
            button&apos;s size and filled with <Code>currentColor</Code>.
          </p>
          <p>
            For a button that stays selected, like Save or Follow, use a{' '}
            <DocLink to="/components/toggle-button">Toggle Button</DocLink>. For an icon on its own,
            use an <DocLink to="/components/icon-button">Icon Button</DocLink>.
          </p>
          <p>
            Return a Promise from <Code>onClick</Code> and the button stays pending until it
            settles: it ignores more presses and sets <Code>data-pending</Code> for styling.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'button/variants' },
          {
            title: 'Sizes',
            name: 'button/sizes',
            description:
              "Extra small (32dp) to extra large (136dp). Padding, icon size, label type and corner radius follow each size's tokens.",
          },
          {
            title: 'Shapes',
            name: 'button/shapes',
            description: 'Press and hold to see the corners morph on the fast spatial spring.',
          },
          { title: 'With an icon', name: 'button/with-icon' },
          {
            title: 'Pending',
            name: 'button/pending',
            description:
              'The label swaps while the Promise from onClick runs. Press it twice: the second press is ignored.',
          },
          { title: 'Disabled', name: 'button/disabled' },
          {
            title: 'As a link',
            name: 'button/link',
            description:
              'Pass an <a> or a router link to render. It keeps its href and link semantics.',
          },
        ]}
      />
      <RtlSection name="button/rtl" />
      <ButtonApi />
    </>
  );
}

function ButtonApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="Button"
        description="A UI SDK Button with M3 styles, a ripple and a focus ring."
        inherits={{ label: 'Button', doc: 'button' }}
        props={[
          {
            name: 'variant',
            type: "'elevated' | 'filled' | 'tonal' | 'outlined' | 'text'",
            default: "'filled'",
          },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
          { name: 'shape', type: "'round' | 'square'", default: "'round'" },
          {
            name: 'render',
            type: 'React.ReactElement | ((props, state) => React.ReactElement)',
            description: 'Renders another element, like a link, with the button behavior.',
          },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]}
      />
    </Section>
  );
}
