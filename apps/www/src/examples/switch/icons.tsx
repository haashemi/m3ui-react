import type * as React from 'react';

import { Switch } from '@/registry/m3ui/ui/switch';

export default function SwitchIcons(): React.JSX.Element {
  return (
    <>
      <Switch aria-label="No icons" defaultChecked />
      <Switch aria-label="Check icon" icons="checked" defaultChecked />
      <Switch aria-label="Both icons, on" icons="both" defaultChecked />
      <Switch aria-label="Both icons, off" icons="both" />
    </>
  );
}
