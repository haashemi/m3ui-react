import type * as React from 'react';

import { Radio, RadioGroup } from '@/registry/m3ui/ui/radio';

export default function RadioHorizontal(): React.JSX.Element {
  return (
    <RadioGroup aria-label="Size" defaultValue="m" className="flex-row">
      <label className="flex items-center gap-1 pe-4 type-body-large">
        <Radio value="s" />S
      </label>
      <label className="flex items-center gap-1 pe-4 type-body-large">
        <Radio value="m" />M
      </label>
      <label className="flex items-center gap-1 pe-4 type-body-large">
        <Radio value="l" />L
      </label>
    </RadioGroup>
  );
}
