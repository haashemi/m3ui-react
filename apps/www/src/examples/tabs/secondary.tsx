import type * as React from 'react';

import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/m3ui/ui/tabs';

export default function TabsSecondary(): React.JSX.Element {
  return (
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
  );
}
