import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ConnectedButtonGroupPage } from '~/pages/connected-button-group';

export const Route = createFileRoute('/components/connected-button-group')({
  head: () => pageTitle('Connected Button Group'),
  component: ConnectedButtonGroupPage,
});
