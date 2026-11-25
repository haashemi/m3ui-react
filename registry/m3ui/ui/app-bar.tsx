'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

type AppBarScrollBehavior = 'pinned' | 'enter-always' | 'exit-until-collapsed';
type AppBarSize = 'small' | 'medium' | 'large';
type AppBarAlign = 'start' | 'center';

const COLLAPSED_HEIGHT = 64;
const LIFT_THRESHOLD = 0.01;

function cubicBezier([x1, y1, x2, y2]: readonly [number, number, number, number]) {
  const sample = (a: number, b: number, t: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let low = 0;
    let high = 1;
    for (let step = 0; step < 20; step++) {
      const mid = (low + high) / 2;
      if (sample(x1, x2, mid) < x) low = mid;
      else high = mid;
    }
    return sample(y1, y2, (low + high) / 2);
  };
}

const topTitleOpacity = cubicBezier([0.8, 0, 0.8, 0.15]);

function findScrollContainer(element: HTMLElement): HTMLElement | Window {
  let parent = element.parentElement;
  while (parent && parent !== document.body && parent !== document.documentElement) {
    const { overflowY } = getComputedStyle(parent);
    if (overflowY !== 'visible' && overflowY !== 'clip') return parent;
    parent = parent.parentElement;
  }
  return window;
}

function scrollTopOf(container: HTMLElement | Window) {
  return container instanceof Window ? container.scrollY : container.scrollTop;
}

function useAppBarScroll(
  rowRef: React.RefObject<HTMLElement | null>,
  {
    behavior,
    twoRows,
    scrollTarget,
    controlled,
  }: {
    behavior: AppBarScrollBehavior;
    twoRows: boolean;
    scrollTarget: React.RefObject<HTMLElement | null> | undefined;
    controlled: boolean;
  },
) {
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const bar = rowRef.current?.parentElement;
    if (!bar) return undefined;
    const container = scrollTarget?.current ?? findScrollContainer(bar);
    const collapses = twoRows && behavior === 'exit-until-collapsed';
    let distance = 0;
    let height = 0;
    let offset = 0;
    let previous = scrollTopOf(container);

    const setOffset = (value: number) => {
      offset = value;
      bar.style.setProperty('--app-bar-offset', `${value}px`);
    };

    const update = () => {
      const top = Math.max(scrollTopOf(container), 0);
      const delta = top - previous;
      previous = top;

      if (behavior === 'enter-always') {
        bar.removeAttribute('data-settling');
        setOffset(Math.min(Math.max(offset - delta, -height), 0));
      }

      if (collapses) {
        const fraction = distance > 0 ? Math.min(top / distance, 1) : 0;
        bar.style.setProperty('--app-bar-collapse', String(fraction));
        bar.style.setProperty('--app-bar-shift', `${fraction * distance}px`);
        bar.style.setProperty('--app-bar-top-title-opacity', String(topTitleOpacity(fraction)));
        setCollapsed(fraction >= 0.5);
      } else if (!controlled) {
        bar.toggleAttribute('data-scrolled', top > LIFT_THRESHOLD);
      }
    };

    const measure = () => {
      height = bar.offsetHeight;
      distance = twoRows ? Math.max(height - COLLAPSED_HEIGHT, 0) : 0;
      if (collapses) setOffset(-distance);
      update();
    };

    const settle = () => {
      if (behavior === 'enter-always' && offset < 0 && offset > -height) {
        bar.setAttribute('data-settling', '');
        setOffset(offset > -height / 2 ? 0 : -height);
      }
      if (!collapses) return;
      const top = scrollTopOf(container);
      if (top > 0 && top < distance) {
        container.scrollTo({ top: top < distance / 2 ? 0 : distance, behavior: 'smooth' });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    container.addEventListener('scroll', update, { passive: true });
    container.addEventListener('scrollend', settle);
    return () => {
      observer.disconnect();
      container.removeEventListener('scroll', update);
      container.removeEventListener('scrollend', settle);
      if (!controlled) bar.removeAttribute('data-scrolled');
      bar.removeAttribute('data-settling');
      for (const name of [
        '--app-bar-offset',
        '--app-bar-collapse',
        '--app-bar-shift',
        '--app-bar-top-title-opacity',
      ]) {
        bar.style.removeProperty(name);
      }
    };
  }, [rowRef, behavior, twoRows, scrollTarget, controlled]);

  return collapsed;
}

const appBarVariants = cva(
  [
    'group/app-bar sticky inset-bs-(--app-bar-offset,0px) z-10 flex flex-col inline-full',
    'data-settling:[transition:top_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial),background-color_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)]',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      collapsing: {
        true: 'bg-[color-mix(in_srgb,var(--md-sys-color-surface-container)_calc(var(--app-bar-collapse,0)*100%),var(--md-sys-color-surface))] data-scrolled:bg-surface-container',
        false:
          'bg-surface [transition:background-color_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)] data-scrolled:bg-surface-container',
      },
    },
    defaultVariants: { collapsing: false },
  },
);

const appBarTitleVariants = cva('flex flex-col justify-center min-inline-0', {
  variants: {
    size: {
      small:
        '[&>[data-slot=app-bar-headline]]:type-title-large [&>[data-slot=app-bar-subtitle]]:type-label-medium',
      medium:
        'gap-1 [&>[data-slot=app-bar-headline]]:type-headline-medium [&>[data-slot=app-bar-subtitle]]:type-label-large',
      large:
        'gap-2 [&>[data-slot=app-bar-headline]]:type-display-small [&>[data-slot=app-bar-subtitle]]:type-title-medium',
    },
  },
  defaultVariants: { size: 'small' },
});

function AppBarText({
  size,
  title,
  subtitle,
  truncate,
  className,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> & {
  size: AppBarSize;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  truncate: boolean;
}) {
  return (
    <div
      data-slot="app-bar-title"
      className={cn(
        appBarTitleVariants({ size }),
        'group-data-[align=center]/app-bar:items-center group-data-[align=center]/app-bar:text-center',
        className,
      )}
      {...props}
    >
      <div data-slot="app-bar-headline" className={cn('text-on-surface', truncate && 'truncate')}>
        {title}
      </div>
      {subtitle ? (
        <div
          data-slot="app-bar-subtitle"
          className={cn('text-on-surface-variant', truncate && 'truncate')}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

function AppBarRow({
  ref,
  centered,
  leading,
  trailing,
  children,
}: {
  ref: React.Ref<HTMLDivElement>;
  centered: boolean;
  leading: React.ReactNode;
  trailing: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={ref}
      data-slot="app-bar-row"
      className={cn(
        'relative z-1 grid shrink-0 translate-y-(--app-bar-shift,0px) items-center bg-inherit px-1 block-16',
        centered ? 'grid-cols-[1fr_minmax(0,auto)_1fr]' : 'grid-cols-[auto_minmax(0,1fr)_auto]',
      )}
    >
      <div
        data-slot="app-bar-leading"
        className="flex items-center gap-2 px-1 empty:p-0 *:data-[variant=standard]:not-data-pressed:text-on-surface"
      >
        {leading}
      </div>
      {children}
      <div
        data-slot="app-bar-trailing"
        className="flex items-center justify-end gap-2 px-1 empty:p-0"
      >
        {trailing}
      </div>
    </div>
  );
}

function AppBarRowContent({
  twoRows,
  collapsing,
  collapsed,
  hasLeading,
  title,
  subtitle,
  children,
}: {
  twoRows: boolean;
  collapsing: boolean;
  collapsed: boolean;
  hasLeading: boolean;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}) {
  if (children !== undefined && children !== null) {
    return (
      <div
        data-slot="app-bar-content"
        className="flex items-center px-1 min-inline-0 group-data-[align=center]/app-bar:justify-center"
      >
        {children}
      </div>
    );
  }
  if (!title || (twoRows && !collapsing)) return <div />;
  return (
    <AppBarText
      size="small"
      title={title}
      subtitle={twoRows ? undefined : subtitle}
      truncate
      aria-hidden={twoRows && !collapsed ? true : undefined}
      className={cn(
        'px-1',
        !hasLeading && 'group-data-[align=start]/app-bar:ps-4',
        twoRows && 'opacity-(--app-bar-top-title-opacity,0)',
      )}
    />
  );
}

function AppBar({
  className,
  size = 'small',
  align = 'start',
  title,
  subtitle,
  leading,
  trailing,
  children,
  scrollBehavior,
  scrollTarget,
  scrolled,
  ...props
}: Omit<React.ComponentProps<'header'>, 'title'> & {
  size?: AppBarSize;
  align?: AppBarAlign;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  scrollBehavior?: AppBarScrollBehavior;
  scrollTarget?: React.RefObject<HTMLElement | null>;
  scrolled?: boolean;
}) {
  const twoRows = size !== 'small';
  const behavior = scrollBehavior ?? (twoRows ? 'exit-until-collapsed' : 'pinned');
  const collapsing = twoRows && behavior === 'exit-until-collapsed';
  const rowRef = React.useRef<HTMLDivElement>(null);
  const collapsed = useAppBarScroll(rowRef, {
    behavior,
    twoRows,
    scrollTarget,
    controlled: scrolled !== undefined,
  });

  return (
    <header
      data-slot="app-bar"
      data-size={size}
      data-align={align}
      data-scroll-behavior={behavior}
      data-scrolled={scrolled ? '' : undefined}
      className={cn(appBarVariants({ collapsing }), className)}
      {...props}
    >
      <AppBarRow
        ref={rowRef}
        centered={align === 'center' && (children === undefined || children === null)}
        leading={leading}
        trailing={trailing}
      >
        <AppBarRowContent
          twoRows={twoRows}
          collapsing={collapsing}
          collapsed={collapsed}
          hasLeading={Boolean(leading)}
          title={title}
          subtitle={subtitle}
        >
          {children}
        </AppBarRowContent>
      </AppBarRow>
      {twoRows && title ? (
        <AppBarText
          size={size}
          title={title}
          subtitle={subtitle}
          truncate={false}
          aria-hidden={collapsed ? true : undefined}
          className="px-4 pbe-3 wrap-anywhere opacity-[calc(1-var(--app-bar-collapse,0))]"
        />
      ) : null}
    </header>
  );
}

function AppBarSearch({
  className,
  trailing,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> & {
  trailing?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="app-bar-search"
      className={cn(
        'relative mx-1 flex flex-1 items-center overflow-hidden rounded-full bg-surface-container block-14 min-inline-0',
        'group-data-scrolled/app-bar:bg-surface-container-highest',
        '[transition:background-color_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)] motion-reduce:transition-none',
        className,
      )}
    >
      <ButtonPrimitive
        className={cn(
          'relative focus-ring flex cursor-pointer items-center rounded-full ps-6 text-start type-body-large text-on-surface-variant select-none block-full inline-full',
          'group-data-[align=center]/app-bar:justify-center group-data-[align=center]/app-bar:px-14',
          trailing ? 'pe-14' : 'pe-6',
        )}
        {...props}
      >
        <Ripple />
        <span className="truncate">{children}</span>
      </ButtonPrimitive>
      {trailing ? (
        <div
          data-slot="app-bar-search-trailing"
          className="absolute inset-e-1 flex items-center gap-2 px-1"
        >
          {trailing}
        </div>
      ) : null}
    </div>
  );
}

export { AppBar, AppBarSearch, appBarVariants };
export type { AppBarScrollBehavior };
