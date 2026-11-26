import type * as React from 'react';

import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';

export default function ConnectedButtonGroupMultiple(): React.JSX.Element {
  return (
    <ConnectedButtonGroup
      multiple
      variant="tonal"
      size="md"
      aria-label="Filters"
      defaultValue={['unread']}
    >
      <ConnectedButtonGroupItem value="unread">Unread</ConnectedButtonGroupItem>
      <ConnectedButtonGroupItem value="starred">Starred</ConnectedButtonGroupItem>
      <ConnectedButtonGroupItem value="files">Files</ConnectedButtonGroupItem>
    </ConnectedButtonGroup>
  );
}
