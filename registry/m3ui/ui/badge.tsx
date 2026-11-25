import type * as React from 'react';

import { cn } from '@/lib/utils';

function hasContent(children: React.ReactNode) {
  if (typeof children === 'string') return children.trim().length > 0;
  return children !== null && children !== undefined && typeof children !== 'boolean';
}

function Badge({ className, children, ...props }: React.ComponentProps<'span'>) {
  const large = hasContent(children);
  return (
    <span
      data-slot="badge"
      data-size={large ? 'large' : 'small'}
      className={cn(
        'inline-flex shrink-0 items-center justify-center bg-error text-on-error tabular-nums select-none',
        'rounded-[calc(var(--badge-size)/2)] block-(--badge-size) min-inline-(--badge-size)',
        large
          ? 'px-1 type-label-small whitespace-nowrap [--badge-size:16px]'
          : '[--badge-size:6px]',
        '[[data-slot=badge-anchor]>&]:absolute',
        large
          ? '[[data-slot=badge-anchor]>&]:inset-s-[calc(100%-12px)] [[data-slot=badge-anchor]>&]:inset-bs-[-2px]'
          : '[[data-slot=badge-anchor]>&]:inset-s-[calc(100%-6px)] [[data-slot=badge-anchor]>&]:inset-bs-0',
        className,
      )}
      {...props}
    >
      {large ? children : null}
    </span>
  );
}

function BadgeAnchor({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge-anchor"
      className={cn('relative inline-flex shrink-0', className)}
      {...props}
    />
  );
}

export { Badge, BadgeAnchor };
