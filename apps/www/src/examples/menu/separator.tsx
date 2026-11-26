import type * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@/registry/m3ui/ui/menu';

export default function MenuSeparatorExample(): React.JSX.Element {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="tonal" />}>File</MenuTrigger>
      <MenuContent>
        <MenuItem value="rename">Rename</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuItem value="archive">Archive</MenuItem>
        <MenuSeparator />
        <MenuItem value="delete">Delete</MenuItem>
      </MenuContent>
    </Menu>
  );
}
