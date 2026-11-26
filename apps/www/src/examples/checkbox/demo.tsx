import type * as React from 'react';

import { Checkbox } from '@/registry/m3ui/ui/checkbox';

export default function CheckboxDemo(): React.JSX.Element {
  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-2 type-body-large">
        <Checkbox defaultChecked />
        Email me about updates
      </label>
      <label className="flex items-center gap-2 type-body-large">
        <Checkbox />
        Send a weekly digest
      </label>
    </div>
  );
}
