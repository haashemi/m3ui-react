import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { MenusPage } from '~/pages/menus';

export const Route = createFileRoute('/menus')({
  head: () => pageTitle('Menus'),
  component: MenusPage,
});
