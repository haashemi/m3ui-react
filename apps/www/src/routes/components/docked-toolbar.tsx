import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { DockedToolbarPage } from '~/pages/docked-toolbar';

export const Route = createFileRoute('/components/docked-toolbar')({
  head: () => pageTitle('Docked Toolbar'),
  component: DockedToolbarPage,
});
