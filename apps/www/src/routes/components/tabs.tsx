import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { TabsPage } from '~/pages/tabs';

export const Route = createFileRoute('/components/tabs')({
  head: () => pageTitle('Tabs'),
  component: TabsPage,
});
