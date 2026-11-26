'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { fabBase, fabColorVariants } from '@/registry/m3ui/ui/fab';
import { Ripple } from '@/registry/m3ui/ui/ripple';

type FabColorProps = VariantProps<typeof fabColorVariants>;

const extendedFabVariants = cva(
  [
    ...fabBase,
    'gap-(--fab-gap) rounded-(--fab-shape) px-(--fab-padding) block-(--fab-height)',
    'data-collapsed:gap-0 data-collapsed:px-[calc((var(--fab-height)-var(--fab-icon))/2)]',
  ],
  {
    variants: {
      size: {
        small:
          'type-title-medium [--fab-gap:8px] [--fab-height:56px] [--fab-icon:24px] [--fab-padding:16px] [--fab-shape:var(--md-sys-shape-corner-large)]',
        medium:
          'type-title-large [--fab-gap:12px] [--fab-height:80px] [--fab-icon:28px] [--fab-padding:26px] [--fab-shape:var(--md-sys-shape-corner-large-increased)]',
        large:
          'type-headline-small [--fab-gap:16px] [--fab-height:96px] [--fab-icon:36px] [--fab-padding:28px] [--fab-shape:var(--md-sys-shape-corner-extra-large)]',
      },
    },
    defaultVariants: { size: 'small' },
  },
);

function ExtendedFab({
  className,
  variant = 'primary-container',
  size = 'small',
  icon,
  extended = true,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> &
  FabColorProps &
  VariantProps<typeof extendedFabVariants> & {
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    extended?: boolean;
  }) {
  return (
    <ButtonPrimitive
      data-variant={variant}
      data-size={size}
      data-collapsed={extended ? undefined : ''}
      className={cn(extendedFabVariants({ size }), fabColorVariants({ variant }), className)}
      {...props}
    >
      <Ripple />
      {icon}
      <span
        data-slot="extended-fab-label"
        className="grid grid-cols-[1fr] opacity-100 [transition:grid-template-columns_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial),opacity_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)] in-data-collapsed:grid-cols-[0fr] in-data-collapsed:opacity-0 motion-reduce:transition-none"
      >
        <span className="overflow-hidden min-inline-0">{children}</span>
      </span>
    </ButtonPrimitive>
  );
}

export { ExtendedFab, extendedFabVariants };
