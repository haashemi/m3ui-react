import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { TabsPage } from '~/pages/tabs';

export const Route = createFileRoute('/tabs')({
  head: () => pageTitle('Tabs'),
  component: TabsPage,
});
