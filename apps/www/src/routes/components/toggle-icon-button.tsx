import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ToggleIconButtonPage } from '~/pages/toggle-icon-button';

export const Route = createFileRoute('/components/toggle-icon-button')({
  head: () => pageTitle('Toggle Icon Button'),
  component: ToggleIconButtonPage,
});
