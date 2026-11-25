import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vite-plus/test';

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/registry/m3ui/ui/bottom-sheet';
import {
  SideSheet,
  SideSheetActions,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
  StandardSideSheet,
} from '@/registry/m3ui/ui/side-sheet';

async function press(element: HTMLElement) {
  await act(async () => {
    fireEvent.click(element);
    await Promise.resolve();
  });
}

describe(SideSheet, () => {
  it('opens a modal dialog named by its title and closes from a close part', async () => {
    render(
      <SideSheet>
        <SideSheetTrigger>Filters</SideSheetTrigger>
        <SideSheetContent>
          <SideSheetHeader>
            <SideSheetTitle>Filters</SideSheetTitle>
            <SideSheetClose aria-label="Close">
              <svg />
            </SideSheetClose>
          </SideSheetHeader>
          <SideSheetBody>Body</SideSheetBody>
          <SideSheetActions>
            <SideSheetClose>Save</SideSheetClose>
          </SideSheetActions>
        </SideSheetContent>
      </SideSheet>,
    );
    await press(screen.getByRole('button', { name: 'Filters' }));

    const dialog = screen.getByRole('dialog', { name: 'Filters' });
    expect(dialog.dataset['side']).toBe('right');
    expect(dialog.className).toContain('bg-surface-container-low');
    expect(dialog.className).toContain('data-[side=right]:rounded-l-corner-large');
    const close = screen.getByRole('button', { name: 'Close' });
    expect(close.querySelector('[data-slot=ripple]')).not.toBeNull();

    await press(close);
    expect(dialog.dataset['closed']).toBeDefined();
  });

  it('floats with all corners rounded when detached', async () => {
    render(
      <SideSheet defaultOpen>
        <SideSheetContent detached>
          <SideSheetTitle>Detached</SideSheetTitle>
        </SideSheetContent>
      </SideSheet>,
    );
    await act(async () => {
      await Promise.resolve();
    });
    const dialog = screen.getByRole('dialog', { name: 'Detached' });
    expect(dialog.dataset['detached']).toBe('');
    expect(dialog.className).toContain('m-4');
  });
});

describe(StandardSideSheet, () => {
  it('sits in the layout and becomes inert when a close part closes it', async () => {
    render(
      <StandardSideSheet aria-label="Details" side="start">
        <SideSheetHeader>
          <SideSheetTitle>Details</SideSheetTitle>
          <SideSheetClose aria-label="Close details">
            <svg />
          </SideSheetClose>
        </SideSheetHeader>
      </StandardSideSheet>,
    );
    const sheet = screen.getByRole('complementary', { name: 'Details' });
    expect(sheet.dataset['open']).toBe('');
    expect(sheet.className).toContain('data-open:border-e');
    expect(screen.getByRole('heading', { name: 'Details' }).tagName).toBe('H2');

    await press(screen.getByRole('button', { name: 'Close details' }));
    expect(sheet.dataset['closed']).toBe('');
    expect(sheet.inert).toBe(true);
  });
});

describe(BottomSheet, () => {
  it('rises from the bottom with a decorative drag handle', async () => {
    render(
      <BottomSheet>
        <BottomSheetTrigger>Share</BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetTitle>Share</BottomSheetTitle>
        </BottomSheetContent>
      </BottomSheet>,
    );
    await press(screen.getByRole('button', { name: 'Share' }));
    const dialog = screen.getByRole('dialog', { name: 'Share' });
    expect(dialog.dataset['side']).toBe('bottom');
    expect(dialog.className).toContain('rounded-t-corner-extra-large');
    expect(screen.queryByRole('button', { name: 'Resize' })).toBeNull();
  });

  it('makes the drag handle a button when it has snap points', async () => {
    render(
      <BottomSheet defaultOpen snapPoints={[0.5, 1]}>
        <BottomSheetContent>
          <BottomSheetTitle>Places</BottomSheetTitle>
        </BottomSheetContent>
      </BottomSheet>,
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByRole('button', { name: 'Resize' })).toBeDefined();
  });
});
