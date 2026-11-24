import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { Radio, RadioGroup } from '@/registry/m3ui/ui/radio';

const speeds = [
  { value: 'standard', label: 'Standard' },
  { value: 'express', label: 'Express' },
  { value: 'overnight', label: 'Overnight' },
];

export function RadioPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Radio button"
        description="Radio buttons let people select one option from a set. The group has one tab stop, arrow keys move the selection, and the dot grows in with the emphasized easing."
        item="radio"
      />

      <Section title="Basic">
        <Preview
          code={`<RadioGroup aria-label="Shipping speed" defaultValue="standard">
  <label className="flex items-center gap-2">
    <Radio value="standard" />
    Standard
  </label>
  …
</RadioGroup>`}
        >
          <RadioGroup aria-label="Shipping speed" defaultValue="standard">
            {speeds.map((speed) => (
              <label key={speed.value} className="flex items-center gap-2 type-body-large">
                <Radio value={speed.value} />
                {speed.label}
              </label>
            ))}
          </RadioGroup>
        </Preview>
      </Section>

      <Section title="Disabled">
        <Preview code='<RadioGroup disabled defaultValue="b">…</RadioGroup>'>
          <RadioGroup aria-label="Disabled" disabled defaultValue="b" className="flex-row">
            <Radio value="a" aria-label="Option A" />
            <Radio value="b" aria-label="Option B" />
          </RadioGroup>
        </Preview>
      </Section>
    </>
  );
}
