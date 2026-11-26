import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { SideSheetPage } from '~/pages/side-sheet';

export const Route = createFileRoute('/components/side-sheet')({
  head: () => pageTitle('Side Sheet'),
  component: SideSheetPage,
});
