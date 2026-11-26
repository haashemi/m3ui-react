import type * as React from 'react';

import { SendIcon } from '~/icons';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/registry/m3ui/ui/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
} from '@/registry/m3ui/ui/split-button';

const variants = ['elevated', 'filled', 'tonal', 'outlined'] as const;

export default function SplitButtonVariants(): React.JSX.Element {
  return (
    <>
      {variants.map((variant) => (
        <SplitButton key={variant} variant={variant}>
          <SplitButtonAction>
            <SendIcon />
            Send
          </SplitButtonAction>
          <Menu>
            <MenuTrigger
              render={<SplitButtonTrigger aria-label={`More send options, ${variant}`} />}
            />
            <MenuContent align="end">
              <MenuItem value="schedule">Schedule send</MenuItem>
              <MenuItem value="draft">Save draft</MenuItem>
            </MenuContent>
          </Menu>
        </SplitButton>
      ))}
    </>
  );
}
