import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { SideSheetsPage } from '~/pages/side-sheet';

export const Route = createFileRoute('/components/side-sheet')({
  head: () => pageTitle('Side sheets'),
  component: SideSheetsPage,
});
