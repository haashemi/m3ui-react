'use client';

import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsTab as TabsTabPrimitive,
  TabsTabIcon as TabsTabIconPrimitive,
} from '@ui-sdk/react/tabs';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

type TabsVariant = 'primary' | 'secondary';
type TabsIconLayout = 'inline' | 'stacked';

interface IndicatorTracker {
  activate: (indicator: HTMLElement) => HTMLElement | undefined;
}

function createIndicatorTracker(): IndicatorTracker {
  let active: HTMLElement | undefined = undefined;
  return {
    activate: (indicator) => {
      const previous = active;
      active = indicator;
      return previous;
    },
  };
}

const TabsListContext = React.createContext<{
  variant: TabsVariant;
  iconLayout: TabsIconLayout;
  scrollable: boolean;
  indicators: IndicatorTracker;
}>({
  variant: 'primary',
  iconLayout: 'stacked',
  scrollable: false,
  indicators: createIndicatorTracker(),
});

function Tabs({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsPrimitive>, 'className' | 'orientation'> & {
  className?: string;
}) {
  return <TabsPrimitive className={cn('flex flex-col', className)} {...props} />;
}

const tabsListVariants = cva(
  'relative flex scrollbar-none overflow-x-auto bg-surface shadow-[inset_0_-1px_0_var(--md-sys-color-surface-variant)] [&::-webkit-scrollbar]:hidden',
  {
    variants: {
      scrollable: {
        true: 'ps-[52px] scroll-ps-[52px]',
        false: '',
      },
    },
    defaultVariants: { scrollable: false },
  },
);

function TabsList({
  className,
  variant = 'primary',
  iconLayout = 'stacked',
  scrollable = false,
  ...props
}: Omit<React.ComponentProps<typeof TabsListPrimitive>, 'className'> & {
  className?: string;
  variant?: TabsVariant;
  iconLayout?: TabsIconLayout;
  scrollable?: boolean;
}) {
  const indicators = React.useMemo(() => createIndicatorTracker(), []);
  const context = React.useMemo(
    () => ({ variant, iconLayout, scrollable, indicators }),
    [variant, iconLayout, scrollable, indicators],
  );
  return (
    <TabsListContext value={context}>
      <TabsListPrimitive
        data-variant={variant}
        className={cn(tabsListVariants({ scrollable }), className)}
        {...props}
      />
    </TabsListContext>
  );
}

function slideIndicator(from: HTMLElement, to: HTMLElement) {
  for (const animation of to.getAnimations()) animation.cancel();
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();
  if (toRect.width === 0) return;

  const styles = getComputedStyle(to);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration =
    Number.parseFloat(styles.getPropertyValue('--md-sys-motion-spring-default-spatial-duration')) ||
    500;
  const easing =
    styles.getPropertyValue('--md-sys-motion-spring-default-spatial').trim() ||
    'cubic-bezier(0.2, 0, 0, 1)';
  const translate = fromRect.left - toRect.left;
  const scale = fromRect.width / toRect.width;

  to.animate(
    [{ transform: `translateX(${translate}px) scaleX(${scale})` }, { transform: 'none' }],
    { duration: reduce ? 0 : duration, easing },
  );
}

function TabIndicator({ selected, className }: { selected: boolean; className: string }) {
  const { indicators, scrollable } = React.use(TabsListContext);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    const indicator = ref.current;
    if (!selected || !indicator) return;
    const previous = indicators.activate(indicator);
    if (!previous || previous === indicator || !previous.isConnected) return;
    if (scrollable) {
      indicator.closest('[role=tab]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    slideIndicator(previous, indicator);
  }, [selected, indicators, scrollable]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="tabs-tab-indicator"
      className={cn(
        'pointer-events-none absolute inset-x-0 inset-be-0 origin-left bg-primary opacity-0 group-data-selected/tab:opacity-100',
        className,
      )}
    />
  );
}

const tabVariants = cva(
  [
    'group/tab relative isolate flex cursor-pointer items-center justify-center px-4 whitespace-nowrap select-none',
    'block-12 data-stacked:block-16',
    'type-title-small text-on-surface-variant not-data-selected:hover:text-on-surface not-data-selected:focus-visible:text-on-surface not-data-selected:active:text-on-surface',
    'focus-ring rounded-[8px] focus-visible:outline-offset-(--md-sys-state-focus-indicator-inner-offset)',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block-6 [&_svg]:inline-6 [&_svg:not([class*='fill-'])]:fill-current",
    '[transition:color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects)] motion-reduce:transition-none',
    'data-disabled:cursor-default data-disabled:text-on-surface/38',
  ],
  {
    variants: {
      variant: {
        primary:
          'data-selected:text-primary [--ripple-hover-color:var(--md-sys-color-on-surface)] [--ripple-pressed-color:var(--md-sys-color-primary)] data-selected:[--ripple-hover-color:var(--md-sys-color-primary)]',
        secondary:
          'data-selected:text-on-surface [--ripple-hover-color:var(--md-sys-color-on-surface)] [--ripple-pressed-color:var(--md-sys-color-on-surface)]',
      },
      scrollable: {
        true: 'flex-none min-inline-[90px]',
        false: 'flex-1',
      },
    },
    defaultVariants: { variant: 'primary', scrollable: false },
  },
);

function TabsTab({
  className,
  icon,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TabsTabPrimitive>, 'children' | 'className'> & {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  const { variant, iconLayout, scrollable } = React.use(TabsListContext);
  const stacked = variant === 'primary' && iconLayout === 'stacked' && icon && children;
  return (
    <TabsTabPrimitive
      data-variant={variant}
      data-stacked={stacked ? '' : undefined}
      className={cn(tabVariants({ variant, scrollable }), className)}
      {...props}
    >
      {(state) => (
        <>
          <Ripple className="rounded-none" />
          <span
            data-slot="tabs-tab-content"
            className="relative flex items-center justify-center gap-2 block-full group-data-stacked/tab:flex-col group-data-stacked/tab:gap-0.5"
          >
            {icon ? <TabsTabIconPrimitive className="flex">{icon}</TabsTabIconPrimitive> : null}
            {children}
            {variant === 'primary' ? (
              <TabIndicator
                selected={state.selected}
                className="rounded-ss-[3px] rounded-se-[3px] block-[3px]"
              />
            ) : null}
          </span>
          {variant === 'secondary' ? (
            <TabIndicator selected={state.selected} className="block-[2px]" />
          ) : null}
        </>
      )}
    </TabsTabPrimitive>
  );
}

const tabsPanelVariants = cva([
  'focus-ring',
  '[transition:opacity_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects),translate_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial)] motion-reduce:transition-none',
  'data-starting-style:opacity-0 data-[activation-direction=left]:data-starting-style:-translate-x-6 data-[activation-direction=right]:data-starting-style:translate-x-6',
]);

function TabsPanel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsPanelPrimitive>, 'className'> & { className?: string }) {
  return <TabsPanelPrimitive className={cn(tabsPanelVariants(), className)} {...props} />;
}

export { Tabs, TabsList, tabsListVariants, TabsPanel, tabsPanelVariants, TabsTab, tabVariants };
