import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { BadgePage } from '~/pages/badge';

export const Route = createFileRoute('/components/badge')({
  head: () => pageTitle('Badge'),
  component: BadgePage,
});
