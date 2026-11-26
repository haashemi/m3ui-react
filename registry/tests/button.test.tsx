import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vite-plus/test';

import { Button } from '@/registry/m3ui/ui/button';
import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';
import { IconButton } from '@/registry/m3ui/ui/icon-button';
import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

describe(Button, () => {
  it('renders a native button with its variant, size and a ripple', () => {
    render(
      <Button variant="tonal" size="lg">
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.dataset['variant']).toBe('tonal');
    expect(button.dataset['size']).toBe('lg');
    expect(button.className).toContain('bg-secondary-container');
    expect(button.querySelector('[data-slot=ripple]')).not.toBeNull();
  });

  it('runs onClick and stays inert when disabled', () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('requires an accessible name for icon buttons via aria-label', () => {
    render(
      <IconButton aria-label="Settings">
        <svg />
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'Settings' })).toBeDefined();
  });
});

describe(ToggleButton, () => {
  it('toggles aria-pressed and data-pressed', () => {
    render(<ToggleButton>Bookmark</ToggleButton>);
    const toggle = screen.getByRole('button', { name: 'Bookmark' });
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    act(() => {
      fireEvent.click(toggle);
    });
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(toggle.hasAttribute('data-pressed')).toBe(true);
  });
});

describe(ConnectedButtonGroup, () => {
  it('keeps a single selection', () => {
    render(
      <ConnectedButtonGroup aria-label="View" defaultValue={['day']} deselectable={false}>
        <ConnectedButtonGroupItem value="day">Day</ConnectedButtonGroupItem>
        <ConnectedButtonGroupItem value="week">Week</ConnectedButtonGroupItem>
      </ConnectedButtonGroup>,
    );
    const week = screen.getByRole('button', { name: 'Week' });
    act(() => {
      fireEvent.click(week);
    });
    expect(week.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Day' }).getAttribute('aria-pressed')).toBe('false');
  });
});
