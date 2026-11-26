import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ChipPage } from '~/pages/chip';

export const Route = createFileRoute('/components/chip')({
  head: () => pageTitle('Chips'),
  component: ChipPage,
});
