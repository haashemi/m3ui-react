import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { OverviewPage } from '~/pages/overview';

export const Route = createFileRoute('/')({
  head: () => pageTitle(),
  component: OverviewPage,
});
