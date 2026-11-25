import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { SplitButtonPage } from '~/pages/split-button';

export const Route = createFileRoute('/split-button')({
  head: () => pageTitle('Split button'),
  component: SplitButtonPage,
});
