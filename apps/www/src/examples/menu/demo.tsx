import type * as React from 'react';

import { ContentCopyIcon, ContentCutIcon, ContentPasteIcon, MoreVertIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/registry/m3ui/ui/menu';

export default function MenuDemo(): React.JSX.Element {
  return (
    <Menu>
      <MenuTrigger render={<IconButton aria-label="More options" />}>
        <MoreVertIcon />
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="cut" icon={<ContentCutIcon />} shortcut="mod+x">
          Cut
        </MenuItem>
        <MenuItem value="copy" icon={<ContentCopyIcon />} shortcut="mod+c">
          Copy
        </MenuItem>
        <MenuItem value="paste" icon={<ContentPasteIcon />} shortcut="mod+v" disabled>
          Paste
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
