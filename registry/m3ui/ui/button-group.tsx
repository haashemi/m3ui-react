'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

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
  let restingWidths: Map<HTMLElement, number> | undefined = undefined;
  let lockedWidths: Map<HTMLElement, number> | undefined = undefined;
  let releaseTimer: ReturnType<typeof setTimeout> | undefined = undefined;

  const itemFrom = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return undefined;
    const item = [...group.children].find((child) => child.contains(target));
    return item instanceof HTMLElement && !isDisabled(item) ? item : undefined;
  };

  const measure = (items: HTMLElement[]) => {
    const known = restingWidths;
    if (known && items.every((child) => known.has(child))) return known;
    return new Map(items.map((child) => [child, child.getBoundingClientRect().width]));
  };

  const press = (item: HTMLElement) => {
    clearTimeout(releaseTimer);
    const items = [...group.children].filter((child) => child instanceof HTMLElement);
    const index = items.indexOf(item);
    const widths = measure(items);
    const fresh = widths !== restingWidths;
    restingWidths = widths;
    for (const [child, width] of widths) child.style.width = `${width}px`;
    if (fresh) void group.offsetWidth;

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
      restingWidths = undefined;
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

export { ButtonGroup, buttonGroupVariants };
