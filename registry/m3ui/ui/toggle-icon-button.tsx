'use client';

import { Toggle as TogglePrimitive } from '@ui-sdk/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { iconButtonVariants } from '@/registry/m3ui/ui/icon-button';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const toggleIconButtonVariants = cva(
  'data-pressed:rounded-(--icon-button-shape-selected) data-pressed:active:rounded-(--icon-button-shape-pressed)',
  {
    variants: {
      variant: {
        filled:
          'not-data-pressed:bg-surface-container not-data-pressed:text-on-surface-variant data-pressed:bg-primary data-pressed:text-on-primary',
        tonal: 'data-pressed:bg-secondary data-pressed:text-on-secondary',
        outlined:
          'data-pressed:border-transparent data-pressed:bg-inverse-surface data-pressed:text-inverse-on-surface data-disabled:data-pressed:bg-on-surface/10',
        standard: 'data-pressed:text-primary',
      },
    },
    defaultVariants: { variant: 'standard' },
  },
);

type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

function ToggleIconButton({
  className,
  variant = 'standard',
  size = 'sm',
  width = 'default',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof TogglePrimitive>, 'children' | 'className'> &
  IconButtonVariantProps & { children?: React.ReactNode; className?: string }) {
  return (
    <TogglePrimitive
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-shape={shape}
      className={cn(
        iconButtonVariants({ variant, size, width, shape }),
        toggleIconButtonVariants({ variant }),
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </TogglePrimitive>
  );
}

export { ToggleIconButton, toggleIconButtonVariants };
