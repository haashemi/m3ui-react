import * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { Checkbox } from '@/registry/m3ui/ui/checkbox';

const toppings = ['Cheese', 'Olives', 'Basil'];

function ParentCheckbox(): React.JSX.Element {
  const [checked, setChecked] = React.useState<string[]>(['Cheese']);
  const all = checked.length === toppings.length;
  const parent = checked.length === 0 ? false : all || 'indeterminate';
  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-2 type-body-large">
        <Checkbox
          checked={parent}
          onCheckedChange={(next) => setChecked(next === true ? toppings : [])}
        />
        All toppings
      </label>
      {toppings.map((topping) => (
        <label key={topping} className="flex items-center gap-2 ps-8 type-body-large">
          <Checkbox
            checked={checked.includes(topping)}
            onCheckedChange={(next) =>
              setChecked((current) =>
                next === true
                  ? [...current, topping]
                  : current.filter((value) => value !== topping),
              )
            }
          />
          {topping}
        </label>
      ))}
    </div>
  );
}

export function CheckboxPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Checkbox"
        description="Checkboxes let people select one or more items from a list, or turn an item on or off. The box fills and the checkmark draws in with the emphasized easing, and morphs into a dash for the indeterminate state."
        item="checkbox"
      />

      <Section title="Basic">
        <Preview
          code={`<label className="flex items-center gap-2">
  <Checkbox defaultChecked />
  Email me about updates
</label>`}
        >
          <label className="flex items-center gap-2 type-body-large">
            <Checkbox defaultChecked />
            Email me about updates
          </label>
          <label className="flex items-center gap-2 type-body-large">
            <Checkbox />
            Send a weekly digest
          </label>
        </Preview>
      </Section>

      <Section
        title="Indeterminate"
        description="A parent checkbox shows a dash while some of its children are checked. Switching between checked and indeterminate morphs the mark."
      >
        <Preview code='<Checkbox checked="indeterminate" />'>
          <ParentCheckbox />
        </Preview>
      </Section>

      <Section title="States">
        <Preview code='<Checkbox aria-invalid /> <Checkbox disabled defaultChecked="indeterminate" />'>
          <Checkbox aria-label="Error" aria-invalid />
          <Checkbox aria-label="Error, checked" aria-invalid defaultChecked />
          <Checkbox aria-label="Disabled" disabled />
          <Checkbox aria-label="Disabled, checked" disabled defaultChecked />
          <Checkbox aria-label="Disabled, mixed" disabled defaultChecked="indeterminate" />
        </Preview>
      </Section>
    </>
  );
}
