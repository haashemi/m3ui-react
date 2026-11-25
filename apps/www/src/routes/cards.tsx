import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { CardsPage } from '~/pages/cards';

export const Route = createFileRoute('/cards')({
  head: () => pageTitle('Cards'),
  component: CardsPage,
});
