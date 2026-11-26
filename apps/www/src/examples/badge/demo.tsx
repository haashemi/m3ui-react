import type * as React from 'react';

import { MailIcon, NotificationsIcon } from '~/icons';
import { Badge, BadgeAnchor } from '@/registry/m3ui/ui/badge';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function BadgeDemo(): React.JSX.Element {
  return (
    <>
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
    </>
  );
}
