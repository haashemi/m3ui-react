import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { SwitchPage } from '~/pages/switch';

export const Route = createFileRoute('/components/switch')({
  head: () => pageTitle('Switch'),
  component: SwitchPage,
});
