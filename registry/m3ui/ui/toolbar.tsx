'use client';

import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import {
  Toggle as TogglePrimitive,
  ToggleGroup as ToggleGroupPrimitive,
} from '@ui-sdk/react/toggle';
import {
  Toolbar as ToolbarPrimitive,
  ToolbarButton as ToolbarButtonPrimitive,
} from '@ui-sdk/react/toolbar';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/registry/m3ui/ui/button';
import { fabVariants } from '@/registry/m3ui/ui/fab';
import { iconButtonVariants, toggleIconButtonVariants } from '@/registry/m3ui/ui/icon-button';
import { Ripple } from '@/registry/m3ui/ui/ripple';

type ToolbarOrientation = 'horizontal' | 'vertical';

const ToolbarOrientationContext = React.createContext<ToolbarOrientation | undefined>(undefined);

const toolbarColorVariants = cva('', {
  variants: {
    variant: {
      standard:
        'bg-surface-container [--toolbar-icon:var(--md-sys-color-on-surface-variant)] [--toolbar-selected-container:var(--md-sys-color-secondary-container)] [--toolbar-selected-icon:var(--md-sys-color-on-secondary-container)]',
      vibrant:
        'bg-primary-container [--toolbar-icon:var(--md-sys-color-on-primary-container)] [--toolbar-selected-container:var(--md-sys-color-surface-container)] [--toolbar-selected-icon:var(--md-sys-color-on-surface)]',
    },
  },
  defaultVariants: { variant: 'standard' },
});

type ToolbarColorProps = VariantProps<typeof toolbarColorVariants>;

type ToolbarRootProps = Omit<
  React.ComponentProps<typeof ToolbarPrimitive>,
  'children' | 'className' | 'orientation'
> & { children?: React.ReactNode; className?: string };

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

const floatingToolbarVariants = cva([
  'group/toolbar relative inline-flex shrink-0 rounded-[32px] shadow-elevation-3',
  'data-[orientation=horizontal]:px-2 data-[orientation=horizontal]:block-16 data-[orientation=horizontal]:inline-[calc(var(--floating-toolbar-size)+16px)]',
  'data-[orientation=vertical]:flex-col data-[orientation=vertical]:py-2 data-[orientation=vertical]:block-[calc(var(--floating-toolbar-size)+16px)] data-[orientation=vertical]:inline-16',
  'data-collapsed:opacity-0 data-collapsed:data-[orientation=horizontal]:px-0 data-collapsed:data-[orientation=horizontal]:inline-0 data-collapsed:data-[orientation=vertical]:py-0 data-collapsed:data-[orientation=vertical]:block-0',
  '[transition:width_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial),height_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial),padding_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial),opacity_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects),background-color_var(--md-sys-motion-spring-default-effects-duration)_var(--md-sys-motion-spring-default-effects)]',
  'motion-reduce:transition-none',
]);

function useContentSize(vertical: boolean) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const content = contentRef.current;
    const root = content?.parentElement?.parentElement;
    if (!content || !root) return undefined;
    const update = () => {
      const size = vertical ? content.offsetHeight : content.offsetWidth;
      root.style.setProperty('--floating-toolbar-size', `${size}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(content);
    return () => observer.disconnect();
  }, [vertical]);

  return contentRef;
}

function FloatingToolbar({
  className,
  variant = 'standard',
  orientation,
  expanded = true,
  children,
  ...props
}: ToolbarRootProps &
  ToolbarColorProps & {
    orientation?: ToolbarOrientation;
    expanded?: boolean;
  }) {
  const layoutOrientation = React.use(ToolbarOrientationContext);
  const resolved = orientation ?? layoutOrientation ?? 'horizontal';
  const contentRef = useContentSize(resolved === 'vertical');
  return (
    <ToolbarOrientationContext value={resolved}>
      <ToolbarPrimitive
        orientation={resolved}
        data-type="floating"
        data-variant={variant}
        data-collapsed={expanded ? undefined : ''}
        inert={!expanded}
        className={cn(floatingToolbarVariants(), toolbarColorVariants({ variant }), className)}
        {...props}
      >
        <div
          data-slot="floating-toolbar-viewport"
          className={cn(
            'flex flex-1 overflow-hidden min-block-0 min-inline-0',
            'group-data-[orientation=horizontal]/toolbar:-mx-2 group-data-[orientation=horizontal]/toolbar:items-center group-data-[orientation=horizontal]/toolbar:px-2',
            'group-data-[orientation=vertical]/toolbar:-my-2 group-data-[orientation=vertical]/toolbar:flex-col group-data-[orientation=vertical]/toolbar:items-center group-data-[orientation=vertical]/toolbar:py-2',
          )}
        >
          <div
            ref={contentRef}
            data-slot="floating-toolbar-content"
            className="flex shrink-0 items-center gap-1 group-data-[orientation=horizontal]/toolbar:inline-max group-data-[orientation=vertical]/toolbar:flex-col group-data-[orientation=vertical]/toolbar:block-max"
          >
            {children}
          </div>
        </div>
      </ToolbarPrimitive>
    </ToolbarOrientationContext>
  );
}

function FloatingToolbarLayout({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'div'> & { orientation?: ToolbarOrientation }) {
  return (
    <ToolbarOrientationContext value={orientation}>
      <div
        data-slot="floating-toolbar-layout"
        data-orientation={orientation}
        className={cn(
          'inline-flex items-center gap-2 has-[>[data-collapsed]]:gap-0 data-[orientation=vertical]:flex-col',
          '[transition:gap_var(--md-sys-motion-spring-default-spatial-duration)_var(--md-sys-motion-spring-default-spatial)] motion-reduce:transition-none',
          className,
        )}
        {...props}
      />
    </ToolbarOrientationContext>
  );
}

const toolbarFabVariants = cva('', {
  variants: {
    variant: {
      standard: 'bg-secondary-container text-on-secondary-container',
      vibrant: 'bg-tertiary-container text-on-tertiary-container',
    },
    size: {
      default: 'shadow-elevation-1 hover:shadow-elevation-2',
      medium: 'shadow-elevation-2 hover:shadow-elevation-3',
    },
  },
  defaultVariants: { variant: 'standard', size: 'default' },
});

function ToolbarFab({
  className,
  variant = 'standard',
  size = 'default',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children' | 'className'> &
  VariantProps<typeof toolbarFabVariants> & { children?: React.ReactNode; className?: string }) {
  return (
    <ButtonPrimitive
      data-variant={variant}
      data-size={size}
      className={cn(fabVariants({ size }), toolbarFabVariants({ variant, size }), className)}
      {...props}
    >
      <Ripple />
      {children}
    </ButtonPrimitive>
  );
}

type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

function ToolbarIconButton({
  className,
  variant = 'standard',
  size = 'sm',
  width = 'default',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarButtonPrimitive>, 'children' | 'className'> &
  IconButtonVariantProps & { children?: React.ReactNode; className?: string }) {
  return (
    <ToolbarButtonPrimitive
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-shape={shape}
      className={cn(
        iconButtonVariants({ variant, size, width, shape }),
        variant === 'standard' && 'text-(--toolbar-icon)',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </ToolbarButtonPrimitive>
  );
}

function ToolbarToggleIconButton({
  className,
  variant = 'standard',
  size = 'sm',
  width = 'default',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof TogglePrimitive>, 'children' | 'className'> &
  IconButtonVariantProps & { children?: React.ReactNode; className?: string }) {
  return (
    <TogglePrimitive
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-shape={shape}
      className={cn(
        iconButtonVariants({ variant, size, width, shape }),
        toggleIconButtonVariants({ variant }),
        variant === 'standard' &&
          'text-(--toolbar-icon) data-pressed:bg-(--toolbar-selected-container) data-pressed:text-(--toolbar-selected-icon) data-disabled:data-pressed:bg-on-surface/10',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </TogglePrimitive>
  );
}

function ToolbarButton({
  className,
  variant = 'text',
  size = 'sm',
  shape = 'round',
  children,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarButtonPrimitive>, 'children' | 'className'> &
  VariantProps<typeof buttonVariants> & { children?: React.ReactNode; className?: string }) {
  return (
    <ToolbarButtonPrimitive
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn(
        buttonVariants({ variant, size, shape }),
        variant === 'text' && 'text-(--toolbar-icon)',
        className,
      )}
      {...props}
    >
      <Ripple />
      {children}
    </ToolbarButtonPrimitive>
  );
}

function ToolbarToggleGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToggleGroupPrimitive>, 'className' | 'orientation'> & {
  className?: string;
}) {
  const orientation = React.use(ToolbarOrientationContext) ?? 'horizontal';
  return (
    <ToggleGroupPrimitive
      orientation={orientation}
      className={cn('flex items-center gap-1 data-[orientation=vertical]:flex-col', className)}
      {...props}
    />
  );
}

export {
  DockedToolbar,
  dockedToolbarVariants,
  FloatingToolbar,
  FloatingToolbarLayout,
  floatingToolbarVariants,
  ToolbarButton,
  toolbarColorVariants,
  ToolbarFab,
  toolbarFabVariants,
  ToolbarIconButton,
  ToolbarToggleGroup,
  ToolbarToggleIconButton,
};
