import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { IconButtonPage } from '~/pages/icon-button';

export const Route = createFileRoute('/components/icon-button')({
  head: () => pageTitle('Icon Button'),
  component: IconButtonPage,
});
