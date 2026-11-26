import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ButtonPage } from '~/pages/button';

export const Route = createFileRoute('/components/button')({
  head: () => pageTitle('Button'),
  component: ButtonPage,
});
