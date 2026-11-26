import type * as React from 'react';

import { Switch } from '@/registry/m3ui/ui/switch';

export default function SwitchDisabled(): React.JSX.Element {
  return (
    <>
      <Switch aria-label="On" disabled defaultChecked icons="both" />
      <Switch aria-label="Off" disabled icons="both" />
      <Switch aria-label="On, no icon" disabled defaultChecked />
      <Switch aria-label="Off, no icon" disabled />
    </>
  );
}
