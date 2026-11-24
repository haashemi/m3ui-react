import { Menu, MenuContent, MenuItem, MenuTrigger } from '@ui-sdk/react/menu';
import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { EditIcon, SendIcon } from '~/icons';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
} from '@/registry/m3ui/ui/split-button';

const variants = ['elevated', 'filled', 'tonal', 'outlined'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

function DemoMenu({ label }: { label: string }): React.JSX.Element {
  return (
    <Menu>
      <MenuTrigger render={<SplitButtonTrigger aria-label={label} />} />
      <MenuContent
        align="end"
        sideOffset={4}
        className="rounded-corner-large bg-surface-container py-2 text-on-surface shadow-elevation-2 min-inline-28"
      >
        <MenuItem className="flex items-center px-3 type-label-large block-12 data-highlighted:bg-on-surface/10">
          Schedule send
        </MenuItem>
        <MenuItem className="flex items-center px-3 type-label-large block-12 data-highlighted:bg-on-surface/10">
          Save draft
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function SplitButtonPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Split button"
        description="A split button pairs a primary action with a menu of related actions. Hovering and pressing tightens the inner corners; opening the menu rounds the trigger and spins its icon."
        item="split-button"
      />

      <Section
        title="Color styles"
        description="The trigger works with any menu: it reads aria-expanded or data-open. These examples use UI SDK's Menu."
      >
        <Preview
          code={`<SplitButton variant="filled">
  <SplitButtonAction>
    <SendIcon />
    Send
  </SplitButtonAction>
  <Menu>
    <MenuTrigger render={<SplitButtonTrigger aria-label="More send options" />} />
    <MenuContent>…</MenuContent>
  </Menu>
</SplitButton>`}
        >
          {variants.map((variant) => (
            <SplitButton key={variant} variant={variant}>
              <SplitButtonAction>
                <SendIcon />
                Send
              </SplitButtonAction>
              <DemoMenu label={`More send options, ${variant}`} />
            </SplitButton>
          ))}
        </Preview>
      </Section>

      <Section title="Sizes">
        <Preview className="flex-col">
          {sizes.map((size) => (
            <SplitButton key={size} size={size} variant="tonal">
              <SplitButtonAction>
                <EditIcon />
                Edit
              </SplitButtonAction>
              <DemoMenu label={`More edit options, ${size}`} />
            </SplitButton>
          ))}
        </Preview>
      </Section>
    </>
  );
}
