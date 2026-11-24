'use client';

import {
  Radio as RadioPrimitive,
  RadioGroup as RadioGroupPrimitive,
  RadioIndicator,
} from '@ui-sdk/react/radio';
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
      <span
        data-slot="radio-icon"
        className={cn(
          'pointer-events-none relative flex items-center justify-center rounded-full border-2 border-(--radio-color) transition-colors duration-50 ease-linear block-5 inline-5',
          'group-data-disabled/radio:opacity-38 group-data-disabled/radio:transition-none',
        )}
      >
        <RadioIndicator
          keepMounted
          className={cn(
            'scale-0 rounded-full bg-(--radio-color) opacity-0 block-2.5 inline-2.5',
            '[transition:opacity_50ms_linear,scale_0s_linear_50ms,background-color_50ms_linear]',
            'data-checked:scale-100 data-checked:opacity-100 data-checked:[transition:opacity_50ms_linear,scale_300ms_var(--md-sys-motion-easing-emphasized-decelerate),background-color_50ms_linear]',
            'data-disabled:transition-none motion-reduce:transition-none',
          )}
        />
      </span>
    </RadioPrimitive>
  );
}

export { Radio, RadioGroup };
