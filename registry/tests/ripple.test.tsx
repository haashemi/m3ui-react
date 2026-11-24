import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vite-plus/test';

import { Ripple } from '@/registry/m3ui/ui/ripple';

function setup() {
  render(
    <button type="button">
      <Ripple />
      Press
    </button>,
  );
  const button = screen.getByRole('button');
  const surface = button.querySelector<HTMLElement>('[data-slot=ripple]');
  if (!surface) throw new Error('Ripple surface missing');
  return { button, surface };
}

describe(Ripple, () => {
  it('shows the hover layer for mouse pointers only', () => {
    const { button, surface } = setup();
    fireEvent.pointerEnter(button, { pointerType: 'touch' });
    expect(surface.hasAttribute('data-ripple-hovered')).toBe(false);
    fireEvent.pointerEnter(button, { pointerType: 'mouse' });
    expect(surface.hasAttribute('data-ripple-hovered')).toBe(true);
    fireEvent.pointerLeave(button);
    expect(surface.hasAttribute('data-ripple-hovered')).toBe(false);
  });

  it('holds the pressed layer for the minimum press duration', () => {
    vi.useFakeTimers();
    const { button, surface } = setup();
    fireEvent.pointerDown(button, { pointerType: 'mouse', isPrimary: true, button: 0 });
    expect(surface.hasAttribute('data-ripple-pressed')).toBe(true);
    fireEvent.pointerUp(button, { pointerType: 'mouse' });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(surface.hasAttribute('data-ripple-pressed')).toBe(true);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(surface.hasAttribute('data-ripple-pressed')).toBe(false);
    vi.useRealTimers();
  });

  it('ripples from the center on keyboard activation', () => {
    vi.useFakeTimers();
    const { button, surface } = setup();
    fireEvent.click(button, { detail: 0 });
    expect(surface.hasAttribute('data-ripple-pressed')).toBe(true);
    vi.useRealTimers();
  });
});
