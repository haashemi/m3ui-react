import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { RadioPage } from '~/pages/radio';

export const Route = createFileRoute('/components/radio')({
  head: () => pageTitle('Radio button'),
  component: RadioPage,
});
