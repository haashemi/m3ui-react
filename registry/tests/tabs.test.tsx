import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vite-plus/test';

import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/m3ui/ui/tabs';

function Example({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  return (
    <Tabs defaultValue="video">
      <TabsList aria-label="Media" variant={variant}>
        <TabsTab value="video" icon={<svg />}>
          Video
        </TabsTab>
        <TabsTab value="photos">Photos</TabsTab>
        <TabsTab value="audio" disabled>
          Audio
        </TabsTab>
      </TabsList>
      <TabsPanel value="video">Videos</TabsPanel>
      <TabsPanel value="photos">Photos panel</TabsPanel>
      <TabsPanel value="audio">Audio panel</TabsPanel>
    </Tabs>
  );
}

describe(Tabs, () => {
  it('renders a named tab list with the selected tab and its panel', () => {
    render(<Example />);
    expect(screen.getByRole('tablist', { name: 'Media' })).toBeDefined();
    const video = screen.getByRole('tab', { name: 'Video' });
    expect(video.getAttribute('aria-selected')).toBe('true');
    expect(video.dataset['stacked']).toBe('');
    expect(video.querySelector('[data-slot=ripple]')).not.toBeNull();
    expect(screen.getByRole('tabpanel').textContent).toBe('Videos');
  });

  it('selects with a click and the arrow keys, and skips disabled tabs', () => {
    render(<Example />);
    fireEvent.click(screen.getByRole('tab', { name: 'Photos' }));
    expect(screen.getByRole('tabpanel').textContent).toBe('Photos panel');

    const photos = screen.getByRole('tab', { name: 'Photos' });
    photos.focus();
    fireEvent.keyDown(photos, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: 'Video' }).getAttribute('aria-selected')).toBe('true');

    fireEvent.click(screen.getByRole('tab', { name: 'Audio' }));
    expect(screen.getByRole('tab', { name: 'Audio' }).getAttribute('aria-selected')).toBe('false');
  });

  it('puts the primary indicator in the content and the secondary one across the tab', () => {
    const { unmount } = render(<Example />);
    const primary = screen.getByRole('tab', { name: 'Video' });
    expect(
      primary.querySelector('[data-slot=tabs-tab-content] > [data-slot=tabs-tab-indicator]'),
    ).not.toBeNull();
    unmount();

    render(<Example variant="secondary" />);
    const secondary = screen.getByRole('tab', { name: 'Video' });
    expect(secondary.dataset['stacked']).toBeUndefined();
    expect(secondary.querySelector(':scope > [data-slot=tabs-tab-indicator]')).not.toBeNull();
    expect(secondary.className).toContain('data-selected:text-on-surface');
  });
});
