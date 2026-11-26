import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { MenuPage } from '~/pages/menu';

export const Route = createFileRoute('/components/menu')({
  head: () => pageTitle('Menu'),
  component: MenuPage,
});
