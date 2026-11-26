import type * as React from 'react';

import { MovieIcon, MusicNoteIcon, PhotoLibraryIcon } from '~/icons';
import { Tabs, TabsList, TabsTab } from '@/registry/m3ui/ui/tabs';

export default function TabsInlineIcons(): React.JSX.Element {
  return (
    <Tabs defaultValue="photos">
      <TabsList aria-label="Media" iconLayout="inline">
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
    </Tabs>
  );
}
