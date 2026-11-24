import * as React from 'react';

import { DarkModeIcon, LightModeIcon } from '~/icons';
import { Link } from '~/components/link';
import { usePath } from '~/router';
import { cn } from '@/lib/utils';
import { ToggleIconButton } from '@/registry/m3ui/ui/icon-button';

const lazyPage = (load: () => Promise<React.ComponentType>) =>
  React.lazy(async () => ({ default: await load() }));

const pages = [
  {
    path: '',
    title: 'Overview',
    Page: lazyPage(async () => (await import('~/pages/overview')).OverviewPage),
  },
  {
    path: 'theme',
    title: 'Theme',
    Page: lazyPage(async () => (await import('~/pages/theme')).ThemePage),
  },
  {
    path: 'buttons',
    title: 'Buttons',
    Page: lazyPage(async () => (await import('~/pages/buttons')).ButtonsPage),
  },
  {
    path: 'icon-buttons',
    title: 'Icon buttons',
    Page: lazyPage(async () => (await import('~/pages/icon-buttons')).IconButtonsPage),
  },
  {
    path: 'button-groups',
    title: 'Button groups',
    Page: lazyPage(async () => (await import('~/pages/button-groups')).ButtonGroupsPage),
  },
  {
    path: 'split-button',
    title: 'Split button',
    Page: lazyPage(async () => (await import('~/pages/split-button')).SplitButtonPage),
  },
  { path: 'fab', title: 'FAB', Page: lazyPage(async () => (await import('~/pages/fab')).FabPage) },
  {
    path: 'checkbox',
    title: 'Checkbox',
    Page: lazyPage(async () => (await import('~/pages/checkbox')).CheckboxPage),
  },
  {
    path: 'chips',
    title: 'Chips',
    Page: lazyPage(async () => (await import('~/pages/chips')).ChipsPage),
  },
  {
    path: 'radio',
    title: 'Radio button',
    Page: lazyPage(async () => (await import('~/pages/radio')).RadioPage),
  },
  {
    path: 'switch',
    title: 'Switch',
    Page: lazyPage(async () => (await import('~/pages/switch')).SwitchPage),
  },
  {
    path: 'tabs',
    title: 'Tabs',
    Page: lazyPage(async () => (await import('~/pages/tabs')).TabsPage),
  },
  {
    path: 'toolbar',
    title: 'Toolbar',
    Page: lazyPage(async () => (await import('~/pages/toolbar')).ToolbarPage),
  },
];

function useDarkMode(): [boolean, (dark: boolean) => void] {
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  const update = React.useCallback((value: boolean) => {
    document.documentElement.classList.toggle('dark', value);
    setDark(value);
  }, []);
  return [dark, update];
}

export function App(): React.JSX.Element {
  const path = usePath();
  const [dark, setDark] = useDarkMode();
  const current = pages.find((page) => page.path === path) ?? pages[0];

  React.useEffect(() => {
    document.title = current ? `${current.title} · M3UI React` : 'M3UI React';
  }, [current]);

  return (
    <div className="flex flex-col min-block-dvh md:flex-row">
      <nav
        aria-label="Documentation"
        className="flex shrink-0 flex-col gap-1 bg-surface-container-low p-3 md:sticky md:inset-bs-0 md:block-dvh md:inline-72"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="" className="type-title-large-emphasized text-on-surface">
            M3UI React
          </Link>
          <ToggleIconButton aria-label="Dark theme" pressed={dark} onPressedChange={setDark}>
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </ToggleIconButton>
        </div>
        <ul className="flex flex-row flex-wrap gap-1 md:flex-col">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                to={page.path}
                aria-current={page.path === current?.path ? 'page' : undefined}
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
        <React.Suspense fallback={null}>{current ? <current.Page /> : null}</React.Suspense>
      </main>
    </div>
  );
}
