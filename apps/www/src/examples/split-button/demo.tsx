import type * as React from 'react';

import { EventIcon, SendIcon } from '~/icons';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/registry/m3ui/ui/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
} from '@/registry/m3ui/ui/split-button';

export default function SplitButtonDemo(): React.JSX.Element {
  return (
    <SplitButton>
      <SplitButtonAction>
        <SendIcon />
        Send
      </SplitButtonAction>
      <Menu>
        <MenuTrigger render={<SplitButtonTrigger aria-label="More send options" />} />
        <MenuContent align="end">
          <MenuItem value="schedule" icon={<EventIcon />}>
            Schedule send
          </MenuItem>
          <MenuItem value="draft">Save draft</MenuItem>
        </MenuContent>
      </Menu>
    </SplitButton>
  );
}
