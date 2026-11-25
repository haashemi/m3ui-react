import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ButtonsPage } from '~/pages/buttons';

export const Route = createFileRoute('/buttons')({
  head: () => pageTitle('Buttons'),
  component: ButtonsPage,
});
