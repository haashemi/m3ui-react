import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { CardsPage } from '~/pages/card';

export const Route = createFileRoute('/components/card')({
  head: () => pageTitle('Cards'),
  component: CardsPage,
});
