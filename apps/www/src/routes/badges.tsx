import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { BadgesPage } from '~/pages/badges';

export const Route = createFileRoute('/badges')({
  head: () => pageTitle('Badges'),
  component: BadgesPage,
});
