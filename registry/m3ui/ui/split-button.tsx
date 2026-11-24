'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/registry/m3ui/ui/button';
import { Ripple } from '@/registry/m3ui/ui/ripple';

type SplitButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;
type SplitButtonVariant = 'elevated' | 'filled' | 'outlined' | 'tonal';

const SplitButtonContext = React.createContext<{
  size: SplitButtonSize;
  variant: SplitButtonVariant;
}>({ size: 'sm', variant: 'filled' });

const splitButtonVariants = cva('inline-flex items-center gap-0.5', {
  variants: {
    size: {
      xs: '[--split-icon:22px] [--split-inner-active:var(--md-sys-shape-corner-small)] [--split-inner:var(--md-sys-shape-corner-extra-small)] [--split-leading-end:10px] [--split-leading-start:12px] [--split-trailing-padding:13px]',
      sm: '[--split-icon:22px] [--split-inner-active:var(--md-sys-shape-corner-medium)] [--split-inner:var(--md-sys-shape-corner-extra-small)] [--split-leading-end:12px] [--split-leading-start:16px] [--split-trailing-padding:13px]',
      md: '[--split-icon:26px] [--split-inner-active:var(--md-sys-shape-corner-medium)] [--split-inner:var(--md-sys-shape-corner-extra-small)] [--split-leading-end:24px] [--split-leading-start:24px] [--split-trailing-padding:15px]',
      lg: '[--split-icon:38px] [--split-inner-active:var(--md-sys-shape-corner-large-increased)] [--split-inner:var(--md-sys-shape-corner-small)] [--split-leading-end:48px] [--split-leading-start:48px] [--split-trailing-padding:29px]',
      xl: '[--split-icon:50px] [--split-inner-active:var(--md-sys-shape-corner-large-increased)] [--split-inner:var(--md-sys-shape-corner-medium)] [--split-leading-end:64px] [--split-leading-start:64px] [--split-trailing-padding:43px]',
    },
  },
  defaultVariants: { size: 'sm' },
});

function SplitButton({
  className,
  size = 'sm',
  variant = 'filled',
  ...props
}: React.ComponentProps<'div'> & { size?: SplitButtonSize; variant?: SplitButtonVariant }) {
  const context = React.useMemo(() => ({ size, variant }), [size, variant]);
  return (
    <SplitButtonContext value={context}>
      <div
        role="group"
        data-slot="split-button"
        data-size={size}
        data-variant={variant}
        className={cn(splitButtonVariants({ size }), className)}
        {...props}
      />
    </SplitButtonContext>
  );
}

const splitButtonCorners = [
  '[--split-outer:calc(var(--button-height)/2)] [--split-state:var(--split-inner)]',
  'hover:[--split-state:var(--split-inner-active)] active:[--split-state:var(--split-inner-active)]',
];

function SplitButtonAction({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> & {
  children?: React.ReactNode;
  className?: string;
}) {
  const { size, variant } = React.use(SplitButtonContext);
  return (
    <ButtonPrimitive
      className={cn(
        buttonVariants({ variant, size, shape: null }),
        splitButtonCorners,
        'rounded-s-(--split-outer) rounded-e-(--split-state) ps-(--split-leading-start) pe-(--split-leading-end)',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </ButtonPrimitive>
  );
}

function SplitButtonTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'children' | 'className'> & {
  children?: React.ReactNode;
  className?: string;
}) {
  const { size, variant } = React.use(SplitButtonContext);
  return (
    <button
      type="button"
      data-slot="split-button-trigger"
      className={cn(
        buttonVariants({ variant, size, shape: null }),
        splitButtonCorners,
        'aria-expanded:[--split-state:var(--split-outer)] data-open:[--split-state:var(--split-outer)]',
        'rounded-s-(--split-state) rounded-e-(--split-outer) px-(--split-trailing-padding)',
        '[&_svg]:transition-transform [&_svg]:duration-(--md-sys-motion-spring-default-spatial-duration) [&_svg]:ease-(--md-sys-motion-spring-default-spatial) [&_svg]:block-(--split-icon) [&_svg]:inline-(--split-icon) aria-expanded:[&_svg]:rotate-180 data-open:[&_svg]:rotate-180',
        'disabled:cursor-default disabled:text-on-surface/38',
        variant !== 'outlined' && 'disabled:bg-on-surface/10',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children ?? (
        <svg viewBox="0 -960 960 960" aria-hidden="true">
          <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
        </svg>
      )}
    </button>
  );
}

export { SplitButton, SplitButtonAction, SplitButtonTrigger, splitButtonVariants };
