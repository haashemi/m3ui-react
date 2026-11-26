import * as React from 'react';

import {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuSeparator,
} from '@/registry/m3ui/ui/menu';

export default function MenuContext(): React.JSX.Element {
  const [last, setLast] = React.useState<string>();
  return (
    <div className="flex flex-col items-center gap-3">
      <Menu onAction={(value) => setLast(value)}>
        <div className="rounded-corner-large border border-dashed border-outline type-body-large text-on-surface-variant">
          <MenuContextTrigger
            tabIndex={0}
            className="flex items-center justify-center block-32 inline-72"
          >
            Right-click or long-press here
          </MenuContextTrigger>
        </div>
        <MenuContent>
          <MenuItem value="back">Back</MenuItem>
          <MenuItem value="forward" disabled>
            Forward
          </MenuItem>
          <MenuItem value="reload">Reload</MenuItem>
          <MenuSeparator />
          <MenuItem value="print">Print…</MenuItem>
        </MenuContent>
      </Menu>
      <p className="type-body-medium text-on-surface-variant">
        {last ? `Chose ${last}` : 'Nothing chosen yet'}
      </p>
    </div>
  );
}
