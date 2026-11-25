import { HeadContent, Link, Outlet } from '@tanstack/react-router';
import * as React from 'react';

import { PageHeader } from '~/components/docs';
import { CloseIcon, DarkModeIcon, LightModeIcon, MenuIcon } from '~/icons';
import { cn } from '@/lib/utils';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton, ToggleIconButton } from '@/registry/m3ui/ui/icon-button';
import {
  SideSheet,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  StandardSideSheet,
} from '@/registry/m3ui/ui/side-sheet';

const pages = [
  { to: '/', title: 'Overview' },
  { to: '/theme', title: 'Theme' },
  { to: '/app-bar', title: 'App bars' },
  { to: '/badges', title: 'Badges' },
  { to: '/bottom-sheets', title: 'Bottom sheets' },
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
  { to: '/side-sheets', title: 'Side sheets' },
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

const wideQuery = '(min-width: 48rem)';

function subscribeWide(onChange: () => void): () => void {
  const query = window.matchMedia(wideQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function useWide(): boolean {
  return React.useSyncExternalStore(subscribeWide, () => window.matchMedia(wideQuery).matches);
}

function NavList({ onNavigate }: { onNavigate?: () => void }): React.JSX.Element {
  return (
    <ul className="flex flex-col gap-1">
      {pages.map((page) => (
        <li key={page.to}>
          <Link
            to={page.to}
            activeOptions={{ exact: true }}
            onClick={onNavigate}
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
  );
}

export function RootLayout(): React.JSX.Element {
  const [dark, setDark] = useDarkMode();
  const wide = useWide();
  const [docked, setDocked] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const mainRef = React.useRef<HTMLElement>(null);
  const closeDrawer = React.useCallback(() => setDrawerOpen(false), []);
  const navOpen = wide ? docked : drawerOpen;

  return (
    <div className="flex flex-col block-dvh">
      <HeadContent />
      <AppBar
        scrollTarget={mainRef}
        title={<Link to="/">M3UI React</Link>}
        leading={
          <IconButton
            aria-label="Navigation"
            aria-expanded={navOpen}
            onClick={() => (wide ? setDocked((value) => !value) : setDrawerOpen(true))}
          >
            <MenuIcon />
          </IconButton>
        }
        trailing={
          <ToggleIconButton aria-label="Dark theme" pressed={dark} onPressedChange={setDark}>
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </ToggleIconButton>
        }
      />
      <div className="flex flex-1 min-block-0">
        {wide ? (
          <StandardSideSheet
            side="start"
            aria-label="Documentation"
            open={docked}
            onOpenChange={setDocked}
          >
            <SideSheetBody>
              <nav aria-label="Documentation" className="-mx-3">
                <NavList />
              </nav>
            </SideSheetBody>
          </StandardSideSheet>
        ) : (
          <SideSheet side="start" open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SideSheetContent>
              <SideSheetHeader>
                <SideSheetTitle>M3UI React</SideSheetTitle>
                <SideSheetClose aria-label="Close navigation">
                  <CloseIcon />
                </SideSheetClose>
              </SideSheetHeader>
              <SideSheetBody>
                <nav aria-label="Documentation" className="-mx-3">
                  <NavList onNavigate={closeDrawer} />
                </nav>
              </SideSheetBody>
            </SideSheetContent>
          </SideSheet>
        )}
        <main id="main" ref={mainRef} className="relative flex-1 overflow-y-auto min-inline-0">
          <div className="mx-auto flex flex-col gap-12 px-4 py-10 max-inline-5xl md:px-10">
            <Outlet />
          </div>
        </main>
      </div>
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
