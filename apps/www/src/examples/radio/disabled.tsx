import type * as React from 'react';

import { Radio, RadioGroup } from '@/registry/m3ui/ui/radio';

export default function RadioDisabled(): React.JSX.Element {
  return (
    <RadioGroup aria-label="Delivery" defaultValue="pickup">
      <label className="flex items-center gap-2 type-body-large">
        <Radio value="pickup" />
        Pick up in store
      </label>
      <label className="flex items-center gap-2 type-body-large text-on-surface/38">
        <Radio value="delivery" disabled />
        Home delivery (unavailable)
      </label>
    </RadioGroup>
  );
}
