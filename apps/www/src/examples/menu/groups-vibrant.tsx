import type * as React from 'react';

import {
  ContentCopyIcon,
  ContentCutIcon,
  DeleteIcon,
  DownloadIcon,
  LinkIcon,
  ShareIcon,
  VisibilityIcon,
} from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuTrigger,
} from '@/registry/m3ui/ui/menu';

export default function MenuGroupsVibrant(): React.JSX.Element {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="tonal" />}>Document</MenuTrigger>
      <MenuContent variant="vibrant">
        <MenuGroup>
          <MenuItem value="preview" icon={<VisibilityIcon />}>
            Preview
          </MenuItem>
          <MenuItem value="share" icon={<ShareIcon />}>
            Share
          </MenuItem>
          <MenuItem value="link" icon={<LinkIcon />}>
            Get link
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuGroupLabel>Edit</MenuGroupLabel>
          <MenuItem value="cut" icon={<ContentCutIcon />} shortcut="mod+x">
            Cut
          </MenuItem>
          <MenuItem value="copy" icon={<ContentCopyIcon />} shortcut="mod+c">
            Copy
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuItem value="download" icon={<DownloadIcon />}>
            Download
          </MenuItem>
          <MenuItem value="delete" icon={<DeleteIcon />}>
            Move to trash
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
