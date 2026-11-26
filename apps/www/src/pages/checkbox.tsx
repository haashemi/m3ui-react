import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

export function CheckboxPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Checkbox"
        description="Checkboxes let people select one or more items from a list, or turn an item on or off. The checkmark draws in with the emphasized easing and morphs into a dash for the indeterminate state."
      />
      <ComponentPreview name="checkbox/demo" />

      <Section title="Installation">
        <Installation item="checkbox" />
      </Section>

      <UsageSection
        imports="import { Checkbox } from '@/components/ui/checkbox';"
        code={`<label>
  <Checkbox />
  Email me about updates
</label>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Wrap the checkbox and its text in a <Code>label</Code>, or give it an{' '}
            <Code>aria-label</Code>. The 40dp target includes the state layer around the 18dp box.
          </p>
          <p>
            Pass <Code>&quot;indeterminate&quot;</Code> to <Code>checked</Code> for a parent whose
            children are partly checked. Set <Code>aria-invalid</Code> for the error colors.
          </p>
          <p>
            With a <Code>name</Code>, it submits with its form like a native checkbox.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          {
            title: 'Indeterminate',
            name: 'checkbox/indeterminate',
            description:
              'A parent shows a dash while some of its children are checked. Switching between checked and indeterminate morphs the mark.',
          },
          { title: 'Error', name: 'checkbox/error' },
          { title: 'Disabled', name: 'checkbox/disabled' },
          { title: 'Form', name: 'checkbox/form' },
        ]}
      />
      <RtlSection name="checkbox/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="Checkbox"
          description="A UI SDK Checkbox with the M3 mark, a ripple and a focus ring."
          inherits={{ label: 'Checkbox', doc: 'checkbox' }}
          props={[
            { name: 'checked', type: "boolean | 'indeterminate'" },
            { name: 'defaultChecked', type: "boolean | 'indeterminate'", default: 'false' },
            {
              name: 'onCheckedChange',
              type: "(checked: boolean | 'indeterminate', details) => void",
            },
            { name: 'aria-invalid', type: 'boolean', description: 'Shows the error colors.' },
            { name: 'disabled', type: 'boolean', default: 'false' },
            { name: 'name', type: 'string' },
            { name: 'value', type: 'string', description: 'Submitted while checked.' },
          ]}
        />
      </Section>
    </>
  );
}
