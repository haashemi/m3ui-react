import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { IconButtonsPage } from '~/pages/icon-buttons';

export const Route = createFileRoute('/icon-buttons')({
  head: () => pageTitle('Icon buttons'),
  component: IconButtonsPage,
});
