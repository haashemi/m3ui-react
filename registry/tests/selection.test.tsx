import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vite-plus/test';

import { Checkbox } from '@/registry/m3ui/ui/checkbox';
import { AssistChip, FilterChip, InputChip } from '@/registry/m3ui/ui/chip';
import { Radio, RadioGroup } from '@/registry/m3ui/ui/radio';
import { Switch } from '@/registry/m3ui/ui/switch';

function markShape(element: HTMLElement) {
  return element.querySelector<SVGElement>('[data-slot=checkbox-mark]')?.dataset['shape'];
}

describe(Checkbox, () => {
  it('toggles and keeps the checkmark shape while it fades out', () => {
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });
    expect(checkbox.getAttribute('aria-checked')).toBe('false');

    act(() => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
    expect(markShape(checkbox)).toBe('checked');

    act(() => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
    expect(markShape(checkbox)).toBe('checked');
  });

  it('renders the indeterminate dash', () => {
    render(<Checkbox aria-label="All" checked="indeterminate" />);
    const checkbox = screen.getByRole('checkbox', { name: 'All' });
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
    expect(markShape(checkbox)).toBe('indeterminate');
  });
});

describe(RadioGroup, () => {
  it('selects one radio at a time', () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="Speed" defaultValue="a" onValueChange={onValueChange}>
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>,
    );
    act(() => {
      fireEvent.click(screen.getByRole('radio', { name: 'B' }));
    });
    expect(onValueChange.mock.calls[0]?.[0]).toBe('b');
    expect(screen.getByRole('radio', { name: 'A' }).getAttribute('aria-checked')).toBe('false');
    expect(screen.getByRole('radio', { name: 'B' }).getAttribute('aria-checked')).toBe('true');
  });
});

describe(Switch, () => {
  it('toggles and renders icons on request', () => {
    render(<Switch aria-label="Wi-Fi" icons="both" />);
    const control = screen.getByRole('switch', { name: 'Wi-Fi' });
    expect(control.dataset['icons']).toBe('both');
    act(() => {
      fireEvent.click(control);
    });
    expect(control.getAttribute('aria-checked')).toBe('true');
    expect(control.querySelector('[data-slot=switch-thumb]')?.hasAttribute('data-checked')).toBe(
      true,
    );
  });
});

describe('chips', () => {
  it('renders an assist chip as a button with a leading icon', () => {
    render(<AssistChip icon={<svg />}>Directions</AssistChip>);
    const chip = screen.getByRole('button', { name: 'Directions' });
    expect(chip.hasAttribute('data-leading')).toBe(true);
  });

  it('toggles a filter chip', () => {
    render(<FilterChip>Flights</FilterChip>);
    const chip = screen.getByRole('button', { name: 'Flights' });
    act(() => {
      fireEvent.click(chip);
    });
    expect(chip.getAttribute('aria-pressed')).toBe('true');
  });

  it('removes an input chip by its button or the keyboard', () => {
    const onRemove = vi.fn();
    render(<InputChip onRemove={onRemove}>Ada</InputChip>);
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Remove Ada' }));
    });
    act(() => {
      fireEvent.keyDown(screen.getByRole('button', { name: 'Ada' }), { key: 'Backspace' });
    });
    expect(onRemove).toHaveBeenCalledTimes(2);
  });
});
