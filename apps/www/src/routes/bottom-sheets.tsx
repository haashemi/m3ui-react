import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { BottomSheetsPage } from '~/pages/bottom-sheets';

export const Route = createFileRoute('/bottom-sheets')({
  head: () => pageTitle('Bottom sheets'),
  component: BottomSheetsPage,
});
