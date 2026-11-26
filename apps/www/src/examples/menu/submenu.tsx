import type * as React from 'react';

import { EditIcon, HelpIcon, LogoutIcon, PersonIcon, SettingsIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from '@/registry/m3ui/ui/menu';

export default function MenuSubmenu(): React.JSX.Element {
  return (
    <Menu>
      <MenuTrigger render={<Button />}>Account</MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuItem value="profile" icon={<PersonIcon />} supportingText="ada@example.com">
            Ada Lovelace
          </MenuItem>
          <MenuItem value="edit" icon={<EditIcon />}>
            Edit profile
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuSub>
            <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem value="language" trailingText="English">
                Language
              </MenuItem>
              <MenuItem value="region" trailingText="Canada">
                Region
              </MenuItem>
              <MenuCheckboxItem value="notifications" defaultChecked>
                Notifications
              </MenuCheckboxItem>
            </MenuSubContent>
          </MenuSub>
          <MenuItem value="help" icon={<HelpIcon />}>
            Help
          </MenuItem>
          <MenuItem value="sign-out" icon={<LogoutIcon />}>
            Sign out
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
