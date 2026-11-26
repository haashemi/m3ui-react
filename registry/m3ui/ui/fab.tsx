'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const fabColorVariants = cva('', {
  variants: {
    variant: {
      'primary-container': 'bg-primary-container text-on-primary-container',
      'secondary-container': 'bg-secondary-container text-on-secondary-container',
      'tertiary-container': 'bg-tertiary-container text-on-tertiary-container',
      primary: 'bg-primary text-on-primary',
      secondary: 'bg-secondary text-on-secondary',
      tertiary: 'bg-tertiary text-on-tertiary',
    },
  },
  defaultVariants: { variant: 'primary-container' },
});

const fabBase = [
  'relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap select-none',
  'shadow-elevation-3 hover:shadow-elevation-4 focus-ring',
  "[&_svg]:pointer-events-none [&_svg]:size-(--fab-icon) [&_svg]:shrink-0 [&_svg:not([class*='fill-'])]:fill-current",
  '[transition:border-radius_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),padding_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial),gap_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial),background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),box-shadow_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)]',
  'motion-reduce:transition-none',
  'data-disabled:cursor-default data-disabled:bg-on-surface/10 data-disabled:text-on-surface/38 data-disabled:shadow-none',
];

const fabVariants = cva(
  [...fabBase, 'rounded-(--fab-shape) block-(--fab-size) inline-(--fab-size)'],
  {
    variants: {
      size: {
        default:
          '[--fab-icon:24px] [--fab-shape:var(--md-sys-shape-corner-large)] [--fab-size:56px]',
        medium:
          '[--fab-icon:28px] [--fab-shape:var(--md-sys-shape-corner-large-increased)] [--fab-size:80px]',
        large:
          '[--fab-icon:36px] [--fab-shape:var(--md-sys-shape-corner-extra-large)] [--fab-size:96px]',
      },
    },
    defaultVariants: { size: 'default' },
  },
);

type FabColorProps = VariantProps<typeof fabColorVariants>;

function Fab({
  className,
  variant = 'primary-container',
  size = 'default',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> &
  FabColorProps &
  VariantProps<typeof fabVariants> & { children?: React.ReactNode; className?: string }) {
  return (
    <ButtonPrimitive
      data-variant={variant}
      data-size={size}
      className={cn(fabVariants({ size }), fabColorVariants({ variant }), className)}
      {...props}
    >
      <Ripple />
      {children}
    </ButtonPrimitive>
  );
}

export { Fab, fabBase, fabColorVariants, fabVariants };
