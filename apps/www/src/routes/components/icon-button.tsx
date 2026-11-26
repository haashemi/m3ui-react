import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { IconButtonsPage } from '~/pages/icon-button';

export const Route = createFileRoute('/components/icon-button')({
  head: () => pageTitle('Icon buttons'),
  component: IconButtonsPage,
});
