import type * as React from 'react';

import { MenuIcon, SearchIcon } from '~/icons';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const messages = Array.from({ length: 24 }, (_, index) => `Message ${index + 1}`);

export default function AppBarScrollLift(): React.JSX.Element {
  return (
    <section
      aria-label="Inbox"
      className="overflow-y-auto rounded-corner-large bg-surface block-120 inline-full max-inline-80"
    >
      <AppBar
        size="small"
        scrollBehavior="pinned"
        title="Inbox"
        leading={
          <IconButton aria-label="Menu">
            <MenuIcon />
          </IconButton>
        }
        trailing={
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
        }
      />
      <ul className="flex flex-col gap-2 px-4 py-2">
        {messages.map((message) => (
          <li
            key={message}
            className="rounded-corner-medium bg-surface-container-low px-4 py-3 type-body-large"
          >
            {message}
          </li>
        ))}
      </ul>
    </section>
  );
}
