'use client';

import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator,
  type CheckboxState,
} from '@ui-sdk/react/checkbox';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Ripple } from '@/registry/m3ui/ui/ripple';

type Mark = 'checked' | 'indeterminate' | 'unchecked';

const CHECKMARK_LONG_WIDTH = `${Math.sqrt(128)}px`;
const SELECT_DURATION_MS = 350;
const EASING_EMPHASIZED_DECELERATE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';

function toMark({ checked, indeterminate }: CheckboxState): Mark {
  if (indeterminate) return 'indeterminate';
  return checked ? 'checked' : 'unchecked';
}

function usePreviousMark(mark: Mark): Mark {
  const [marks, setMarks] = React.useState({ current: mark, previous: mark });
  if (marks.current !== mark) setMarks({ current: mark, previous: marks.current });
  return marks.previous;
}

function CheckboxMark({ state }: { state: CheckboxState }) {
  const mark = toMark(state);
  const previous = usePreviousMark(mark);
  const longRef = React.useRef<SVGRectElement>(null);
  const shape = mark === 'unchecked' ? previous : mark;
  const animated = !state.disabled;

  React.useEffect(() => {
    if (!animated || previous !== 'unchecked' || mark !== 'checked') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const animation = longRef.current?.animate(
      { inlineSize: ['0px', CHECKMARK_LONG_WIDTH] },
      { duration: SELECT_DURATION_MS, easing: EASING_EMPHASIZED_DECELERATE },
    );
    return () => animation?.cancel();
  }, [animated, mark, previous]);

  return (
    <>
      <span
        data-slot="checkbox-outline"
        className={cn(
          'absolute inset-0 rounded-[inherit] border-2 border-(--checkbox-outline)',
          'group-data-checked/checkbox:border-0 group-data-indeterminate/checkbox:border-0',
          'group-data-disabled/checkbox:opacity-38',
        )}
      />
      <span
        data-slot="checkbox-container"
        className={cn(
          'absolute inset-0 scale-60 rounded-[inherit] bg-(--checkbox-container) opacity-0',
          '[transition-property:scale,opacity] duration-[150ms,50ms] ease-[var(--md-sys-motion-easing-emphasized-accelerate),linear]',
          'group-data-checked/checkbox:scale-100 group-data-checked/checkbox:opacity-100 group-data-checked/checkbox:duration-[350ms,50ms] group-data-checked/checkbox:ease-[var(--md-sys-motion-easing-emphasized-decelerate),linear]',
          'group-data-indeterminate/checkbox:scale-100 group-data-indeterminate/checkbox:opacity-100 group-data-indeterminate/checkbox:duration-[350ms,50ms] group-data-indeterminate/checkbox:ease-[var(--md-sys-motion-easing-emphasized-decelerate),linear]',
          'group-data-disabled/checkbox:transition-none group-data-disabled/checkbox:group-data-checked/checkbox:opacity-38 group-data-disabled/checkbox:group-data-indeterminate/checkbox:opacity-38',
          'motion-reduce:transition-none',
        )}
      />
      <svg
        viewBox="0 0 18 18"
        aria-hidden="true"
        data-slot="checkbox-mark"
        data-shape={shape}
        data-selected={mark === 'unchecked' ? undefined : ''}
        data-from-unchecked={previous === 'unchecked' ? '' : undefined}
        className={cn(
          'group/mark absolute inset-0 scale-60 fill-(--checkbox-icon) opacity-0 block-full inline-full',
          '[transition-property:scale,opacity] duration-[150ms,50ms] ease-[var(--md-sys-motion-easing-emphasized-accelerate),linear]',
          'data-selected:scale-100 data-selected:opacity-100 data-selected:duration-[350ms,50ms] data-selected:ease-[var(--md-sys-motion-easing-emphasized-decelerate),linear]',
          'group-data-disabled/checkbox:transition-none motion-reduce:transition-none',
        )}
      >
        <rect
          className={cn(
            '[transition-property:transform,block-size] block-[2px] inline-[2px]',
            'duration-150 ease-emphasized-accelerate group-data-selected/mark:duration-350 group-data-selected/mark:ease-emphasized-decelerate',
            'group-data-[shape=checked]/mark:transform-[scaleY(-1)_translate(7px,-14px)_rotate(45deg)] group-data-[shape=checked]/mark:block-[5.657px]',
            'group-data-[shape=indeterminate]/mark:transform-[scaleY(-1)_translate(4px,-10px)_rotate(0deg)]',
            'group-data-disabled/checkbox:transition-none group-data-from-unchecked/mark:transition-none motion-reduce:transition-none',
          )}
        />
        <rect
          ref={longRef}
          className={cn(
            '[transition-property:transform,inline-size] block-[2px] inline-[10px]',
            'duration-150 ease-emphasized-accelerate group-data-selected/mark:duration-350 group-data-selected/mark:ease-emphasized-decelerate',
            'group-data-[shape=checked]/mark:transform-[scaleY(-1)_translate(7px,-14px)_rotate(45deg)] group-data-[shape=checked]/mark:inline-[11.314px]',
            'group-data-[shape=indeterminate]/mark:transform-[scaleY(-1)_translate(4px,-10px)_rotate(0deg)]',
            'group-data-disabled/checkbox:transition-none group-data-from-unchecked/mark:transition-none motion-reduce:transition-none',
          )}
        />
      </svg>
    </>
  );
}

function Checkbox({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CheckboxPrimitive>, 'children' | 'className'> & {
  className?: string;
}) {
  return (
    <CheckboxPrimitive
      className={cn(
        'group/checkbox relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full select-none block-10 inline-10',
        'focus-ring after:absolute after:-inset-1',
        '[--checkbox-container:var(--md-sys-color-primary)] [--checkbox-icon:var(--md-sys-color-on-primary)] [--checkbox-outline:var(--md-sys-color-on-surface-variant)]',
        '[--ripple-hover-color:var(--md-sys-color-on-surface)] [--ripple-pressed-color:var(--md-sys-color-primary)]',
        'hover:[--checkbox-outline:var(--md-sys-color-on-surface)] focus-visible:[--checkbox-outline:var(--md-sys-color-on-surface)] active:[--checkbox-outline:var(--md-sys-color-on-surface)]',
        'data-checked:[--ripple-hover-color:var(--md-sys-color-primary)] data-checked:[--ripple-pressed-color:var(--md-sys-color-on-surface)]',
        'data-indeterminate:[--ripple-hover-color:var(--md-sys-color-primary)] data-indeterminate:[--ripple-pressed-color:var(--md-sys-color-on-surface)]',
        'aria-invalid:[--checkbox-container:var(--md-sys-color-error)] aria-invalid:[--checkbox-icon:var(--md-sys-color-on-error)] aria-invalid:[--checkbox-outline:var(--md-sys-color-error)] aria-invalid:[--ripple-hover-color:var(--md-sys-color-error)] aria-invalid:[--ripple-pressed-color:var(--md-sys-color-error)]',
        'data-disabled:cursor-default data-disabled:[--checkbox-container:var(--md-sys-color-on-surface)] data-disabled:[--checkbox-icon:var(--md-sys-color-surface)] data-disabled:[--checkbox-outline:var(--md-sys-color-on-surface)]',
        className,
      )}
      {...props}
    >
      <Ripple />
      <CheckboxIndicator
        keepMounted
        className="pointer-events-none relative rounded-[2px] block-4.5 inline-4.5"
      >
        {(state) => <CheckboxMark state={state} />}
      </CheckboxIndicator>
    </CheckboxPrimitive>
  );
}

export { Checkbox };
