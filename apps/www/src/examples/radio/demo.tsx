import type * as React from 'react';

import { Radio, RadioGroup } from '@/registry/m3ui/ui/radio';

export default function RadioDemo(): React.JSX.Element {
  return (
    <RadioGroup aria-label="Shipping speed" defaultValue="standard">
      <label className="flex items-center gap-2 type-body-large">
        <Radio value="standard" />
        Standard
      </label>
      <label className="flex items-center gap-2 type-body-large">
        <Radio value="express" />
        Express
      </label>
      <label className="flex items-center gap-2 type-body-large">
        <Radio value="overnight" />
        Overnight
      </label>
    </RadioGroup>
  );
}
