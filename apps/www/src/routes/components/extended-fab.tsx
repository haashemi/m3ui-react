import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ExtendedFabPage } from '~/pages/extended-fab';

export const Route = createFileRoute('/components/extended-fab')({
  head: () => pageTitle('Extended FAB'),
  component: ExtendedFabPage,
});
