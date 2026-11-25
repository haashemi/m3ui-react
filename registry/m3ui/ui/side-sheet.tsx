'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  type DrawerProps,
} from '@ui-sdk/react/drawer';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

// Expressive default spatial spring (stiffness 380, damping 0.8) as a period in seconds.
const sheetPhysics = { response: (2 * Math.PI) / Math.sqrt(380), dampingRatio: 0.8 };

type SideSheetSide = 'start' | 'end';

type SideSheetContextValue = { modal: true } | { modal: false; close: () => void };

const SideSheetContext = React.createContext<SideSheetContextValue>({ modal: true });

function SideSheet({
  side = 'end',
  physics,
  ...props
}: Omit<DrawerProps, 'side'> & { side?: SideSheetSide }) {
  return <Drawer side={side} physics={{ ...sheetPhysics, ...physics }} {...props} />;
}

const SideSheetTrigger = DrawerTrigger;

const sideSheetContentVariants = cva(
  [
    'flex flex-col bg-surface-container-low pbe-5 text-on-surface shadow-elevation-1 outline-none',
    '[--side-sheet-width:320px] inline-(--side-sheet-width) max-inline-[calc(100%-56px)]',
  ],
  {
    variants: {
      detached: {
        true: 'm-4 rounded-corner-large block-[calc(100%-32px)]',
        false:
          'block-full data-[side=left]:rounded-r-corner-large data-[side=right]:rounded-l-corner-large',
      },
    },
    defaultVariants: { detached: false },
  },
);

const modalContext: SideSheetContextValue = { modal: true };

function SideSheetContent({
  className,
  detached = false,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DrawerContent>, 'className' | 'children'> & {
  className?: string;
  detached?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      <DrawerBackdrop className="fixed inset-0 bg-scrim/32" />
      <DrawerContent
        data-detached={detached ? '' : undefined}
        className={cn(sideSheetContentVariants({ detached }), className)}
        {...props}
      >
        <SideSheetContext value={modalContext}>{children}</SideSheetContext>
      </DrawerContent>
    </>
  );
}

function StandardSideSheet({
  className,
  open,
  defaultOpen = true,
  onOpenChange,
  side = 'end',
  divider = true,
  children,
  ...props
}: React.ComponentProps<'aside'> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: SideSheetSide;
  divider?: boolean;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const controlled = open !== undefined;

  const context = React.useMemo<SideSheetContextValue>(
    () => ({
      modal: false,
      close: () => {
        if (!controlled) setUncontrolledOpen(false);
        onOpenChange?.(false);
      },
    }),
    [controlled, onOpenChange],
  );

  return (
    <SideSheetContext value={context}>
      <aside
        data-slot="side-sheet"
        data-side={side}
        data-open={isOpen ? '' : undefined}
        data-closed={isOpen ? undefined : ''}
        inert={!isOpen}
        className={cn(
          'flex shrink-0 overflow-hidden bg-surface text-on-surface [--side-sheet-width:320px]',
          'inline-0 data-open:inline-(--side-sheet-width) data-open:max-inline-full',
          side === 'start' ? 'justify-end' : 'justify-start',
          divider && (side === 'start' ? 'data-open:border-e' : 'data-open:border-s'),
          'border-outline-variant',
          '[transition:inline-size_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial)] motion-reduce:transition-none',
          className,
        )}
        {...props}
      >
        <div
          data-slot="side-sheet-surface"
          className="flex shrink-0 flex-col pbe-5 block-full inline-(--side-sheet-width) max-inline-screen"
        >
          {children}
        </div>
      </aside>
    </SideSheetContext>
  );
}

function SideSheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="side-sheet-header"
      className={cn(
        'flex shrink-0 items-start ps-6 pe-3 pbs-3 pbe-4 has-[>button:first-child]:ps-1 [&>button]:m-1',
        className,
      )}
      {...props}
    />
  );
}

type TextProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  'className' | 'children' | 'style' | 'render'
> & { className?: string; children?: React.ReactNode };

function SideSheetTitle({ className, children, ...props }: TextProps<typeof DrawerTitle>) {
  const { modal } = React.use(SideSheetContext);
  const classes = cn(
    'flex-1 pbs-3 type-title-large wrap-anywhere text-on-surface-variant min-inline-0',
    className,
  );
  if (modal) {
    return (
      <DrawerTitle className={classes} {...props}>
        {children}
      </DrawerTitle>
    );
  }
  return (
    <h2 data-slot="side-sheet-title" className={classes} {...props}>
      {children}
    </h2>
  );
}

function SideSheetDescription({
  className,
  children,
  ...props
}: TextProps<typeof DrawerDescription>) {
  const { modal } = React.use(SideSheetContext);
  const classes = cn('type-body-medium text-on-surface-variant', className);
  if (modal) {
    return (
      <DrawerDescription className={classes} {...props}>
        {children}
      </DrawerDescription>
    );
  }
  return (
    <p data-slot="side-sheet-description" className={classes} {...props}>
      {children}
    </p>
  );
}

function SideSheetClose({
  render,
  onClick,
  value,
  action,
  disabled,
  ...props
}: Omit<React.ComponentProps<typeof DrawerClose>, 'render' | 'onClick' | 'type'> & {
  render?: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const context = React.use(SideSheetContext);
  const element = render ?? <IconButton />;
  const disabledProps = disabled === undefined ? {} : { disabled };
  if (context.modal) {
    return (
      <DrawerClose
        render={element}
        {...(onClick ? { onClick } : {})}
        {...(value === undefined ? {} : { value })}
        {...(action ? { action } : {})}
        {...disabledProps}
        {...props}
      />
    );
  }
  return (
    <ButtonPrimitive
      render={element}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.close();
      }}
      {...disabledProps}
      {...props}
    />
  );
}

function SideSheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="side-sheet-body"
      className={cn('relative flex flex-1 flex-col overflow-y-auto px-6 min-block-0', className)}
      {...props}
    />
  );
}

function SideSheetActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="side-sheet-actions"
      className={cn(
        'mbe-1 flex shrink-0 flex-wrap items-center gap-2 border-bs border-outline-variant px-6 pbs-4',
        className,
      )}
      {...props}
    />
  );
}

export {
  SideSheet,
  SideSheetActions,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetDescription,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
  StandardSideSheet,
};
export type { SideSheetSide };
