'use client';

import {
  Toggle as TogglePrimitive,
  ToggleGroup as ToggleGroupPrimitive,
} from '@ui-sdk/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/registry/m3ui/ui/button';
import { Ripple } from '@/registry/m3ui/ui/ripple';
import { toggleButtonVariants } from '@/registry/m3ui/ui/toggle-button';

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

export { ConnectedButtonGroup, ConnectedButtonGroupItem, connectedButtonGroupVariants };
