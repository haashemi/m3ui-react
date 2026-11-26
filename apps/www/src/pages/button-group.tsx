import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { BookmarkIcon, EditIcon, ShareIcon, StarIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import {
  ButtonGroup,
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/button-group';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const sizes = ['xs', 'sm', 'md'] as const;

export function ButtonGroupsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Button groups"
        description="Button groups organize buttons and add interactions between them. In a standard group, the pressed button grows and its neighbors make room. Connected groups replace segmented buttons."
        item="button-group"
      />

      <Section
        title="Standard"
        description="Press and hold a button: it widens by 15% with the fast spatial spring while its neighbors shrink."
      >
        <Preview
          className="flex-col"
          code={`<ButtonGroup size="sm">
  <IconButton variant="tonal" aria-label="Edit"><EditIcon /></IconButton>
  <Button>Share</Button>
  <IconButton variant="tonal" aria-label="Bookmark"><BookmarkIcon /></IconButton>
</ButtonGroup>`}
        >
          {sizes.map((size) => (
            <ButtonGroup key={size} size={size}>
              <IconButton size={size} variant="tonal" aria-label="Edit">
                <EditIcon />
              </IconButton>
              <Button size={size}>
                <ShareIcon />
                Share
              </Button>
              <IconButton size={size} variant="tonal" aria-label="Bookmark">
                <BookmarkIcon />
              </IconButton>
              <IconButton size={size} variant="tonal" aria-label="Star">
                <StarIcon />
              </IconButton>
            </ButtonGroup>
          ))}
        </Preview>
      </Section>

      <Section
        title="Connected, single selection"
        description="Inner corners tighten when pressed and round fully when selected."
      >
        <Preview
          className="flex-col"
          code={`<ConnectedButtonGroup aria-label="View" defaultValue={['day']} deselectable={false}>
  <ConnectedButtonGroupItem value="day">Day</ConnectedButtonGroupItem>
  <ConnectedButtonGroupItem value="week">Week</ConnectedButtonGroupItem>
  <ConnectedButtonGroupItem value="month">Month</ConnectedButtonGroupItem>
</ConnectedButtonGroup>`}
        >
          {sizes.map((size) => (
            <ConnectedButtonGroup
              key={size}
              size={size}
              aria-label="View"
              defaultValue={['week']}
              deselectable={false}
            >
              <ConnectedButtonGroupItem value="day">Day</ConnectedButtonGroupItem>
              <ConnectedButtonGroupItem value="week">Week</ConnectedButtonGroupItem>
              <ConnectedButtonGroupItem value="month">Month</ConnectedButtonGroupItem>
              <ConnectedButtonGroupItem value="year">Year</ConnectedButtonGroupItem>
            </ConnectedButtonGroup>
          ))}
        </Preview>
      </Section>

      <Section title="Connected, multiple selection">
        <Preview code='<ConnectedButtonGroup multiple variant="tonal" aria-label="Filters">…</ConnectedButtonGroup>'>
          <ConnectedButtonGroup
            multiple
            variant="tonal"
            size="md"
            aria-label="Filters"
            defaultValue={['unread']}
          >
            <ConnectedButtonGroupItem value="unread">Unread</ConnectedButtonGroupItem>
            <ConnectedButtonGroupItem value="starred">Starred</ConnectedButtonGroupItem>
            <ConnectedButtonGroupItem value="attachments">Files</ConnectedButtonGroupItem>
          </ConnectedButtonGroup>
        </Preview>
      </Section>
    </>
  );
}
