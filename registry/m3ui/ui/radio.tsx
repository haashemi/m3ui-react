'use client';

import { Radio as RadioPrimitive, RadioGroup as RadioGroupPrimitive } from '@ui-sdk/react/radio';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

function RadioGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof RadioGroupPrimitive>, 'className'> & { className?: string }) {
  return <RadioGroupPrimitive className={cn('flex flex-col', className)} {...props} />;
}

function Radio({
  className,
  ...props
}: Omit<React.ComponentProps<typeof RadioPrimitive>, 'children' | 'className'> & {
  className?: string;
}) {
  return (
    <RadioPrimitive
      className={cn(
        'group/radio relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full select-none block-10 inline-10',
        'focus-ring after:absolute after:-inset-1',
        '[--radio-color:var(--md-sys-color-on-surface-variant)] [--ripple-hover-color:var(--md-sys-color-on-surface)] [--ripple-pressed-color:var(--md-sys-color-primary)]',
        'hover:[--radio-color:var(--md-sys-color-on-surface)] focus-visible:[--radio-color:var(--md-sys-color-on-surface)] active:[--radio-color:var(--md-sys-color-on-surface)]',
        'data-checked:[--radio-color:var(--md-sys-color-primary)] data-checked:[--ripple-hover-color:var(--md-sys-color-primary)] data-checked:[--ripple-pressed-color:var(--md-sys-color-on-surface)]',
        'data-disabled:cursor-default data-disabled:[--radio-color:var(--md-sys-color-on-surface)]',
        className,
      )}
      {...props}
    >
      <Ripple />
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-slot="radio-icon"
        className={cn(
          'pointer-events-none fill-(--radio-color) [transition:fill_50ms_linear] block-5 inline-5',
          'group-data-disabled/radio:opacity-38 group-data-disabled/radio:transition-none motion-reduce:transition-none',
        )}
      >
        <path
          fillRule="evenodd"
          d="M10 0a10 10 0 1 1 0 20a10 10 0 1 1 0-20Zm0 2a8 8 0 1 0 0 16a8 8 0 1 0 0-16Z"
        />
        <circle
          cx="10"
          cy="10"
          r="5"
          className={cn(
            'origin-center scale-0 opacity-0 transform-fill',
            '[transition:scale_150ms_var(--md-sys-motion-easing-emphasized-accelerate),opacity_50ms_linear_100ms]',
            'group-data-checked/radio:scale-100 group-data-checked/radio:opacity-100 group-data-checked/radio:[transition:scale_300ms_var(--md-sys-motion-easing-emphasized-decelerate),opacity_50ms_linear]',
            'group-data-disabled/radio:transition-none motion-reduce:transition-none',
          )}
        />
      </svg>
    </RadioPrimitive>
  );
}

export { Radio, RadioGroup };
