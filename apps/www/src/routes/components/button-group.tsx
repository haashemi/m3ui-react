import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ButtonGroupsPage } from '~/pages/button-group';

export const Route = createFileRoute('/components/button-group')({
  head: () => pageTitle('Button groups'),
  component: ButtonGroupsPage,
});
