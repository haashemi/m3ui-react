'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const TOUCH_DELAY_MS = 150;
const EASING_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)';

type PressState = 'holding' | 'inactive' | 'touch-delay';

function isDisabled(control: HTMLElement) {
  return control.matches(':disabled, [aria-disabled="true"], [data-disabled]');
}

function growWave(surface: HTMLElement, wave: HTMLElement, event?: PointerEvent) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rect = surface.getBoundingClientRect();
  const maxDimension = Math.max(rect.width, rect.height);
  const softEdge = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDimension, SOFT_EDGE_MINIMUM_SIZE);
  const initialSize = Math.max(Math.floor(maxDimension * INITIAL_ORIGIN_SCALE), 1);
  const scale = (Math.hypot(rect.width, rect.height) + PADDING + softEdge) / initialSize;
  const endX = (rect.width - initialSize) / 2;
  const endY = (rect.height - initialSize) / 2;
  const startX = event ? event.clientX - rect.left - initialSize / 2 : endX;
  const startY = event ? event.clientY - rect.top - initialSize / 2 : endY;

  wave.style.width = `${initialSize}px`;
  wave.style.height = `${initialSize}px`;
  return wave.animate(
    {
      transform: [
        `translate(${startX}px, ${startY}px) scale(1)`,
        `translate(${endX}px, ${endY}px) scale(${scale})`,
      ],
    },
    { duration: reduce ? 0 : PRESS_GROW_MS, easing: EASING_STANDARD, fill: 'forwards' },
  );
}

function attachRipple(control: HTMLElement, surface: HTMLElement, wave: HTMLElement) {
  let state: PressState = 'inactive';
  let pressToken = 0;
  let pressStartedAt = 0;
  let touchTimer: ReturnType<typeof setTimeout> | undefined = undefined;
  let growAnimation: Animation | undefined = undefined;

  const startPress = (event?: PointerEvent) => {
    surface.dataset['ripplePressed'] = '';
    pressToken += 1;
    pressStartedAt = performance.now();
    growAnimation?.cancel();
    growAnimation = growWave(surface, wave, event);
  };

  const endPress = () => {
    clearTimeout(touchTimer);
    state = 'inactive';
    const token = pressToken;
    const remaining = MINIMUM_PRESS_MS - (performance.now() - pressStartedAt);
    setTimeout(
      () => {
        if (token === pressToken) delete surface.dataset['ripplePressed'];
      },
      Math.max(remaining, 0),
    );
  };

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') surface.dataset['rippleHovered'] = '';
  };

  const onPointerLeave = () => {
    delete surface.dataset['rippleHovered'];
    if (state !== 'inactive') endPress();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (isDisabled(control) || !event.isPrimary || event.button !== 0) return;
    if (event.pointerType !== 'touch') {
      state = 'holding';
      startPress(event);
      return;
    }
    state = 'touch-delay';
    touchTimer = setTimeout(() => {
      if (state !== 'touch-delay') return;
      state = 'holding';
      startPress(event);
    }, TOUCH_DELAY_MS);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (state === 'touch-delay') startPress(event);
    if (state !== 'inactive') endPress();
  };

  const onClick = (event: MouseEvent) => {
    if (event.detail !== 0 || state !== 'inactive' || isDisabled(control)) return;
    startPress();
    endPress();
  };

  control.addEventListener('pointerenter', onPointerEnter);
  control.addEventListener('pointerleave', onPointerLeave);
  control.addEventListener('pointerdown', onPointerDown);
  control.addEventListener('pointerup', onPointerUp);
  control.addEventListener('pointercancel', endPress);
  control.addEventListener('contextmenu', endPress);
  control.addEventListener('click', onClick);

  return () => {
    clearTimeout(touchTimer);
    growAnimation?.cancel();
    control.removeEventListener('pointerenter', onPointerEnter);
    control.removeEventListener('pointerleave', onPointerLeave);
    control.removeEventListener('pointerdown', onPointerDown);
    control.removeEventListener('pointerup', onPointerUp);
    control.removeEventListener('pointercancel', endPress);
    control.removeEventListener('contextmenu', endPress);
    control.removeEventListener('click', onClick);
  };
}

function Ripple({ className, ...props }: Omit<React.ComponentProps<'span'>, 'children'>) {
  const surfaceRef = React.useRef<HTMLSpanElement>(null);
  const waveRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const surface = surfaceRef.current;
    const wave = waveRef.current;
    const control = surface?.parentElement;
    if (!surface || !wave || !control) return undefined;
    return attachRipple(control, surface, wave);
  }, []);

  return (
    <span
      {...props}
      ref={surfaceRef}
      aria-hidden="true"
      data-slot="ripple"
      className={cn(
        'group/ripple pointer-events-none absolute inset-0 -z-1 overflow-hidden rounded-[inherit]',
        'before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-15 before:ease-linear',
        'data-ripple-hovered:before:opacity-(--md-sys-state-hover-state-layer-opacity)',
        '[:focus-visible>&]:before:opacity-(--md-sys-state-focus-state-layer-opacity)',
        '[:disabled>&]:hidden [[aria-disabled=true]>&]:hidden [[data-disabled]>&]:hidden',
        className,
      )}
    >
      <span
        ref={waveRef}
        data-slot="ripple-wave"
        className={cn(
          'absolute inset-s-0 inset-bs-0 rounded-full opacity-0 transition-opacity duration-375 ease-linear',
          '[background:radial-gradient(closest-side,currentColor_max(calc(100%-70px),65%),transparent_100%)]',
          'group-data-ripple-pressed/ripple:opacity-(--md-sys-state-pressed-state-layer-opacity) group-data-ripple-pressed/ripple:duration-105',
        )}
      />
    </span>
  );
}

export { Ripple };
