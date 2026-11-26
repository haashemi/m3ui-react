import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { BadgesPage } from '~/pages/badge';

export const Route = createFileRoute('/components/badge')({
  head: () => pageTitle('Badges'),
  component: BadgesPage,
});
