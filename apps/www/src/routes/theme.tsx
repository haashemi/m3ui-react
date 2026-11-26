import { createFileRoute } from '@tanstack/react-router';

import { pageTitle } from '~/head';
import { ThemePage } from '~/pages/theme';

export const Route = createFileRoute('/theme')({
  head: () => pageTitle('Theming'),
  component: ThemePage,
});
