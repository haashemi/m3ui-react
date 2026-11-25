import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ButtonGroupsPage } from '~/pages/button-groups';

export const Route = createFileRoute('/button-groups')({
  head: () => pageTitle('Button groups'),
  component: ButtonGroupsPage,
});
