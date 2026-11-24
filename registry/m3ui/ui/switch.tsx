'use client';

import { Switch as SwitchPrimitive, SwitchThumb } from '@ui-sdk/react/switch';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

function Switch({
  className,
  icons = 'none',
  ...props
}: Omit<React.ComponentProps<typeof SwitchPrimitive>, 'children' | 'className'> & {
  className?: string;
  icons?: 'both' | 'checked' | 'none';
}) {
  return (
    <SwitchPrimitive
      data-icons={icons}
      className={cn(
        'group/switch relative isolate inline-flex shrink-0 cursor-pointer items-center rounded-full select-none block-8 inline-13',
        'focus-ring after:absolute after:inset-x-0 after:-inset-y-2',
        'before:absolute before:inset-0 before:-z-2 before:rounded-[inherit] before:border-2 before:border-(--switch-track-outline) before:bg-(--switch-track)',
        'before:[transition:background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),border-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects)]',
        '[--ripple-hover-color:var(--md-sys-color-on-surface)] [--ripple-pressed-color:var(--md-sys-color-on-surface)]',
        '[--switch-handle:var(--md-sys-color-outline)] [--switch-icon:var(--md-sys-color-surface-container-highest)] [--switch-track-outline:var(--md-sys-color-outline)] [--switch-track:var(--md-sys-color-surface-container-highest)]',
        'hover:[--switch-handle:var(--md-sys-color-on-surface-variant)] focus-visible:[--switch-handle:var(--md-sys-color-on-surface-variant)] active:[--switch-handle:var(--md-sys-color-on-surface-variant)]',
        'data-checked:[--ripple-hover-color:var(--md-sys-color-primary)] data-checked:[--ripple-pressed-color:var(--md-sys-color-primary)]',
        'data-checked:[--switch-handle:var(--md-sys-color-on-primary)] data-checked:[--switch-icon:var(--md-sys-color-primary)] data-checked:[--switch-track-outline:var(--md-sys-color-primary)] data-checked:[--switch-track:var(--md-sys-color-primary)]',
        'data-checked:hover:[--switch-handle:var(--md-sys-color-primary-container)] data-checked:focus-visible:[--switch-handle:var(--md-sys-color-primary-container)] data-checked:active:[--switch-handle:var(--md-sys-color-primary-container)]',
        'data-disabled:cursor-default data-disabled:before:opacity-12 data-disabled:before:transition-none',
        'data-disabled:[--switch-handle:color-mix(in_srgb,var(--md-sys-color-on-surface)_38%,transparent)] data-disabled:[--switch-track-outline:var(--md-sys-color-on-surface)]',
        'data-disabled:data-checked:[--switch-handle:var(--md-sys-color-surface)] data-disabled:data-checked:[--switch-icon:var(--md-sys-color-on-surface)] data-disabled:data-checked:[--switch-track-outline:transparent] data-disabled:data-checked:[--switch-track:var(--md-sys-color-on-surface)]',
        className,
      )}
      {...props}
    >
      <Ripple
        className={cn(
          'inset-auto inset-s-[-4px] inset-bs-[-4px] rounded-full block-10 inline-10',
          'group-data-checked/switch:translate-x-5 rtl:group-data-checked/switch:-translate-x-5',
          '[transition:translate_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial)] motion-reduce:transition-none',
        )}
      />
      <SwitchThumb
        className={cn(
          'pointer-events-none absolute inset-s-0 inset-bs-0 flex items-center justify-center block-8 inline-8',
          'data-checked:translate-x-5 rtl:data-checked:-translate-x-5',
          '[transition:translate_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial)]',
          'data-disabled:transition-none motion-reduce:transition-none',
        )}
      >
        <span
          data-slot="switch-handle"
          className={cn(
            'relative flex items-center justify-center rounded-full bg-(--switch-handle) block-4 inline-4',
            '[transition:width_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),height_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects)]',
            'group-data-checked/switch:block-6 group-data-checked/switch:inline-6 group-data-[icons=both]/switch:block-6 group-data-[icons=both]/switch:inline-6',
            'group-[:active:not([data-disabled],[data-readonly])]/switch:block-7 group-[:active:not([data-disabled],[data-readonly])]/switch:inline-7',
            'group-data-disabled/switch:transition-none',
            'motion-reduce:transition-none',
          )}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            data-slot="switch-icon-checked"
            className={cn(
              'absolute -rotate-45 fill-(--switch-icon) opacity-0 block-4 inline-4',
              '[transition:opacity_33ms_linear,rotate_167ms_var(--md-sys-motion-easing-standard),fill_67ms_linear]',
              'group-data-checked/switch:rotate-0 group-data-checked/switch:opacity-100 group-data-[icons=none]/switch:hidden',
              'group-data-disabled/switch:opacity-0 group-data-disabled/switch:transition-none group-data-disabled/switch:group-data-checked/switch:opacity-38',
              'motion-reduce:transition-none',
            )}
          >
            <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            data-slot="switch-icon-unchecked"
            className={cn(
              'absolute fill-(--switch-icon) opacity-100 block-4 inline-4',
              '[transition:opacity_33ms_linear,fill_67ms_linear]',
              'not-group-data-[icons=both]/switch:hidden group-data-checked/switch:opacity-0',
              'group-data-disabled/switch:opacity-38 group-data-disabled/switch:transition-none group-data-disabled/switch:group-data-checked/switch:opacity-0',
              'motion-reduce:transition-none',
            )}
          >
            <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
          </svg>
        </span>
      </SwitchThumb>
    </SwitchPrimitive>
  );
}

export { Switch };
