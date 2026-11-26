import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { CardPage } from '~/pages/card';

export const Route = createFileRoute('/components/card')({
  head: () => pageTitle('Card'),
  component: CardPage,
});
