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

export function SwitchPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Switch"
        description="Switches turn a setting on or off. The handle grows when selected or pressed, slides on the fast spatial spring and can be dragged."
      />
      <ComponentPreview name="switch/demo" />

      <Section title="Installation">
        <Installation item="switch" />
      </Section>

      <UsageSection
        imports="import { Switch } from '@/components/ui/switch';"
        code={`<label>
  Wi-Fi
  <Switch />
</label>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Use a switch for a setting that applies right away. For a choice that&apos;s confirmed
            later, like in a form with a submit button, prefer a checkbox.
          </p>
          <p>
            Label it with a wrapping <Code>label</Code> or an <Code>aria-label</Code>. Drag the
            handle or press the track; the handle follows the reading direction.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          {
            title: 'Icons',
            name: 'switch/icons',
            description: 'Show a check on the selected handle, or icons in both states.',
          },
          { title: 'Settings list', name: 'switch/settings' },
          { title: 'Disabled', name: 'switch/disabled' },
        ]}
      />
      <RtlSection name="switch/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="Switch"
          description="A UI SDK Switch with the M3 track, handle and icons."
          inherits={{ label: 'Switch', doc: 'switch' }}
          props={[
            { name: 'icons', type: "'none' | 'checked' | 'both'", default: "'none'" },
            { name: 'checked', type: 'boolean' },
            { name: 'defaultChecked', type: 'boolean', default: 'false' },
            { name: 'onCheckedChange', type: '(checked: boolean, details) => void' },
            { name: 'disabled', type: 'boolean', default: 'false' },
            { name: 'name', type: 'string' },
          ]}
        />
      </Section>
    </>
  );
}
