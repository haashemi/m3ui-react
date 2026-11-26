import type * as React from 'react';

import {
  BookIcon,
  ExploreIcon,
  FlightIcon,
  NewspaperIcon,
  PodcastsIcon,
  SportsEsportsIcon,
  TrendingUpIcon,
} from '~/icons';
import { Tabs, TabsList, TabsTab } from '@/registry/m3ui/ui/tabs';

const topics = [
  { value: 'explore', label: 'Explore', icon: <ExploreIcon /> },
  { value: 'trending', label: 'Trending', icon: <TrendingUpIcon /> },
  { value: 'news', label: 'News', icon: <NewspaperIcon /> },
  { value: 'travel', label: 'Travel', icon: <FlightIcon /> },
  { value: 'games', label: 'Games', icon: <SportsEsportsIcon /> },
  { value: 'books', label: 'Books', icon: <BookIcon /> },
  { value: 'podcasts', label: 'Podcasts', icon: <PodcastsIcon /> },
];

export default function TabsScrollable(): React.JSX.Element {
  return (
    <Tabs defaultValue="explore" className="max-inline-md">
      <TabsList scrollable aria-label="Topics">
        {topics.map((topic) => (
          <TabsTab key={topic.value} value={topic.value} icon={topic.icon}>
            {topic.label}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  );
}
