'use client';

import {
  Toggle as TogglePrimitive,
  ToggleGroup as ToggleGroupPrimitive,
} from '@ui-sdk/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants, toggleButtonVariants } from '@/registry/m3ui/ui/button';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const PRESSED_ITEM_WIDTH_MULTIPLIER = 0.15;

function isDisabled(element: Element) {
  return element.matches(':disabled, [aria-disabled="true"], [data-disabled]');
}

function settleDuration(element: Element) {
  const value = getComputedStyle(element).getPropertyValue(
    '--md-sys-motion-spring-fast-spatial-duration',
  );
  return Number.parseFloat(value) || 400;
}

function attachPressGrow(group: HTMLElement) {
  let lockedWidths: Map<HTMLElement, number> | undefined = undefined;
  let releaseTimer: ReturnType<typeof setTimeout> | undefined = undefined;

  const itemFrom = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return undefined;
    const item = [...group.children].find((child) => child.contains(target));
    return item instanceof HTMLElement && !isDisabled(item) ? item : undefined;
  };

  const press = (item: HTMLElement) => {
    clearTimeout(releaseTimer);
    const items = [...group.children].filter((child) => child instanceof HTMLElement);
    const index = items.indexOf(item);
    const widths = new Map(items.map((child) => [child, child.getBoundingClientRect().width]));
    for (const [child, width] of widths) child.style.width = `${width}px`;
    void group.offsetWidth;

    const neighbors = [items[index - 1], items[index + 1]].filter((child) => child !== undefined);
    const growth = (widths.get(item) ?? 0) * PRESSED_ITEM_WIDTH_MULTIPLIER;
    item.style.width = `${(widths.get(item) ?? 0) + growth}px`;
    for (const neighbor of neighbors) {
      neighbor.style.width = `${(widths.get(neighbor) ?? 0) - growth / neighbors.length}px`;
    }
    lockedWidths = widths;
  };

  const release = () => {
    const widths = lockedWidths;
    if (!widths) return;
    lockedWidths = undefined;
    for (const [child, width] of widths) child.style.width = `${width}px`;
    releaseTimer = setTimeout(() => {
      for (const child of widths.keys()) child.style.removeProperty('width');
    }, settleDuration(group));
  };

  const onPointerDown = (event: PointerEvent) => {
    const item = itemFrom(event.target);
    if (!item || event.button !== 0) return;
    press(item);
    window.addEventListener('pointerup', release, { once: true });
    window.addEventListener('pointercancel', release, { once: true });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.repeat || (event.key !== ' ' && event.key !== 'Enter')) return;
    const item = itemFrom(event.target);
    if (item) press(item);
  };

  group.addEventListener('pointerdown', onPointerDown);
  group.addEventListener('keydown', onKeyDown);
  group.addEventListener('keyup', release);
  group.addEventListener('focusout', release);

  return () => {
    clearTimeout(releaseTimer);
    group.removeEventListener('pointerdown', onPointerDown);
    group.removeEventListener('keydown', onKeyDown);
    group.removeEventListener('keyup', release);
    group.removeEventListener('focusout', release);
    window.removeEventListener('pointerup', release);
    window.removeEventListener('pointercancel', release);
  };
}

const buttonGroupVariants = cva('inline-flex items-center', {
  variants: {
    size: {
      xs: 'gap-[18px]',
      sm: 'gap-3',
      md: 'gap-2',
      lg: 'gap-2',
      xl: 'gap-2',
    },
  },
  defaultVariants: { size: 'sm' },
});

function ButtonGroup({
  className,
  size = 'sm',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  const groupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const group = groupRef.current;
    return group ? attachPressGrow(group) : undefined;
  }, []);

  return (
    <div
      ref={groupRef}
      role="group"
      data-slot="button-group"
      data-size={size}
      className={cn(buttonGroupVariants({ size }), className)}
      {...props}
    />
  );
}

type ConnectedSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;
type ConnectedVariant = NonNullable<VariantProps<typeof toggleButtonVariants>['variant']>;

const ConnectedButtonGroupContext = React.createContext<{
  size: ConnectedSize;
  variant: ConnectedVariant;
}>({ size: 'sm', variant: 'filled' });

const connectedButtonGroupVariants = cva('inline-flex items-center gap-0.5', {
  variants: {
    size: {
      xs: '[--connected-inner-pressed:var(--md-sys-shape-corner-extra-small)] [--connected-inner:var(--md-sys-shape-corner-small)]',
      sm: '[--connected-inner-pressed:var(--md-sys-shape-corner-extra-small)] [--connected-inner:var(--md-sys-shape-corner-small)]',
      md: '[--connected-inner-pressed:var(--md-sys-shape-corner-extra-small)] [--connected-inner:var(--md-sys-shape-corner-small)]',
      lg: '[--connected-inner-pressed:var(--md-sys-shape-corner-medium)] [--connected-inner:var(--md-sys-shape-corner-large)]',
      xl: '[--connected-inner-pressed:var(--md-sys-shape-corner-large)] [--connected-inner:var(--md-sys-shape-corner-large-increased)]',
    },
  },
  defaultVariants: { size: 'sm' },
});

function ConnectedButtonGroup({
  className,
  size = 'sm',
  variant = 'filled',
  ...props
}: Omit<React.ComponentProps<typeof ToggleGroupPrimitive>, 'children' | 'className'> & {
  children?: React.ReactNode;
  className?: string;
  size?: ConnectedSize;
  variant?: ConnectedVariant;
}) {
  const context = React.useMemo(() => ({ size, variant }), [size, variant]);
  return (
    <ConnectedButtonGroupContext value={context}>
      <ToggleGroupPrimitive
        data-size={size}
        className={cn(connectedButtonGroupVariants({ size }), className)}
        {...props}
      />
    </ConnectedButtonGroupContext>
  );
}

function ConnectedButtonGroupItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TogglePrimitive>, 'children' | 'className'> & {
  children?: React.ReactNode;
  className?: string;
}) {
  const { size, variant } = React.use(ConnectedButtonGroupContext);
  return (
    <TogglePrimitive
      className={cn(
        buttonVariants({ variant, size, shape: null }),
        toggleButtonVariants({ variant }),
        '[--connected-outer:calc(var(--button-height)/2)] [--connected-state:var(--connected-inner)]',
        'active:[--connected-state:var(--connected-inner-pressed)] data-pressed:[--connected-state:var(--connected-outer)] data-pressed:active:[--connected-state:var(--connected-inner-pressed)]',
        '[--connected-end:var(--connected-state)] [--connected-start:var(--connected-state)] first:[--connected-start:var(--connected-outer)] last:[--connected-end:var(--connected-outer)]',
        'rounded-s-(--connected-start) rounded-e-(--connected-end)',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </TogglePrimitive>
  );
}

export {
  ButtonGroup,
  buttonGroupVariants,
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
  connectedButtonGroupVariants,
};
