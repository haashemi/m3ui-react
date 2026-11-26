import * as React from 'react';

import { Checkbox } from '@/registry/m3ui/ui/checkbox';

const toppings = ['Cheese', 'Olives', 'Basil'];

export default function CheckboxIndeterminate(): React.JSX.Element {
  const [checked, setChecked] = React.useState(['Cheese']);
  const parent =
    checked.length === 0 ? false : checked.length === toppings.length || 'indeterminate';

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
