import * as React from 'react';

import { NotificationsIcon } from '~/icons';
import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

export default function ToggleButtonControlled(): React.JSX.Element {
  const [following, setFollowing] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleButton variant="tonal" pressed={following} onPressedChange={setFollowing}>
        <NotificationsIcon />
        {following ? 'Following' : 'Follow'}
      </ToggleButton>
      <p className="type-body-medium text-on-surface-variant">
        {following ? 'You get updates from this channel.' : 'You don’t get updates.'}
      </p>
    </div>
  );
}
