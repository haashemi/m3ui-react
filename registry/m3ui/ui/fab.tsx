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

export { ExtendedFab, extendedFabVariants, Fab, fabColorVariants, fabVariants };
