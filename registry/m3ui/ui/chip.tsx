'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import {
  Toggle as TogglePrimitive,
  ToggleGroup as ToggleGroupPrimitive,
} from '@ui-sdk/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const chipVariants = cva(
  [
    'group/chip relative isolate inline-flex shrink-0 cursor-pointer items-center overflow-hidden whitespace-nowrap select-none',
    'rounded-corner-small ps-(--chip-leading-space) pe-(--chip-trailing-space) type-label-large block-8',
    '[--chip-leading-space:16px] [--chip-trailing-space:16px] data-leading:[--chip-leading-space:8px] data-trailing:[--chip-trailing-space:8px]',
    'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-(--chip-outline)',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block-4.5 [&_svg]:inline-4.5 [&_svg:not([class*='fill-'])]:fill-current",
    '[transition:padding_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),box-shadow_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)]',
    'motion-reduce:transition-none',
    'focus-ring',
    'data-disabled:cursor-default data-disabled:text-on-surface/38 data-disabled:shadow-none data-disabled:[--chip-icon:color-mix(in_srgb,var(--md-sys-color-on-surface)_38%,transparent)]',
  ],
  {
    variants: {
      variant: {
        outlined:
          '[--chip-outline:var(--md-sys-color-outline-variant)] data-disabled:[--chip-outline:color-mix(in_srgb,var(--md-sys-color-on-surface)_12%,transparent)]',
        elevated:
          'bg-surface-container-low shadow-elevation-1 [--chip-outline:transparent] hover:shadow-elevation-2 data-disabled:bg-on-surface/12',
      },
    },
    defaultVariants: { variant: 'outlined' },
  },
);

const iconSlot = 'flex shrink-0 items-center text-(--chip-icon) me-2';

type ChipVariantProps = VariantProps<typeof chipVariants>;

type ChipProps = Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> &
  ChipVariantProps & {
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
  };

function AssistChip({ className, variant = 'outlined', icon, children, ...props }: ChipProps) {
  return (
    <ButtonPrimitive
      data-chip="assist"
      data-variant={variant}
      data-leading={icon ? '' : undefined}
      className={cn(
        chipVariants({ variant }),
        'text-on-surface [--chip-icon:var(--md-sys-color-primary)]',
        className,
      )}
      {...props}
    >
      <Ripple />
      {icon ? <span className={iconSlot}>{icon}</span> : null}
      {children}
    </ButtonPrimitive>
  );
}

function SuggestionChip({ className, variant = 'outlined', icon, children, ...props }: ChipProps) {
  return (
    <ButtonPrimitive
      data-chip="suggestion"
      data-variant={variant}
      data-leading={icon ? '' : undefined}
      className={cn(
        chipVariants({ variant }),
        'text-on-surface-variant [--chip-icon:var(--md-sys-color-primary)]',
        className,
      )}
      {...props}
    >
      <Ripple />
      {icon ? <span className={iconSlot}>{icon}</span> : null}
      {children}
    </ButtonPrimitive>
  );
}

function CheckmarkGlyph() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
    </svg>
  );
}

function FilterChip({
  className,
  variant = 'outlined',
  icon,
  trailingIcon,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TogglePrimitive>, 'children' | 'className'> &
  ChipVariantProps & {
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
  }) {
  return (
    <TogglePrimitive
      data-chip="filter"
      data-variant={variant}
      data-icon={icon ? '' : undefined}
      data-trailing={trailingIcon ? '' : undefined}
      className={cn(
        chipVariants({ variant }),
        'text-on-surface-variant [--chip-icon:var(--md-sys-color-primary)] [--ripple-pressed-color:var(--md-sys-color-on-secondary-container)]',
        'data-icon:[--chip-leading-space:8px] data-pressed:[--chip-leading-space:8px]',
        'data-pressed:bg-secondary-container data-pressed:text-on-secondary-container data-pressed:[--chip-icon:var(--md-sys-color-on-secondary-container)] data-pressed:[--chip-outline:transparent] data-pressed:[--ripple-pressed-color:var(--md-sys-color-on-surface-variant)]',
        variant === 'outlined' && 'data-pressed:hover:shadow-elevation-1',
        'data-disabled:data-pressed:bg-on-surface/12 data-disabled:data-pressed:text-on-surface/38 data-disabled:data-pressed:[--chip-icon:color-mix(in_srgb,var(--md-sys-color-on-surface)_38%,transparent)]',
        className,
      )}
      {...props}
    >
      <Ripple />
      <span
        data-slot="filter-chip-leading"
        className={cn(
          iconSlot,
          'relative overflow-hidden',
          '[transition:width_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),margin_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial)] motion-reduce:transition-none',
          'block-4.5 inline-4.5 not-group-data-icon/chip:not-group-data-pressed/chip:me-0 not-group-data-icon/chip:not-group-data-pressed/chip:inline-0',
        )}
      >
        {icon ? <span className="flex group-data-pressed/chip:invisible">{icon}</span> : null}
        <span className="invisible absolute inset-s-0 flex group-data-pressed/chip:visible">
          <CheckmarkGlyph />
        </span>
      </span>
      {children}
      {trailingIcon ? (
        <span className="ms-2 flex shrink-0 items-center text-on-surface-variant group-data-disabled/chip:text-on-surface/38 group-data-pressed/chip:text-on-secondary-container">
          {trailingIcon}
        </span>
      ) : null}
    </TogglePrimitive>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 -960 960 960" aria-hidden="true">
      <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
    </svg>
  );
}

function InputChip({
  className,
  icon,
  avatar,
  selected = false,
  disabled = false,
  onRemove,
  removeLabel = 'Remove',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> & {
  avatar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  selected?: boolean;
}) {
  const id = React.useId();
  const labelId = `${id}-label`;
  const removeId = `${id}-remove`;

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    props.onKeyDown?.(event);
    if (!onRemove || disabled || event.defaultPrevented) return;
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      onRemove();
    }
  };

  return (
    <span
      data-slot="input-chip"
      data-selected={selected ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-avatar={avatar ? '' : undefined}
      className={cn(
        'group/chip relative isolate inline-flex shrink-0 items-center whitespace-nowrap select-none',
        'rounded-corner-small type-label-large text-on-surface-variant block-8 data-avatar:rounded-[16px]',
        '[--chip-icon:var(--md-sys-color-on-surface-variant)] [--chip-outline:var(--md-sys-color-outline-variant)]',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-(--chip-outline)',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block-4.5 [&_svg]:inline-4.5 [&_svg:not([class*='fill-'])]:fill-current",
        '[transition:background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects)] motion-reduce:transition-none',
        'has-[>[data-action=primary]:focus-visible]:animate-focus-ring has-[>[data-action=primary]:focus-visible]:outline-(length:--md-sys-state-focus-indicator-thickness) has-[>[data-action=primary]:focus-visible]:outline-offset-(--md-sys-state-focus-indicator-outer-offset) has-[>[data-action=primary]:focus-visible]:outline-secondary has-[>[data-action=primary]:focus-visible]:outline-solid',
        'data-selected:bg-secondary-container data-selected:text-on-secondary-container data-selected:[--chip-icon:var(--md-sys-color-primary)] data-selected:[--chip-outline:transparent]',
        'data-disabled:text-on-surface/38 data-disabled:[--chip-icon:color-mix(in_srgb,var(--md-sys-color-on-surface)_38%,transparent)] data-disabled:[--chip-outline:color-mix(in_srgb,var(--md-sys-color-on-surface)_12%,transparent)] data-disabled:data-selected:bg-on-surface/12',
        className,
      )}
    >
      <ButtonPrimitive
        {...props}
        disabled={disabled}
        data-action="primary"
        onKeyDown={onKeyDown}
        className={cn(
          'flex cursor-pointer items-center self-stretch rounded-[inherit] outline-none',
          'px-4 group-data-avatar/chip:ps-1 data-disabled:cursor-default',
          icon ? 'ps-2' : null,
          onRemove ? 'pe-0' : null,
        )}
      >
        <Ripple />
        {avatar ? (
          <span className="me-2 flex shrink-0 items-center justify-center overflow-hidden rounded-full block-6 inline-6 group-data-disabled/chip:opacity-38 [&>img]:object-cover [&>img]:block-full [&>img]:inline-full">
            {avatar}
          </span>
        ) : null}
        {!avatar && icon ? <span className={iconSlot}>{icon}</span> : null}
        <span id={labelId}>{children}</span>
      </ButtonPrimitive>
      {onRemove ? (
        <ButtonPrimitive
          data-action="remove"
          aria-labelledby={`${removeId} ${labelId}`}
          disabled={disabled}
          onClick={onRemove}
          className={cn(
            'relative mx-1.25 flex shrink-0 cursor-pointer items-center justify-center rounded-full block-6 inline-6',
            'focus-ring text-(--chip-icon) group-data-selected/chip:text-on-secondary-container',
            'after:absolute after:-inset-x-1.25 after:-inset-y-3 data-disabled:cursor-default',
          )}
        >
          <Ripple />
          <span id={removeId} hidden>
            {removeLabel}
          </span>
          <CloseGlyph />
        </ButtonPrimitive>
      ) : null}
    </span>
  );
}

function ChipSet({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="chip-set" className={cn('flex flex-wrap gap-2', className)} {...props} />;
}

function FilterChipGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToggleGroupPrimitive>, 'className'> & { className?: string }) {
  return <ToggleGroupPrimitive className={cn('flex flex-wrap gap-2', className)} {...props} />;
}

export {
  AssistChip,
  ChipSet,
  chipVariants,
  FilterChip,
  FilterChipGroup,
  InputChip,
  SuggestionChip,
};
