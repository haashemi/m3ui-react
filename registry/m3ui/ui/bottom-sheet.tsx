'use client';

import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerTitle,
  DrawerTrigger,
  type DrawerProps,
} from '@ui-sdk/react/drawer';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Expressive default spatial spring (stiffness 380, damping 0.8) as a period in seconds.
const sheetPhysics = { response: (2 * Math.PI) / Math.sqrt(380), dampingRatio: 0.8 };

const BottomSheetContext = React.createContext({ resizable: false });

function BottomSheet({ physics, snapPoints, ...props }: Omit<DrawerProps, 'side'>) {
  const resizable = (snapPoints?.length ?? 0) > 1;
  const context = React.useMemo(() => ({ resizable }), [resizable]);
  return (
    <BottomSheetContext value={context}>
      <Drawer
        side="bottom"
        physics={{ ...sheetPhysics, ...physics }}
        {...(snapPoints ? { snapPoints } : {})}
        {...props}
      />
    </BottomSheetContext>
  );
}

const BottomSheetTrigger = DrawerTrigger;

function BottomSheetDragHandle({ label }: { label: string }) {
  const { resizable } = React.use(BottomSheetContext);
  const bar = 'block rounded-full bg-on-surface-variant/40 block-1 inline-8';
  return (
    <div data-slot="bottom-sheet-header" className="flex shrink-0 justify-center py-4">
      {resizable ? (
        <DrawerHandle
          aria-label={label}
          className={cn(
            bar,
            'relative focus-ring cursor-grab before:absolute before:-inset-x-2 before:inset-y-[-22px]',
          )}
        />
      ) : (
        <span aria-hidden="true" className={bar} />
      )}
    </div>
  );
}

function BottomSheetContent({
  className,
  dragHandle = true,
  dragHandleLabel = 'Resize',
  children,
  ...props
}: Omit<React.ComponentProps<typeof DrawerContent>, 'className' | 'children'> & {
  className?: string;
  dragHandle?: boolean;
  dragHandleLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <DrawerBackdrop className="fixed inset-0 bg-scrim/32" />
      <DrawerContent
        className={cn(
          'relative mx-auto flex flex-col rounded-t-corner-extra-large bg-surface-container-low text-on-surface shadow-elevation-1 outline-none',
          'inline-full max-block-dvh max-inline-160',
          'after:absolute after:inset-x-0 after:inset-bs-full after:bg-inherit after:block-24',
          !dragHandle && 'pbs-6',
          className,
        )}
        {...props}
      >
        {dragHandle ? <BottomSheetDragHandle label={dragHandleLabel} /> : null}
        {children}
      </DrawerContent>
    </>
  );
}

function BottomSheetTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DrawerTitle>, 'className'> & { className?: string }) {
  return (
    <DrawerTitle className={cn('px-6 type-title-large text-on-surface', className)} {...props} />
  );
}

function BottomSheetDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DrawerDescription>, 'className'> & { className?: string }) {
  return (
    <DrawerDescription
      className={cn('px-6 type-body-medium text-on-surface-variant', className)}
      {...props}
    />
  );
}

const BottomSheetClose = DrawerClose;

export {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
  BottomSheetTrigger,
};
