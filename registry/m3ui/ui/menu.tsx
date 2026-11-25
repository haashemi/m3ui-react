'use client';

import {
  Menu,
  MenuCheckboxItem as MenuCheckboxItemPrimitive,
  MenuContent as MenuContentPrimitive,
  MenuContextTrigger,
  MenuGroup as MenuGroupPrimitive,
  MenuGroupLabel as MenuGroupLabelPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuItemIcon,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem as MenuRadioItemPrimitive,
  MenuSeparator as MenuSeparatorPrimitive,
  MenuSub,
  MenuSubContent as MenuSubContentPrimitive,
  MenuSubTrigger as MenuSubTriggerPrimitive,
  MenuTrigger,
} from '@ui-sdk/react/menu';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const menuContentVariants = cva(
  [
    'm-0 flex flex-col gap-0.5 overflow-y-auto overscroll-contain rounded-corner-large border-0 p-0 outline-none',
    'bg-(--menu-container) py-0.5 max-block-(--available-height) max-inline-70 min-inline-28',
    'has-[>[data-slot=menu-group]]:bg-transparent has-[>[data-slot=menu-group]]:py-0',
    'filter-[drop-shadow(0_1px_2px_color-mix(in_srgb,var(--md-sys-color-shadow)_30%,transparent))_drop-shadow(0_2px_6px_color-mix(in_srgb,var(--md-sys-color-shadow)_15%,transparent))]',
    'origin-(--transform-origin) [transition:scale_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),opacity_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects)]',
    'data-ending-style:scale-80 data-ending-style:opacity-0 data-starting-style:scale-80 data-starting-style:opacity-0',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        standard: [
          '[--menu-container:var(--md-sys-color-surface-container-low)] [--menu-content:var(--md-sys-color-on-surface)] [--menu-muted:var(--md-sys-color-on-surface-variant)]',
          '[--menu-icon-active:var(--md-sys-color-on-surface-variant)] [--menu-selected-container:var(--md-sys-color-tertiary-container)] [--menu-selected-content:var(--md-sys-color-on-tertiary-container)]',
          '[--menu-disabled:var(--md-sys-color-on-surface)] [--menu-divider:var(--md-sys-color-outline-variant)]',
        ],
        vibrant: [
          '[--menu-container:var(--md-sys-color-tertiary-container)] [--menu-content:var(--md-sys-color-on-tertiary-container)] [--menu-muted:var(--md-sys-color-on-tertiary-container)]',
          '[--menu-icon-active:var(--md-sys-color-tertiary)] [--menu-selected-container:var(--md-sys-color-tertiary)] [--menu-selected-content:var(--md-sys-color-on-tertiary)]',
          '[--menu-disabled:var(--md-sys-color-on-tertiary-container)] [--menu-divider:color-mix(in_srgb,var(--md-sys-color-on-tertiary-container)_24%,transparent)]',
        ],
      },
    },
  },
);

type MenuVariant = NonNullable<VariantProps<typeof menuContentVariants>['variant']>;

function MenuContent({
  className,
  variant = 'standard',
  sideOffset = 4,
  ...props
}: Omit<React.ComponentProps<typeof MenuContentPrimitive>, 'className'> & {
  className?: string;
  variant?: MenuVariant;
}) {
  return (
    <MenuContentPrimitive
      data-variant={variant}
      sideOffset={sideOffset}
      className={cn(menuContentVariants({ variant }), className)}
      {...props}
    />
  );
}

function MenuSubContent({
  className,
  variant,
  sideOffset = 4,
  alignOffset = -4,
  ...props
}: Omit<React.ComponentProps<typeof MenuSubContentPrimitive>, 'className'> & {
  className?: string;
  variant?: MenuVariant;
}) {
  return (
    <MenuSubContentPrimitive
      data-variant={variant}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn(menuContentVariants({ variant }), className)}
      {...props}
    />
  );
}

function MenuGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof MenuGroupPrimitive>, 'className'> & { className?: string }) {
  return (
    <MenuGroupPrimitive
      className={cn(
        'flex shrink-0 flex-col bg-(--menu-container) py-0.5',
        'rounded-corner-small focus-within:rounded-corner-large hover:rounded-corner-large',
        '[transition:border-radius_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial)] motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
}

function MenuGroupLabel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof MenuGroupLabelPrimitive>, 'className'> & {
  className?: string;
}) {
  return (
    <MenuGroupLabelPrimitive
      className={cn(
        'flex items-center px-4 pbs-1.5 type-label-large text-(--menu-muted) block-8',
        className,
      )}
      {...props}
    />
  );
}

function MenuSeparator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof MenuSeparatorPrimitive>, 'className'> & {
  className?: string;
}) {
  return (
    <MenuSeparatorPrimitive
      className={cn('mx-4 my-2 shrink-0 bg-(--menu-divider) block-px', className)}
      {...props}
    />
  );
}

const menuItemClasses = [
  'group/menu-item relative isolate mx-1 my-0.5 flex shrink-0 cursor-pointer items-center gap-3 px-3 py-2 outline-none select-none min-block-11',
  'type-label-large text-(--menu-content) [--item-icon:var(--menu-muted)] [--item-muted:var(--menu-muted)]',
  'rounded-t-(--item-top) rounded-b-(--item-bottom) [--item-bottom:var(--md-sys-shape-corner-extra-small)] [--item-top:var(--md-sys-shape-corner-extra-small)]',
  'first:[--item-top:var(--md-sys-shape-corner-medium)] last:[--item-bottom:var(--md-sys-shape-corner-medium)] [[data-slot=menu-group-label]+&]:[--item-top:var(--md-sys-shape-corner-medium)]',
  '[transition:border-radius_var(--md-sys-motion-spring-fast-spatial-duration)_var(--md-sys-motion-spring-fast-spatial),background-color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects),color_var(--md-sys-motion-spring-fast-effects-duration)_var(--md-sys-motion-spring-fast-effects)]',
  'motion-reduce:transition-none',
  'not-data-checked:hover:[--item-icon:var(--menu-icon-active)] not-data-checked:data-highlighted:[--item-icon:var(--menu-icon-active)]',
  'focus-visible:animate-focus-ring focus-visible:outline-(length:--md-sys-state-focus-indicator-thickness) focus-visible:outline-offset-(--md-sys-state-focus-indicator-inner-offset) focus-visible:outline-secondary focus-visible:outline-solid',
  'data-checked:bg-(--menu-selected-container) data-checked:text-(--menu-selected-content) data-checked:[--item-bottom:var(--md-sys-shape-corner-medium)] data-checked:[--item-icon:var(--menu-selected-content)] data-checked:[--item-muted:var(--menu-selected-content)] data-checked:[--item-top:var(--md-sys-shape-corner-medium)]',
  'data-disabled:cursor-default data-disabled:text-(--menu-disabled)/38 data-disabled:[--item-icon:color-mix(in_srgb,var(--menu-disabled)_38%,transparent)] data-disabled:[--item-muted:color-mix(in_srgb,var(--menu-disabled)_38%,transparent)]',
  'data-checked:data-disabled:bg-(--menu-selected-container)/38 data-checked:data-disabled:text-(--menu-selected-content)/38 data-checked:data-disabled:[--item-icon:color-mix(in_srgb,var(--menu-selected-content)_38%,transparent)] data-checked:data-disabled:[--item-muted:color-mix(in_srgb,var(--menu-selected-content)_38%,transparent)]',
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block-5 [&_svg]:inline-5 [&_svg:not([class*='fill-'])]:fill-current",
  '[&>[data-slot=menu-shortcut]]:ms-auto [&>[data-slot=menu-shortcut]]:type-label-large [&>[data-slot=menu-shortcut]]:text-(--item-muted)',
];

const leadingClasses = 'flex shrink-0 items-center text-(--item-icon)';

interface MenuItemSlots {
  icon?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  trailingText?: React.ReactNode;
}

function MenuItemBody({
  children,
  supportingText,
  trailingText,
  trailingIcon,
}: Omit<MenuItemSlots, 'icon'> & { children?: React.ReactNode }) {
  return (
    <>
      <span className="flex flex-1 flex-col min-inline-0">
        <span className="truncate">{children}</span>
        {supportingText ? (
          <span className="type-body-small text-(--item-muted)">{supportingText}</span>
        ) : null}
      </span>
      {trailingText ? (
        <span className="shrink-0 type-label-large text-(--item-muted)">{trailingText}</span>
      ) : null}
      {trailingIcon ? (
        <span aria-hidden="true" className={leadingClasses}>
          {trailingIcon}
        </span>
      ) : null}
    </>
  );
}

function MenuItem({
  className,
  icon,
  supportingText,
  trailingIcon,
  trailingText,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuItemPrimitive>, 'children' | 'className'> &
  MenuItemSlots & { children?: React.ReactNode; className?: string }) {
  return (
    <MenuItemPrimitive className={cn(menuItemClasses, className)} {...props}>
      <Ripple />
      {icon ? <MenuItemIcon className={leadingClasses}>{icon}</MenuItemIcon> : null}
      <MenuItemBody
        supportingText={supportingText}
        trailingIcon={trailingIcon}
        trailingText={trailingText}
      >
        {children}
      </MenuItemBody>
    </MenuItemPrimitive>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 -960 960 960" aria-hidden="true">
      <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
    </svg>
  );
}

function SelectionLeading({ icon }: { icon: React.ReactNode }) {
  return icon ? (
    <MenuItemIcon className={leadingClasses}>{icon}</MenuItemIcon>
  ) : (
    <MenuItemIndicator className={leadingClasses}>
      <CheckGlyph />
    </MenuItemIndicator>
  );
}

function MenuCheckboxItem({
  className,
  icon,
  supportingText,
  trailingIcon,
  trailingText,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuCheckboxItemPrimitive>, 'children' | 'className'> &
  MenuItemSlots & { children?: React.ReactNode; className?: string }) {
  return (
    <MenuCheckboxItemPrimitive className={cn(menuItemClasses, className)} {...props}>
      <Ripple />
      <SelectionLeading icon={icon} />
      <MenuItemBody
        supportingText={supportingText}
        trailingIcon={trailingIcon}
        trailingText={trailingText}
      >
        {children}
      </MenuItemBody>
    </MenuCheckboxItemPrimitive>
  );
}

function MenuRadioItem({
  className,
  icon,
  supportingText,
  trailingIcon,
  trailingText,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuRadioItemPrimitive>, 'children' | 'className'> &
  MenuItemSlots & { children?: React.ReactNode; className?: string }) {
  return (
    <MenuRadioItemPrimitive className={cn(menuItemClasses, className)} {...props}>
      <Ripple />
      <SelectionLeading icon={icon} />
      <MenuItemBody
        supportingText={supportingText}
        trailingIcon={trailingIcon}
        trailingText={trailingText}
      >
        {children}
      </MenuItemBody>
    </MenuRadioItemPrimitive>
  );
}

function SubmenuGlyph() {
  return (
    <svg viewBox="0 -960 960 960" aria-hidden="true" className="rtl:-scale-x-100">
      <path d="M420-308q-8 0-14-5.5t-6-14.5v-304q0-9 6-14.5t14-5.5q2 0 14 6l145 145q5 5 7 10t2 11q0 6-2 11t-7 10L434-314q-3 3-6.5 4.5T420-308Z" />
    </svg>
  );
}

function MenuSubTrigger({
  className,
  icon,
  supportingText,
  trailingText,
  trailingIcon,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuSubTriggerPrimitive>, 'children' | 'className'> &
  MenuItemSlots & { children?: React.ReactNode; className?: string }) {
  return (
    <MenuSubTriggerPrimitive
      className={cn(
        menuItemClasses,
        'aria-expanded:bg-current/8 aria-expanded:[--item-icon:var(--menu-icon-active)]',
        className,
      )}
      {...props}
    >
      <Ripple />
      {icon ? <MenuItemIcon className={leadingClasses}>{icon}</MenuItemIcon> : null}
      <MenuItemBody
        supportingText={supportingText}
        trailingIcon={trailingIcon ?? <SubmenuGlyph />}
        trailingText={trailingText}
      >
        {children}
      </MenuItemBody>
    </MenuSubTriggerPrimitive>
  );
}

export {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  menuContentVariants,
  MenuContextTrigger,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
};
