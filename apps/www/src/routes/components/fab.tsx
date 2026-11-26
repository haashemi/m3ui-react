import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { FabPage } from '~/pages/fab';

export const Route = createFileRoute('/components/fab')({
  head: () => pageTitle('FAB'),
  component: FabPage,
});
