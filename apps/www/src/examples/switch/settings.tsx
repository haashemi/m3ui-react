import type * as React from 'react';

import { Switch } from '@/registry/m3ui/ui/switch';

const settings = [
  { label: 'Wi-Fi', description: 'Connected to Home', checked: true },
  { label: 'Bluetooth', description: 'Off', checked: false },
  { label: 'Airplane mode', description: 'Turns off wireless connections', checked: false },
];

export default function SwitchSettings(): React.JSX.Element {
  return (
    <div className="flex flex-col inline-full max-inline-90">
      {settings.map((setting) => (
        <label key={setting.label} className="flex items-center justify-between gap-4 py-3">
          <span className="flex flex-col">
            <span className="type-body-large">{setting.label}</span>
            <span className="type-body-medium text-on-surface-variant">{setting.description}</span>
          </span>
          <Switch defaultChecked={setting.checked} icons="checked" />
        </label>
      ))}
    </div>
  );
}
