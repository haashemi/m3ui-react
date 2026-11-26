'use client';

import { Toggle as TogglePrimitive } from '@ui-sdk/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/registry/m3ui/ui/button';
import { Ripple } from '@/registry/m3ui/ui/ripple';

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

export { ToggleButton, toggleButtonVariants };
