import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { GettingStartedPage } from '~/pages/getting-started';

export const Route = createFileRoute('/')({
  head: () => pageTitle(),
  component: GettingStartedPage,
});
