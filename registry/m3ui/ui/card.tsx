'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const cardVariants = cva(
  [
    'group/card relative isolate flex flex-col overflow-hidden rounded-corner-medium text-on-surface',
    'after:pointer-events-none after:absolute after:inset-0 after:z-2 after:rounded-[inherit] after:border after:border-(--card-outline)',
    '[--card-outline:transparent]',
    '[transition:box-shadow_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects),background-color_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)]',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        elevated: [
          'bg-surface-container-low shadow-elevation-1',
          'has-[>[data-card-action]:not([data-disabled])]:hover:shadow-elevation-2 data-dragged:shadow-elevation-4',
          'has-[>[data-card-action][data-disabled]]:bg-surface/38',
        ],
        filled: [
          'bg-surface-container-highest',
          'has-[>[data-card-action]:not([data-disabled])]:hover:shadow-elevation-1 data-dragged:shadow-elevation-3',
          'has-[>[data-card-action][data-disabled]]:bg-surface-container-highest/38',
        ],
        outlined: [
          'bg-surface [--card-outline:var(--md-sys-color-outline-variant)]',
          'has-[>[data-card-action]:not([data-disabled])]:hover:shadow-elevation-1 data-dragged:shadow-elevation-3',
          'has-[>[data-card-action]:focus-visible]:[--card-outline:var(--md-sys-color-on-surface)]',
          'has-[>[data-card-action][data-disabled]]:[--card-outline:color-mix(in_srgb,var(--md-sys-color-outline)_12%,transparent)]',
        ],
      },
    },
    defaultVariants: { variant: 'elevated' },
  },
);

function Card({
  className,
  variant = 'elevated',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardPrimaryAction({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> & {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <ButtonPrimitive
      data-card-action=""
      className={cn(
        'absolute inset-0 isolate z-1 cursor-pointer rounded-[inherit] text-on-surface outline-none',
        'focus-visible:animate-focus-ring focus-visible:outline-(length:--md-sys-state-focus-indicator-thickness) focus-visible:outline-offset-(--md-sys-state-focus-indicator-inner-offset) focus-visible:outline-secondary focus-visible:outline-solid',
        'data-disabled:cursor-default',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </ButtonPrimitive>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid grid-cols-[auto_minmax(0,1fr)_auto] content-center items-center px-4 py-3 min-block-18',
        'has-[>[data-slot=card-action]]:pe-1',
        className,
      )}
      {...props}
    />
  );
}

function CardAvatar({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="card-avatar"
      className={cn(
        'col-start-1 row-span-2 row-start-1 me-4 flex items-center justify-center overflow-hidden rounded-[20px] bg-primary-container type-title-medium text-on-primary-container block-10 inline-10',
        '[&>img]:object-cover [&>img]:block-full [&>img]:inline-full',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('col-start-2 type-title-medium text-on-surface', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('col-start-2 mbs-1 type-body-medium text-on-surface', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'relative z-3 col-start-3 row-span-2 row-start-1 ms-2 flex items-center',
        className,
      )}
      {...props}
    />
  );
}

function CardMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        'relative shrink-0 overflow-hidden bg-surface-container-high',
        '[&>img,&>video]:block [&>img,&>video]:object-cover [&>img,&>video]:block-full [&>img,&>video]:inline-full',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('flex flex-col gap-8 p-4 type-body-medium text-on-surface-variant', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'relative z-3 mbs-auto flex flex-wrap items-center justify-end gap-2 p-4',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardAvatar,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardPrimaryAction,
  CardTitle,
  cardVariants,
};
