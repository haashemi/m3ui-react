import * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from '@/registry/m3ui/ui/menu';

export default function MenuSelection(): React.JSX.Element {
  const [density, setDensity] = React.useState('comfortable');
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outlined" />}>View options</MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuGroupLabel>Show</MenuGroupLabel>
          <MenuCheckboxItem value="toolbar" defaultChecked>
            Toolbar
          </MenuCheckboxItem>
          <MenuCheckboxItem value="sidebar">Sidebar</MenuCheckboxItem>
          <MenuCheckboxItem value="status-bar" defaultChecked disabled>
            Status bar
          </MenuCheckboxItem>
        </MenuGroup>
        <MenuGroup>
          <MenuGroupLabel>Density</MenuGroupLabel>
          <MenuRadioGroup value={density} onValueChange={setDensity}>
            <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
            <MenuRadioItem value="cozy">Cozy</MenuRadioItem>
            <MenuRadioItem value="compact">Compact</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
