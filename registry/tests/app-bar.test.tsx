import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

import { AppBar, AppBarSearch } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

function barHeight(this: HTMLElement, height: number) {
  return this.dataset['slot'] === 'app-bar' ? height : 0;
}

function mockBarHeight(height: number) {
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function offsetHeight(
    this: HTMLElement,
  ) {
    return barHeight.call(this, height);
  });
}

function Scroller({
  children,
}: {
  children: (ref: React.RefObject<HTMLDivElement | null>) => React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} data-testid="scroller">
      {children(ref)}
    </div>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

function scrollTo(container: HTMLElement, top: number) {
  act(() => {
    container.scrollTop = top;
    fireEvent.scroll(container);
  });
}

describe(AppBar, () => {
  it('renders a banner with the title, leading and trailing actions', () => {
    render(
      <AppBar
        title="Inbox"
        subtitle="3 unread"
        leading={<IconButton aria-label="Back">←</IconButton>}
        trailing={<IconButton aria-label="Search">⌕</IconButton>}
      />,
    );
    const bar = screen.getByRole('banner');
    expect(bar.dataset['size']).toBe('small');
    expect(bar.dataset['scrollBehavior']).toBe('pinned');
    expect(bar.className).toContain('bg-surface');
    expect(screen.getByText('Inbox').className).toContain('truncate');
    expect(screen.getByText('3 unread').dataset['slot']).toBe('app-bar-subtitle');
    expect(screen.getByRole('button', { name: 'Back' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Search' })).toBeDefined();
  });

  it('lifts when its scroll container scrolls', () => {
    render(<Scroller>{(ref) => <AppBar scrollTarget={ref} title="Inbox" />}</Scroller>);
    const bar = screen.getByRole('banner');
    expect(bar.dataset['scrolled']).toBeUndefined();
    scrollTo(screen.getByTestId('scroller'), 40);
    expect(bar.dataset['scrolled']).toBe('');
    scrollTo(screen.getByTestId('scroller'), 0);
    expect(bar.dataset['scrolled']).toBeUndefined();
  });

  it('respects a controlled scrolled state', () => {
    render(
      <Scroller>{(ref) => <AppBar scrollTarget={ref} title="Inbox" scrolled={false} />}</Scroller>,
    );
    scrollTo(screen.getByTestId('scroller'), 40);
    expect(screen.getByRole('banner').dataset['scrolled']).toBeUndefined();
  });

  it('renders flexible bars with an expanded title and a hidden collapsed copy', () => {
    render(<AppBar size="large" title="Inbox" subtitle="24 messages" />);
    const bar = screen.getByRole('banner');
    expect(bar.dataset['scrollBehavior']).toBe('exit-until-collapsed');
    const titles = screen.getAllByText('Inbox');
    expect(titles).toHaveLength(2);
    expect(titles[0]?.closest('[aria-hidden]')).not.toBeNull();
    expect(titles[1]?.closest('[aria-hidden]')).toBeNull();
    expect(titles[1]?.parentElement?.className).toContain(
      '[&>[data-slot=app-bar-headline]]:type-display-small',
    );
  });

  it('collapses a flexible bar as its container scrolls', () => {
    mockBarHeight(112);
    render(
      <Scroller>{(ref) => <AppBar scrollTarget={ref} size="medium" title="Inbox" />}</Scroller>,
    );
    const bar = screen.getByRole('banner');
    expect(bar.style.getPropertyValue('--app-bar-offset')).toBe('-48px');

    scrollTo(screen.getByTestId('scroller'), 12);
    expect(bar.style.getPropertyValue('--app-bar-collapse')).toBe('0.25');
    const [top, expanded] = screen.getAllByText('Inbox');
    expect(top?.closest('[aria-hidden]')).not.toBeNull();

    scrollTo(screen.getByTestId('scroller'), 48);
    expect(bar.style.getPropertyValue('--app-bar-collapse')).toBe('1');
    expect(bar.style.getPropertyValue('--app-bar-top-title-opacity')).toBe('1');
    expect(top?.closest('[aria-hidden]')).toBeNull();
    expect(expanded?.closest('[aria-hidden]')).not.toBeNull();
  });

  it('hides on scroll down and returns on scroll up with enter-always', () => {
    mockBarHeight(64);
    render(
      <Scroller>
        {(ref) => <AppBar scrollTarget={ref} title="Inbox" scrollBehavior="enter-always" />}
      </Scroller>,
    );
    const bar = screen.getByRole('banner');
    const scroller = screen.getByTestId('scroller');
    scrollTo(scroller, 200);
    expect(bar.style.getPropertyValue('--app-bar-offset')).toBe('-64px');
    scrollTo(scroller, 180);
    expect(bar.style.getPropertyValue('--app-bar-offset')).toBe('-44px');
    act(() => {
      fireEvent(scroller, new Event('scrollend'));
    });
    expect(bar.style.getPropertyValue('--app-bar-offset')).toBe('-64px');
    expect(bar.dataset['settling']).toBe('');
  });

  it('renders only one title when a flexible bar is pinned', () => {
    render(<AppBar size="medium" scrollBehavior="pinned" title="Inbox" />);
    expect(screen.getAllByText('Inbox')).toHaveLength(1);
  });

  it('centers the title', () => {
    render(<AppBar align="center" title="Inbox" />);
    expect(screen.getByRole('banner').dataset['align']).toBe('center');
  });
});

describe(AppBarSearch, () => {
  it('renders a search button with a ripple and trailing actions', () => {
    let opened = false;
    render(
      <AppBar>
        <AppBarSearch
          onClick={() => {
            opened = true;
          }}
          trailing={<IconButton aria-label="Voice search">🎤</IconButton>}
        >
          Search messages
        </AppBarSearch>
      </AppBar>,
    );
    const search = screen.getByRole('button', { name: 'Search messages' });
    expect(search.querySelector('[data-slot=ripple]')).not.toBeNull();
    fireEvent.click(search);
    expect(opened).toBe(true);
    expect(screen.getByRole('button', { name: 'Voice search' })).toBeDefined();
  });
});
