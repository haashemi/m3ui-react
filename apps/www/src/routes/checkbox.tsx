import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { CheckboxPage } from '~/pages/checkbox';

export const Route = createFileRoute('/checkbox')({
  head: () => pageTitle('Checkbox'),
  component: CheckboxPage,
});
