import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ChipsPage } from '~/pages/chips';

export const Route = createFileRoute('/chips')({
  head: () => pageTitle('Chips'),
  component: ChipsPage,
});
