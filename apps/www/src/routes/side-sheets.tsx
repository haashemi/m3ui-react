import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { SideSheetsPage } from '~/pages/side-sheets';

export const Route = createFileRoute('/side-sheets')({
  head: () => pageTitle('Side sheets'),
  component: SideSheetsPage,
});
