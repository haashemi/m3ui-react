import type * as React from 'react';

import { Checkbox } from '@/registry/m3ui/ui/checkbox';

export default function CheckboxError(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 type-body-large">
        <Checkbox aria-invalid aria-describedby="terms-error" />I accept the terms
      </label>
      <p id="terms-error" className="ps-12 type-body-small text-error">
        Accept the terms to continue.
      </p>
    </div>
  );
}
