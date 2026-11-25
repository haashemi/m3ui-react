import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vite-plus/test';

import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from '@/registry/m3ui/ui/menu';

function noop() {}

function Example({
  onAction = noop,
  variant = 'standard',
}: {
  onAction?: (value: string) => void;
  variant?: 'standard' | 'vibrant';
}) {
  return (
    <Menu onAction={onAction}>
      <MenuTrigger>Options</MenuTrigger>
      <MenuContent variant={variant}>
        <MenuGroup>
          <MenuGroupLabel>Edit</MenuGroupLabel>
          <MenuItem value="cut" icon={<svg />} shortcut="mod+x" supportingText="To clipboard">
            Cut
          </MenuItem>
          <MenuItem value="paste" disabled>
            Paste
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuCheckboxItem value="ruler" defaultChecked>
            Ruler
          </MenuCheckboxItem>
          <MenuRadioGroup defaultValue="a">
            <MenuRadioItem value="a">Alpha</MenuRadioItem>
            <MenuRadioItem value="b">Beta</MenuRadioItem>
          </MenuRadioGroup>
          <MenuSub>
            <MenuSubTrigger>More</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem value="nested">Nested</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}

async function open() {
  fireEvent.click(screen.getByRole('button', { name: 'Options' }));
  return screen.findByRole('menu');
}

describe(Menu, () => {
  it('renders grouped items with ripples, icons, supporting text and shortcuts', async () => {
    render(<Example />);
    const menu = await open();
    expect(menu.dataset['variant']).toBe('standard');
    expect(menu.querySelectorAll(':scope > [data-slot=menu-group]')).toHaveLength(2);
    const cut = screen.getByRole('menuitem', { name: /Cut/u });
    expect(cut.querySelector('[data-slot=ripple]')).not.toBeNull();
    expect(cut.querySelector('[data-slot=menu-item-icon]')).not.toBeNull();
    expect(cut.querySelector('[data-slot=menu-shortcut]')).not.toBeNull();
    expect(cut.textContent).toContain('To clipboard');
    expect(screen.getByRole('menuitem', { name: 'Paste' }).getAttribute('aria-disabled')).toBe(
      'true',
    );
  });

  it('runs actions and closes', async () => {
    const onAction = vi.fn();
    render(<Example onAction={onAction} />);
    await open();
    fireEvent.click(screen.getByRole('menuitem', { name: /Cut/u }));
    expect(onAction).toHaveBeenCalledWith('cut', expect.anything());
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });

  it('shows a check on selected checkbox and radio items', async () => {
    render(<Example />);
    await open();
    const ruler = screen.getByRole('menuitemcheckbox', { name: 'Ruler' });
    expect(ruler.getAttribute('aria-checked')).toBe('true');
    expect(ruler.querySelector('[data-slot=menu-item-indicator] svg')).not.toBeNull();
    fireEvent.click(ruler);
    expect(ruler.getAttribute('aria-checked')).toBe('false');
    expect(ruler.querySelector('[data-slot=menu-item-indicator]')).toBeNull();

    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Beta' }));
    expect(screen.getByRole('menuitemradio', { name: 'Beta' }).dataset['checked']).toBe('');
    expect(screen.getByRole('menuitemradio', { name: 'Alpha' }).dataset['checked']).toBeUndefined();
  });

  it('opens a submenu that inherits the parent colors', async () => {
    render(<Example variant="vibrant" />);
    const menu = await open();
    expect(menu.dataset['variant']).toBe('vibrant');
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    expect(trigger.querySelector('svg')).not.toBeNull();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'ArrowRight' });
    const nested = await screen.findByRole('menuitem', { name: 'Nested' });
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const submenu = nested.closest('[role=menu]');
    expect(submenu?.getAttribute('data-variant')).toBeNull();
    expect(menu.contains(submenu)).toBe(true);
  });
});
