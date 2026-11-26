import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { FloatingToolbarPage } from '~/pages/floating-toolbar';

export const Route = createFileRoute('/components/floating-toolbar')({
  head: () => pageTitle('Floating Toolbar'),
  component: FloatingToolbarPage,
});
