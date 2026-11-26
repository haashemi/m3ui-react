'use client';

import {
  Toggle as TogglePrimitive,
  ToggleGroup as ToggleGroupPrimitive,
} from '@ui-sdk/react/toggle';
import {
  type Toolbar as ToolbarPrimitive,
  ToolbarButton as ToolbarButtonPrimitive,
} from '@ui-sdk/react/toolbar';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/registry/m3ui/ui/button';
import { iconButtonVariants } from '@/registry/m3ui/ui/icon-button';
import { Ripple } from '@/registry/m3ui/ui/ripple';
import { toggleIconButtonVariants } from '@/registry/m3ui/ui/toggle-icon-button';

type ToolbarOrientation = 'horizontal' | 'vertical';

const ToolbarOrientationContext = React.createContext<ToolbarOrientation | undefined>(undefined);

const toolbarColorVariants = cva('', {
  variants: {
    variant: {
      standard:
        'bg-surface-container [--toolbar-icon:var(--md-sys-color-on-surface-variant)] [--toolbar-selected-container:var(--md-sys-color-secondary-container)] [--toolbar-selected-icon:var(--md-sys-color-on-secondary-container)]',
      vibrant:
        'bg-primary-container [--toolbar-icon:var(--md-sys-color-on-primary-container)] [--toolbar-selected-container:var(--md-sys-color-surface-container)] [--toolbar-selected-icon:var(--md-sys-color-on-surface)]',
    },
  },
  defaultVariants: { variant: 'standard' },
});

type ToolbarColorProps = VariantProps<typeof toolbarColorVariants>;

type ToolbarRootProps = Omit<
  React.ComponentProps<typeof ToolbarPrimitive>,
  'children' | 'className' | 'orientation'
> & { children?: React.ReactNode; className?: string };

type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

function ToolbarIconButton({
  className,
  variant = 'standard',
  size = 'sm',
  width = 'default',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarButtonPrimitive>, 'children' | 'className'> &
  IconButtonVariantProps & { children?: React.ReactNode; className?: string }) {
  return (
    <ToolbarButtonPrimitive
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-shape={shape}
      className={cn(
        iconButtonVariants({ variant, size, width, shape }),
        variant === 'standard' && 'text-(--toolbar-icon)',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </ToolbarButtonPrimitive>
  );
}

function ToolbarToggleIconButton({
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
        variant === 'standard' &&
          'text-(--toolbar-icon) data-pressed:bg-(--toolbar-selected-container) data-pressed:text-(--toolbar-selected-icon) data-disabled:data-pressed:bg-on-surface/10',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </TogglePrimitive>
  );
}

function ToolbarButton({
  className,
  variant = 'text',
  size = 'sm',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarButtonPrimitive>, 'children' | 'className'> &
  VariantProps<typeof buttonVariants> & { children?: React.ReactNode; className?: string }) {
  return (
    <ToolbarButtonPrimitive
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn(
        buttonVariants({ variant, size, shape }),
        variant === 'text' && 'text-(--toolbar-icon)',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </ToolbarButtonPrimitive>
  );
}

function ToolbarToggleGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToggleGroupPrimitive>, 'className' | 'orientation'> & {
  className?: string;
}) {
  const orientation = React.use(ToolbarOrientationContext) ?? 'horizontal';
  return (
    <ToggleGroupPrimitive
      orientation={orientation}
      className={cn('flex items-center gap-1 data-[orientation=vertical]:flex-col', className)}
      {...props}
    />
  );
}

export {
  ToolbarButton,
  toolbarColorVariants,
  ToolbarIconButton,
  ToolbarOrientationContext,
  ToolbarToggleGroup,
  ToolbarToggleIconButton,
};
export type { ToolbarColorProps, ToolbarOrientation, ToolbarRootProps };
