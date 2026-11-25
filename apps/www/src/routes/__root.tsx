import { createRootRoute } from '@tanstack/react-router';

import { NotFound, RootLayout } from '~/components/layout';
import { pageTitle } from '~/head';

export const Route = createRootRoute({
  head: () => pageTitle(),
  component: RootLayout,
  notFoundComponent: NotFound,
});
