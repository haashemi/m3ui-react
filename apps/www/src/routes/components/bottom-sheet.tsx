import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { BottomSheetPage } from '~/pages/bottom-sheet';

export const Route = createFileRoute('/components/bottom-sheet')({
  head: () => pageTitle('Bottom Sheet'),
  component: BottomSheetPage,
});
