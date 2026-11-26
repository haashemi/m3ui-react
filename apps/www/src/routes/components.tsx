import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ComponentsPage } from '~/pages/components';

export const Route = createFileRoute('/components')({
  head: () => pageTitle('Components'),
  component: ComponentsPage,
});
