import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import {
  BookIcon,
  ExploreIcon,
  FlightIcon,
  MovieIcon,
  MusicNoteIcon,
  NewspaperIcon,
  PhotoLibraryIcon,
  PodcastsIcon,
  SportsEsportsIcon,
  TrendingUpIcon,
} from '~/icons';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/m3ui/ui/tabs';

const media = [
  { value: 'video', label: 'Video', icon: <MovieIcon />, text: '24 videos, 3 added this week.' },
  {
    value: 'photos',
    label: 'Photos',
    icon: <PhotoLibraryIcon />,
    text: '1,204 photos in 18 albums.',
  },
  { value: 'audio', label: 'Audio', icon: <MusicNoteIcon />, text: '312 songs and 8 podcasts.' },
];

const topics = [
  { value: 'explore', label: 'Explore', icon: <ExploreIcon /> },
  { value: 'trending', label: 'Trending', icon: <TrendingUpIcon /> },
  { value: 'news', label: 'News', icon: <NewspaperIcon /> },
  { value: 'travel', label: 'Travel', icon: <FlightIcon /> },
  { value: 'games', label: 'Games', icon: <SportsEsportsIcon /> },
  { value: 'books', label: 'Books', icon: <BookIcon /> },
  { value: 'podcasts', label: 'Podcasts', icon: <PodcastsIcon /> },
];

function PrimarySection(): React.JSX.Element {
  return (
    <Section
      title="Primary"
      description="Primary tabs sit at the top of the content pane, under an app bar. The indicator matches the width of the tab's content and slides between tabs on the default spatial spring."
    >
      <Preview
        className="flex-col flex-nowrap items-stretch"
        code={`<Tabs defaultValue="video">
  <TabsList aria-label="Media">
    <TabsTab value="video" icon={<MovieIcon />}>Video</TabsTab>
    <TabsTab value="photos" icon={<PhotoLibraryIcon />}>Photos</TabsTab>
    <TabsTab value="audio" icon={<MusicNoteIcon />}>Audio</TabsTab>
  </TabsList>
  <TabsPanel value="video">…</TabsPanel>
</Tabs>`}
      >
        <Tabs defaultValue="video">
          <TabsList aria-label="Media">
            {media.map((item) => (
              <TabsTab key={item.value} value={item.value} icon={item.icon}>
                {item.label}
              </TabsTab>
            ))}
          </TabsList>
          {media.map((item) => (
            <TabsPanel key={item.value} value={item.value}>
              <p className="p-6 type-body-large text-on-surface-variant">{item.text}</p>
            </TabsPanel>
          ))}
        </Tabs>
        <Tabs defaultValue="photos">
          <TabsList aria-label="Media (inline icons)" iconLayout="inline">
            {media.map((item) => (
              <TabsTab key={item.value} value={item.value} icon={item.icon}>
                {item.label}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
        <Tabs defaultValue="flights">
          <TabsList aria-label="Bookings">
            <TabsTab value="flights">Flights</TabsTab>
            <TabsTab value="hotels">Hotels</TabsTab>
            <TabsTab value="cars" disabled>
              Cars
            </TabsTab>
          </TabsList>
        </Tabs>
      </Preview>
    </Section>
  );
}

function SecondarySection(): React.JSX.Element {
  return (
    <Section
      title="Secondary"
      description="Secondary tabs separate related content within a pane. Their indicator spans the whole tab."
    >
      <Preview
        className="flex-col flex-nowrap items-stretch"
        code={`<Tabs defaultValue="overview">
  <TabsList variant="secondary" aria-label="Flight">
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="specs">Specifications</TabsTab>
  </TabsList>
</Tabs>`}
      >
        <Tabs defaultValue="overview">
          <TabsList variant="secondary" aria-label="Flight">
            <TabsTab value="overview">Overview</TabsTab>
            <TabsTab value="specs">Specifications</TabsTab>
            <TabsTab value="reviews">Reviews</TabsTab>
          </TabsList>
          <TabsPanel value="overview">
            <p className="p-6 type-body-large text-on-surface-variant">
              Nonstop, 7h 25m, departs 9:40.
            </p>
          </TabsPanel>
          <TabsPanel value="specs">
            <p className="p-6 type-body-large text-on-surface-variant">
              Airbus A350-900, 3-3-3 economy seating.
            </p>
          </TabsPanel>
          <TabsPanel value="reviews">
            <p className="p-6 type-body-large text-on-surface-variant">
              4.6 out of 5 from 1,820 travelers.
            </p>
          </TabsPanel>
        </Tabs>
        <Tabs defaultValue="trending">
          <TabsList variant="secondary" aria-label="Topics (icons)">
            {topics.slice(0, 3).map((topic) => (
              <TabsTab key={topic.value} value={topic.value} icon={topic.icon}>
                {topic.label}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
      </Preview>
    </Section>
  );
}

function ScrollableSection(): React.JSX.Element {
  return (
    <Section
      title="Scrollable"
      description="Scrollable tabs keep their natural width, at least 90px, with a 52px leading inset. The selected tab scrolls into view."
    >
      <Preview
        className="flex-col flex-nowrap items-stretch"
        code={`<TabsList scrollable aria-label="Topics">
  <TabsTab value="explore" icon={<ExploreIcon />}>Explore</TabsTab>
  …
</TabsList>`}
      >
        <Tabs defaultValue="explore" className="min-inline-0">
          <TabsList scrollable aria-label="Topics">
            {topics.map((topic) => (
              <TabsTab key={topic.value} value={topic.value} icon={topic.icon}>
                {topic.label}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
        <Tabs defaultValue="news" className="min-inline-0">
          <TabsList variant="secondary" scrollable aria-label="Topics (secondary)">
            {topics.map((topic) => (
              <TabsTab key={topic.value} value={topic.value}>
                {topic.label}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
      </Preview>
    </Section>
  );
}

export function TabsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Tabs"
        description="Tabs organize content across different screens and views. Tab enters the selected tab; the arrow keys move between tabs and select them."
        item="tabs"
      />
      <PrimarySection />
      <SecondarySection />
      <ScrollableSection />
    </>
  );
}
