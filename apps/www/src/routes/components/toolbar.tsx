import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ToolbarPage } from '~/pages/toolbar';

export const Route = createFileRoute('/components/toolbar')({
  head: () => pageTitle('Toolbar'),
  component: ToolbarPage,
});
