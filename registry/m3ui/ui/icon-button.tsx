'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const iconButtonVariants = cva(
  [
    'group/icon-button relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden select-none',
    'rounded-(--icon-button-shape) px-(--icon-button-padding) block-(--icon-button-height)',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block-(--icon-button-icon) [&_svg]:inline-(--icon-button-icon) [&_svg:not([class*='fill-'])]:fill-current",
    '[transition:border-radius_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),width_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),padding_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),border-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects)]',
    'motion-reduce:transition-none',
    'focus-ring active:rounded-(--icon-button-shape-pressed)',
    'data-disabled:cursor-default data-disabled:text-on-surface/38',
  ],
  {
    variants: {
      variant: {
        filled: 'bg-primary text-on-primary data-disabled:bg-on-surface/10',
        tonal: 'bg-secondary-container text-on-secondary-container data-disabled:bg-on-surface/10',
        outlined:
          'border-(length:--icon-button-outline) border-outline-variant text-on-surface-variant',
        standard: 'text-on-surface-variant',
      },
      size: {
        xs: '[--icon-button-height:32px] [--icon-button-icon:20px] [--icon-button-outline:1px] [--icon-button-shape-pressed:var(--md-sys-shape-corner-small)] [--icon-button-shape-square:var(--md-sys-shape-corner-medium)]',
        sm: '[--icon-button-height:40px] [--icon-button-icon:24px] [--icon-button-outline:1px] [--icon-button-shape-pressed:var(--md-sys-shape-corner-small)] [--icon-button-shape-square:var(--md-sys-shape-corner-medium)]',
        md: '[--icon-button-height:56px] [--icon-button-icon:24px] [--icon-button-outline:1px] [--icon-button-shape-pressed:var(--md-sys-shape-corner-medium)] [--icon-button-shape-square:var(--md-sys-shape-corner-large)]',
        lg: '[--icon-button-height:96px] [--icon-button-icon:32px] [--icon-button-outline:2px] [--icon-button-shape-pressed:var(--md-sys-shape-corner-large)] [--icon-button-shape-square:var(--md-sys-shape-corner-extra-large)]',
        xl: '[--icon-button-height:136px] [--icon-button-icon:40px] [--icon-button-outline:3px] [--icon-button-shape-pressed:var(--md-sys-shape-corner-large)] [--icon-button-shape-square:var(--md-sys-shape-corner-extra-large)]',
      },
      width: { narrow: '', default: '', wide: '' },
      shape: {
        round:
          '[--icon-button-shape-selected:var(--icon-button-shape-square)] [--icon-button-shape:calc(var(--icon-button-height)/2)]',
        square:
          '[--icon-button-shape-selected:calc(var(--icon-button-height)/2)] [--icon-button-shape:var(--icon-button-shape-square)]',
      },
    },
    compoundVariants: [
      { size: 'xs', width: 'narrow', className: '[--icon-button-padding:4px]' },
      { size: 'xs', width: 'default', className: '[--icon-button-padding:6px]' },
      { size: 'xs', width: 'wide', className: '[--icon-button-padding:10px]' },
      { size: 'sm', width: 'narrow', className: '[--icon-button-padding:4px]' },
      { size: 'sm', width: 'default', className: '[--icon-button-padding:8px]' },
      { size: 'sm', width: 'wide', className: '[--icon-button-padding:14px]' },
      { size: 'md', width: 'narrow', className: '[--icon-button-padding:12px]' },
      { size: 'md', width: 'default', className: '[--icon-button-padding:16px]' },
      { size: 'md', width: 'wide', className: '[--icon-button-padding:24px]' },
      { size: 'lg', width: 'narrow', className: '[--icon-button-padding:16px]' },
      { size: 'lg', width: 'default', className: '[--icon-button-padding:32px]' },
      { size: 'lg', width: 'wide', className: '[--icon-button-padding:48px]' },
      { size: 'xl', width: 'narrow', className: '[--icon-button-padding:32px]' },
      { size: 'xl', width: 'default', className: '[--icon-button-padding:48px]' },
      { size: 'xl', width: 'wide', className: '[--icon-button-padding:72px]' },
    ],
    defaultVariants: { variant: 'standard', size: 'sm', width: 'default', shape: 'round' },
  },
);

type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

function IconButton({
  className,
  variant = 'standard',
  size = 'sm',
  width = 'default',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> &
  IconButtonVariantProps & { children?: React.ReactNode; className?: string }) {
  return (
    <ButtonPrimitive
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-shape={shape}
      className={cn(iconButtonVariants({ variant, size, width, shape }), className)}
      {...props}
    >
      <Ripple />
      {children}
    </ButtonPrimitive>
  );
}

export { IconButton, iconButtonVariants };
