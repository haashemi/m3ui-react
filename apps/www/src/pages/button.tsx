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

      <Section title="Usage">
        <CodeBlock code="import { Button } from '@/components/ui/button';" />
        <CodeBlock code='<Button variant="filled">Button</Button>' />
      </Section>

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

      <ButtonExamples />
      <RtlSection name="button/rtl" />
      <ButtonApi />
    </>
  );
}

function ButtonExamples(): React.JSX.Element {
  return (
    <Section title="Examples">
      <SubSection title="Color styles">
        <ComponentPreview name="button/variants" />
      </SubSection>
      <SubSection
        title="Sizes"
        description="Extra small (32dp) to extra large (136dp). Padding, icon size, label type and corner radius follow each size's tokens."
      >
        <ComponentPreview name="button/sizes" />
      </SubSection>
      <SubSection
        title="Shapes"
        description="Press and hold to see the corners morph on the fast spatial spring."
      >
        <ComponentPreview name="button/shapes" />
      </SubSection>
      <SubSection title="With an icon">
        <ComponentPreview name="button/with-icon" />
      </SubSection>
      <SubSection
        title="Pending"
        description="The label swaps while the Promise from onClick runs. Press it twice: the second press is ignored."
      >
        <ComponentPreview name="button/pending" />
      </SubSection>
      <SubSection title="Disabled">
        <ComponentPreview name="button/disabled" />
      </SubSection>
      <SubSection
        title="As a link"
        description="Pass an <a> or a router link to render. It keeps its href and link semantics."
      >
        <ComponentPreview name="button/link" />
      </SubSection>
    </Section>
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
