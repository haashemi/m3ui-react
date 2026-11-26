import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ToggleButtonPage } from '~/pages/toggle-button';

export const Route = createFileRoute('/components/toggle-button')({
  head: () => pageTitle('Toggle Button'),
  component: ToggleButtonPage,
});
