import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ButtonsPage } from '~/pages/button';

export const Route = createFileRoute('/components/button')({
  head: () => pageTitle('Buttons'),
  component: ButtonsPage,
});
