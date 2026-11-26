'use client';

import { Toolbar as ToolbarPrimitive } from '@ui-sdk/react/toolbar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  type ToolbarColorProps,
  toolbarColorVariants,
  ToolbarOrientationContext,
  type ToolbarRootProps,
} from '@/registry/m3ui/ui/toolbar';

const dockedToolbarVariants = cva('flex items-center px-4 block-16 inline-full', {
  variants: {
    arrangement: {
      between: 'justify-between gap-1',
      center: 'justify-center gap-8',
    },
  },
  defaultVariants: { arrangement: 'between' },
});

function DockedToolbar({
  className,
  variant = 'standard',
  arrangement = 'between',
  ...props
}: ToolbarRootProps & ToolbarColorProps & VariantProps<typeof dockedToolbarVariants>) {
  return (
    <ToolbarOrientationContext value="horizontal">
      <ToolbarPrimitive
        data-type="docked"
        data-variant={variant}
        className={cn(
          dockedToolbarVariants({ arrangement }),
          toolbarColorVariants({ variant }),
          className,
        )}
        {...props}
      />
    </ToolbarOrientationContext>
  );
}

export { DockedToolbar, dockedToolbarVariants };
