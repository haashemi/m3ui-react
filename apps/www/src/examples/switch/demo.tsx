import type * as React from 'react';

import { Switch } from '@/registry/m3ui/ui/switch';

export default function SwitchDemo(): React.JSX.Element {
  return (
    <label className="flex items-center gap-4 type-body-large">
      Wi-Fi
      <Switch defaultChecked />
    </label>
  );
}
