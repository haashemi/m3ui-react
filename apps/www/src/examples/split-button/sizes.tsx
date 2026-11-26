import type * as React from 'react';

import { EditIcon } from '~/icons';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/registry/m3ui/ui/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
} from '@/registry/m3ui/ui/split-button';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SplitButtonSizes(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-6">
      {sizes.map((size) => (
        <SplitButton key={size} size={size} variant="tonal">
          <SplitButtonAction>
            <EditIcon />
            Edit
          </SplitButtonAction>
          <Menu>
            <MenuTrigger
              render={<SplitButtonTrigger aria-label={`More edit options, ${size}`} />}
            />
            <MenuContent align="end">
              <MenuItem value="rename">Rename</MenuItem>
              <MenuItem value="duplicate">Duplicate</MenuItem>
            </MenuContent>
          </Menu>
        </SplitButton>
      ))}
    </div>
  );
}
