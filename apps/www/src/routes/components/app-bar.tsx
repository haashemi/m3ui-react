import { createFileRoute } from '@tanstack/react-router';

import { AppBarPage } from '~/pages/app-bar';
import { pageTitle } from '~/head';

export const Route = createFileRoute('/components/app-bar')({
  head: () => pageTitle('App bars'),
  component: AppBarPage,
});
