import { HeadContent, Link, Outlet } from '@tanstack/react-router';
import * as React from 'react';

import { PageHeader } from '~/components/docs';
import { DarkModeIcon, LightModeIcon } from '~/icons';
import { cn } from '@/lib/utils';
import { ToggleIconButton } from '@/registry/m3ui/ui/icon-button';

const pages = [
  { to: '/', title: 'Overview' },
  { to: '/theme', title: 'Theme' },
  { to: '/app-bar', title: 'App bars' },
  { to: '/badges', title: 'Badges' },
  { to: '/buttons', title: 'Buttons' },
  { to: '/icon-buttons', title: 'Icon buttons' },
  { to: '/button-groups', title: 'Button groups' },
  { to: '/split-button', title: 'Split button' },
  { to: '/fab', title: 'FAB' },
  { to: '/cards', title: 'Cards' },
  { to: '/checkbox', title: 'Checkbox' },
  { to: '/chips', title: 'Chips' },
  { to: '/menus', title: 'Menus' },
  { to: '/radio', title: 'Radio button' },
  { to: '/switch', title: 'Switch' },
  { to: '/tabs', title: 'Tabs' },
  { to: '/toolbar', title: 'Toolbar' },
] as const;

function useDarkMode(): [boolean, (dark: boolean) => void] {
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  const update = React.useCallback((value: boolean) => {
    document.documentElement.classList.toggle('dark', value);
    setDark(value);
  }, []);
  return [dark, update];
}

export function RootLayout(): React.JSX.Element {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="flex flex-col min-block-dvh md:flex-row">
      <HeadContent />
      <nav
        aria-label="Documentation"
        className="flex shrink-0 flex-col gap-1 bg-surface-container-low p-3 md:sticky md:inset-bs-0 md:block-dvh md:inline-72"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="type-title-large-emphasized text-on-surface">
            M3UI React
          </Link>
          <ToggleIconButton aria-label="Dark theme" pressed={dark} onPressedChange={setDark}>
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </ToggleIconButton>
        </div>
        <ul className="flex flex-row flex-wrap gap-1 md:flex-col">
          {pages.map((page) => (
            <li key={page.to}>
              <Link
                to={page.to}
                activeOptions={{ exact: true }}
                className={cn(
                  'focus-ring flex items-center rounded-full px-4 type-label-large text-on-surface-variant transition-colors block-14',
                  'hover:bg-on-surface/8 aria-[current=page]:bg-secondary-container aria-[current=page]:text-on-secondary-container',
                )}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="mx-auto flex flex-col gap-12 px-4 py-10 inline-full max-inline-5xl min-inline-0 md:px-10">
        <Outlet />
      </main>
    </div>
  );
}

export function NotFound(): React.JSX.Element {
  return (
    <PageHeader
      title="Page not found"
      description="This page doesn't exist. Pick a component from the navigation."
    />
  );
}
