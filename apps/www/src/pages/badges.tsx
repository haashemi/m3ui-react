import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { ChatIcon, InboxIcon, MailIcon, NotificationsIcon } from '~/icons';
import { Badge, BadgeAnchor } from '@/registry/m3ui/ui/badge';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

function countLabel(count: number): string {
  return count > 999 ? '999+' : String(count);
}

export function BadgesPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Badges"
        description="Badges show notifications, counts or status on navigation items and icons. A badge with no content is a small dot; give it a number or short label and it grows into a large badge."
        item="badge"
      />

      <Section
        title="Small and large"
        description="Large badges hold up to four characters. Cap long counts yourself, like 999+."
      >
        <Preview
          code={`<Badge />
<Badge>3</Badge>
<Badge>{count > 999 ? '999+' : count}</Badge>`}
        >
          <Badge />
          <Badge>3</Badge>
          <Badge>42</Badge>
          <Badge>{countLabel(1280)}</Badge>
          <Badge>New</Badge>
        </Preview>
      </Section>

      <Section
        title="On an icon"
        description="Wrap the icon and badge in BadgeAnchor. Small badges sit in the icon's top end corner; large badges start at its center and rise 2px above it. Put the count in the control's accessible name too: the badge is only visual."
      >
        <Preview
          code={`<IconButton aria-label="Notifications, 3 new">
  <BadgeAnchor>
    <NotificationsIcon />
    <Badge>3</Badge>
  </BadgeAnchor>
</IconButton>`}
        >
          <IconButton aria-label="Mail, new messages">
            <BadgeAnchor>
              <MailIcon />
              <Badge />
            </BadgeAnchor>
          </IconButton>
          <IconButton aria-label="Notifications, 3 new">
            <BadgeAnchor>
              <NotificationsIcon />
              <Badge>3</Badge>
            </BadgeAnchor>
          </IconButton>
          <IconButton aria-label="Chat, 12 unread">
            <BadgeAnchor>
              <ChatIcon />
              <Badge>12</Badge>
            </BadgeAnchor>
          </IconButton>
          <div className="flex flex-col items-center gap-1 px-4 text-on-surface-variant">
            <BadgeAnchor>
              <InboxIcon className="fill-current block-6 inline-6" />
              <Badge>{countLabel(1280)}</Badge>
            </BadgeAnchor>
            <span className="type-label-medium">Inbox</span>
          </div>
        </Preview>
      </Section>
    </>
  );
}
