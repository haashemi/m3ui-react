import type * as React from 'react';

import { ChatIcon, MailIcon, NotificationsIcon } from '~/icons';
import { Badge, BadgeAnchor } from '@/registry/m3ui/ui/badge';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function BadgeIconButtons(): React.JSX.Element {
  return (
    <>
      <IconButton variant="tonal" aria-label="Mail, new messages">
        <BadgeAnchor>
          <MailIcon />
          <Badge />
        </BadgeAnchor>
      </IconButton>
      <IconButton variant="tonal" aria-label="Notifications, 3 new">
        <BadgeAnchor>
          <NotificationsIcon />
          <Badge>3</Badge>
        </BadgeAnchor>
      </IconButton>
      <IconButton variant="tonal" aria-label="Chat, 12 unread">
        <BadgeAnchor>
          <ChatIcon />
          <Badge>12</Badge>
        </BadgeAnchor>
      </IconButton>
    </>
  );
}
