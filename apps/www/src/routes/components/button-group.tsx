import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ButtonGroupPage } from '~/pages/button-group';

export const Route = createFileRoute('/components/button-group')({
  head: () => pageTitle('Button Group'),
  component: ButtonGroupPage,
});
