import type * as React from 'react';

import { Checkbox } from '@/registry/m3ui/ui/checkbox';

export default function CheckboxDisabled(): React.JSX.Element {
  return (
    <>
      <Checkbox aria-label="Unchecked" disabled />
      <Checkbox aria-label="Checked" disabled defaultChecked />
      <Checkbox aria-label="Indeterminate" disabled defaultChecked="indeterminate" />
    </>
  );
}
