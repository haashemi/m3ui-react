import { HeadContent, Link, Outlet, useLocation } from '@tanstack/react-router';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/react/collapsible';
import * as React from 'react';

import { PageHeader } from '~/components/docs';
import { ArrowDropDownIcon, CloseIcon, DarkModeIcon, LightModeIcon, MenuIcon } from '~/icons';
import { cn } from '@/lib/utils';
import { componentNav, isGroup, type NavGroup, type NavLink, sectionLinks } from '~/nav';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { Button, buttonVariants, toggleButtonVariants } from '@/registry/m3ui/ui/button';
import { IconButton, ToggleIconButton } from '@/registry/m3ui/ui/icon-button';
import { Ripple } from '@/registry/m3ui/ui/ripple';
import {
  SideSheet,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  StandardSideSheet,
} from '@/registry/m3ui/ui/side-sheet';

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

function useIsActive(): (item: NavLink) => boolean {
  const { pathname, hash } = useLocation();
  return React.useCallback(
    (item: NavLink) => item.to === pathname && (item.hash ?? '') === hash,
    [pathname, hash],
  );
}

const navButtonClass = cn(
  buttonVariants({ variant: 'text', size: 'sm' }),
  'inline-full not-data-pressed:text-on-surface-variant',
);

const navLinkClass = cn(
  navButtonClass,
  toggleButtonVariants({ variant: 'tonal' }),
  'justify-start',
);

const navGroupClass = cn(
  navButtonClass,
  'justify-between [&_svg]:transition-transform data-open:[&_svg]:rotate-180 motion-reduce:[&_svg]:transition-none',
);

function NavItem({
  item,
  active,
  onNavigate,
}: {
  item: NavLink;
  active: boolean;
  onNavigate: (() => void) | undefined;
}): React.JSX.Element {
  if (!item.to) {
    return (
      <Button variant="text" disabled className="justify-start inline-full">
        {item.title}
      </Button>
    );
  }
  return (
    <Link
      to={item.to}
      {...(item.hash ? { hash: item.hash } : {})}
      data-pressed={active ? '' : undefined}
      activeOptions={{ exact: true, includeHash: true }}
      onClick={onNavigate}
      className={navLinkClass}
    >
      <Ripple />
      {item.title}
    </Link>
  );
}

function NavGroupItem({
  group,
  isActive,
  onNavigate,
}: {
  group: NavGroup;
  isActive: (item: NavLink) => boolean;
  onNavigate: (() => void) | undefined;
}): React.JSX.Element {
  const containsActive = group.items.some(isActive);
  const [open, setOpen] = React.useState(containsActive);
  const [prevActive, setPrevActive] = React.useState(containsActive);
  if (prevActive !== containsActive) {
    setPrevActive(containsActive);
    if (containsActive) setOpen(true);
  }
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className={navGroupClass}>
        <Ripple />
        {group.title}
        <ArrowDropDownIcon />
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <ul className="flex flex-col gap-1 ps-4 pbs-1">
          {group.items.map((item) => (
            <li key={item.title}>
              <NavItem item={item} active={isActive(item)} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </CollapsiblePanel>
    </Collapsible>
  );
}

function NavHeading({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <h2 className="px-4 pbs-4 pbe-2 type-title-small text-on-surface-variant">{children}</h2>;
}

function NavList({ onNavigate }: { onNavigate?: () => void }): React.JSX.Element {
  const isActive = useIsActive();
  return (
    <div className="flex flex-col">
      <NavHeading>Sections</NavHeading>
      <ul className="flex flex-col gap-1">
        {sectionLinks.map((item) => (
          <li key={item.to}>
            <NavItem item={item} active={isActive(item)} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <NavHeading>Components</NavHeading>
      <ul className="flex flex-col gap-1">
        {componentNav.map((entry) => (
          <li key={entry.title}>
            {isGroup(entry) ? (
              <NavGroupItem group={entry} isActive={isActive} onNavigate={onNavigate} />
            ) : (
              <NavItem item={entry} active={isActive(entry)} onNavigate={onNavigate} />
            )}
          </li>
        ))}
      </ul>
    </div>
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
