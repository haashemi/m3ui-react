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

export function RadioPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Radio Button"
        description="Radio buttons let people select one option from a set. The dot grows in with the emphasized easing."
      />
      <ComponentPreview name="radio/demo" />

      <Section title="Installation">
        <Installation item="radio" />
      </Section>

      <UsageSection
        imports="import { Radio, RadioGroup } from '@/components/ui/radio';"
        code={`<RadioGroup aria-label="Shipping speed" defaultValue="standard">
  <label>
    <Radio value="standard" />
    Standard
  </label>
  <label>
    <Radio value="express" />
    Express
  </label>
</RadioGroup>`}
      />

      <CompositionSection
        tree={`RadioGroup
└── Radio`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            The group is one Tab stop. Arrow keys move the selection, swapped in right-to-left text.
            Name the group with <Code>aria-label</Code> or <Code>aria-labelledby</Code>.
          </p>
          <p>
            <Code>RadioGroup</Code> stacks its children in a column; add <Code>flex-row</Code> to
            lay them out in a row.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Horizontal', name: 'radio/horizontal' },
          { title: 'Controlled', name: 'radio/controlled' },
          { title: 'Disabled', name: 'radio/disabled' },
        ]}
      />
      <RtlSection name="radio/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="RadioGroup"
          description="A UI SDK RadioGroup laid out as a column."
          inherits={{ label: 'RadioGroup', doc: 'radio' }}
          props={[
            { name: 'value', type: 'string | null' },
            { name: 'defaultValue', type: 'string | null' },
            { name: 'onValueChange', type: '(value: string | null, details) => void' },
            { name: 'disabled', type: 'boolean', default: 'false' },
            { name: 'name', type: 'string' },
            { name: 'required', type: 'boolean', default: 'false' },
          ]}
        />
        <ApiComponent
          name="Radio"
          description="A UI SDK Radio with the M3 icon, a ripple and a focus ring."
          inherits={{ label: 'Radio', doc: 'radio' }}
          props={[
            { name: 'value', type: 'string', description: 'The group value when checked.' },
            { name: 'disabled', type: 'boolean', default: 'false' },
          ]}
        />
      </Section>
    </>
  );
}
