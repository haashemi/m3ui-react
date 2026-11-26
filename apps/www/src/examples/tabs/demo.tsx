import type * as React from 'react';

import { MovieIcon, MusicNoteIcon, PhotoLibraryIcon } from '~/icons';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/m3ui/ui/tabs';

export default function TabsDemo(): React.JSX.Element {
  return (
    <Tabs defaultValue="video">
      <TabsList aria-label="Media">
        <TabsTab value="video" icon={<MovieIcon />}>
          Video
        </TabsTab>
        <TabsTab value="photos" icon={<PhotoLibraryIcon />}>
          Photos
        </TabsTab>
        <TabsTab value="audio" icon={<MusicNoteIcon />}>
          Audio
        </TabsTab>
      </TabsList>
      <TabsPanel value="video">
        <p className="p-6 type-body-large text-on-surface-variant">24 videos, 3 added this week.</p>
      </TabsPanel>
      <TabsPanel value="photos">
        <p className="p-6 type-body-large text-on-surface-variant">1,204 photos in 18 albums.</p>
      </TabsPanel>
      <TabsPanel value="audio">
        <p className="p-6 type-body-large text-on-surface-variant">312 songs and 8 podcasts.</p>
      </TabsPanel>
    </Tabs>
  );
}
