import type * as React from 'react';

import { Tabs, TabsList, TabsTab } from '@/registry/m3ui/ui/tabs';

export default function TabsTextOnly(): React.JSX.Element {
  return (
    <Tabs defaultValue="flights">
      <TabsList aria-label="Bookings">
        <TabsTab value="flights">Flights</TabsTab>
        <TabsTab value="hotels">Hotels</TabsTab>
        <TabsTab value="cars" disabled>
          Cars
        </TabsTab>
      </TabsList>
    </Tabs>
  );
}
