import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vite-plus/test';

import {
  DockedToolbar,
  FloatingToolbar,
  FloatingToolbarLayout,
  ToolbarFab,
  ToolbarIconButton,
  ToolbarToggleGroup,
  ToolbarToggleIconButton,
} from '@/registry/m3ui/ui/toolbar';

describe(FloatingToolbar, () => {
  it('renders a named toolbar with one tab stop and arrow-key navigation', () => {
    render(
      <FloatingToolbar aria-label="Formatting">
        <ToolbarIconButton aria-label="Undo">
          <svg />
        </ToolbarIconButton>
        <ToolbarToggleIconButton aria-label="Bold">
          <svg />
        </ToolbarToggleIconButton>
      </FloatingToolbar>,
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Formatting' });
    expect(toolbar.dataset['orientation']).toBe('horizontal');
    expect(toolbar.className).toContain('bg-surface-container');

    const undo = screen.getByRole('button', { name: 'Undo' });
    const bold = screen.getByRole('button', { name: 'Bold' });
    expect(undo.tabIndex).toBe(0);
    expect(bold.tabIndex).toBe(-1);
    expect(undo.querySelector('[data-slot=ripple]')).not.toBeNull();

    undo.focus();
    fireEvent.keyDown(undo, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(bold);
    expect(bold.getAttribute('aria-pressed')).toBe('false');
  });

  it('uses the vibrant colors and selected container on toggles', () => {
    render(
      <FloatingToolbar variant="vibrant" aria-label="Tools">
        <ToolbarToggleIconButton aria-label="Draw" defaultPressed>
          <svg />
        </ToolbarToggleIconButton>
      </FloatingToolbar>,
    );
    expect(screen.getByRole('toolbar').className).toContain('bg-primary-container');
    const draw = screen.getByRole('button', { name: 'Draw' });
    expect(draw.dataset['pressed']).toBeDefined();
    expect(draw.className).toContain('data-pressed:bg-(--toolbar-selected-container)');
  });

  it('collapses into an inert, hidden state', () => {
    const { rerender } = render(
      <FloatingToolbarLayout>
        <FloatingToolbar aria-label="Compose">
          <ToolbarIconButton aria-label="Attach">
            <svg />
          </ToolbarIconButton>
        </FloatingToolbar>
        <ToolbarFab aria-label="Add">
          <svg />
        </ToolbarFab>
      </FloatingToolbarLayout>,
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Compose' });
    expect(toolbar.dataset['collapsed']).toBeUndefined();

    rerender(
      <FloatingToolbarLayout>
        <FloatingToolbar aria-label="Compose" expanded={false}>
          <ToolbarIconButton aria-label="Attach">
            <svg />
          </ToolbarIconButton>
        </FloatingToolbar>
        <ToolbarFab aria-label="Add">
          <svg />
        </ToolbarFab>
      </FloatingToolbarLayout>,
    );
    expect(toolbar.dataset['collapsed']).toBe('');
    expect(toolbar.hasAttribute('inert')).toBe(true);
    expect(screen.getByRole('button', { name: 'Add' }).className).toContain(
      'bg-secondary-container',
    );
  });

  it('takes its orientation from the layout and passes it to toggle groups', () => {
    render(
      <FloatingToolbarLayout orientation="vertical">
        <FloatingToolbar aria-label="Tools">
          <ToolbarToggleGroup aria-label="Tool">
            <ToolbarToggleIconButton value="draw" aria-label="Draw">
              <svg />
            </ToolbarToggleIconButton>
          </ToolbarToggleGroup>
        </FloatingToolbar>
      </FloatingToolbarLayout>,
    );
    expect(screen.getByRole('toolbar').dataset['orientation']).toBe('vertical');
    expect(screen.getByRole('group', { name: 'Tool' }).dataset['orientation']).toBe('vertical');
  });
});

describe(DockedToolbar, () => {
  it('spans the width and arranges its items', () => {
    render(
      <DockedToolbar arrangement="center" aria-label="Message">
        <ToolbarIconButton aria-label="Archive">
          <svg />
        </ToolbarIconButton>
      </DockedToolbar>,
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Message' });
    expect(toolbar.className).toContain('inline-full');
    expect(toolbar.className).toContain('justify-center');
  });
});
