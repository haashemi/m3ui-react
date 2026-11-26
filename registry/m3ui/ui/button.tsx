'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import { Toggle as TogglePrimitive } from '@ui-sdk/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const buttonVariants = cva(
  [
    'group/button relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap select-none',
    'gap-(--button-gap) px-(--button-padding) block-(--button-height)',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block-(--button-icon) [&_svg]:inline-(--button-icon) [&_svg:not([class*='fill-'])]:fill-current",
    '[transition:border-radius_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),width_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),border-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),box-shadow_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)]',
    'motion-reduce:transition-none',
    'focus-ring',
    'data-disabled:cursor-default data-disabled:text-on-surface/38 data-disabled:shadow-none',
  ],
  {
    variants: {
      variant: {
        elevated:
          'bg-surface-container-low text-primary shadow-elevation-1 hover:shadow-elevation-2 data-disabled:bg-on-surface/10',
        filled:
          'bg-primary text-on-primary hover:shadow-elevation-1 data-disabled:bg-on-surface/10',
        tonal:
          'bg-secondary-container text-on-secondary-container hover:shadow-elevation-1 data-disabled:bg-on-surface/10',
        outlined: 'border-(length:--button-outline) border-outline-variant text-on-surface-variant',
        text: 'text-primary',
      },
      size: {
        xs: 'type-label-large [--button-gap:8px] [--button-height:32px] [--button-icon:20px] [--button-outline:1px] [--button-padding:12px] [--button-shape-pressed:var(--md-sys-shape-corner-small)] [--button-shape-square:var(--md-sys-shape-corner-medium)]',
        sm: 'type-label-large [--button-gap:8px] [--button-height:40px] [--button-icon:20px] [--button-outline:1px] [--button-padding:16px] [--button-shape-pressed:var(--md-sys-shape-corner-small)] [--button-shape-square:var(--md-sys-shape-corner-medium)]',
        md: 'type-title-medium [--button-gap:8px] [--button-height:56px] [--button-icon:24px] [--button-outline:1px] [--button-padding:24px] [--button-shape-pressed:var(--md-sys-shape-corner-medium)] [--button-shape-square:var(--md-sys-shape-corner-large)]',
        lg: 'type-headline-small [--button-gap:12px] [--button-height:96px] [--button-icon:32px] [--button-outline:2px] [--button-padding:48px] [--button-shape-pressed:var(--md-sys-shape-corner-large)] [--button-shape-square:var(--md-sys-shape-corner-extra-large)]',
        xl: 'type-headline-large [--button-gap:16px] [--button-height:136px] [--button-icon:40px] [--button-outline:3px] [--button-padding:64px] [--button-shape-pressed:var(--md-sys-shape-corner-large)] [--button-shape-square:var(--md-sys-shape-corner-extra-large)]',
      },
      shape: {
        round:
          'rounded-(--button-shape) [--button-shape-selected:var(--button-shape-square)] [--button-shape:calc(var(--button-height)/2)] active:rounded-(--button-shape-pressed)',
        square:
          'rounded-(--button-shape) [--button-shape-selected:calc(var(--button-height)/2)] [--button-shape:var(--button-shape-square)] active:rounded-(--button-shape-pressed)',
      },
    },
    defaultVariants: { variant: 'filled', size: 'sm', shape: 'round' },
  },
);

const toggleButtonVariants = cva(
  'data-pressed:rounded-(--button-shape-selected) data-pressed:active:rounded-(--button-shape-pressed)',
  {
    variants: {
      variant: {
        elevated: 'data-pressed:bg-primary data-pressed:text-on-primary',
        filled:
          'not-data-pressed:bg-surface-container not-data-pressed:text-on-surface-variant data-pressed:bg-primary data-pressed:text-on-primary',
        tonal: 'data-pressed:bg-secondary data-pressed:text-on-secondary',
        outlined:
          'data-pressed:border-transparent data-pressed:bg-inverse-surface data-pressed:text-inverse-on-surface data-disabled:data-pressed:bg-on-surface/10',
      },
    },
    defaultVariants: { variant: 'filled' },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = 'filled',
  size = 'sm',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> &
  ButtonVariantProps & { children?: React.ReactNode; className?: string }) {
  return (
    <ButtonPrimitive
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    >
      <Ripple />
      {children}
    </ButtonPrimitive>
  );
}

type ToggleButtonVariant = NonNullable<VariantProps<typeof toggleButtonVariants>['variant']>;

function ToggleButton({
  className,
  variant = 'filled',
  size = 'sm',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof TogglePrimitive>, 'children' | 'className'> &
  Omit<ButtonVariantProps, 'variant'> & {
    children?: React.ReactNode;
    className?: string;
    variant?: ToggleButtonVariant;
  }) {
  return (
    <TogglePrimitive
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn(
        buttonVariants({ variant, size, shape }),
        toggleButtonVariants({ variant }),
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </TogglePrimitive>
  );
}

export { Button, buttonVariants, ToggleButton, toggleButtonVariants };
