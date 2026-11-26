import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { MenusPage } from '~/pages/menu';

export const Route = createFileRoute('/components/menu')({
  head: () => pageTitle('Menus'),
  component: MenusPage,
});
