import type * as React from 'react';

import { LocalCafeIcon, RestaurantIcon } from '~/icons';
import { FilterChip, FilterChipGroup } from '@/registry/m3ui/ui/chip';

export default function ChipFilter(): React.JSX.Element {
  return (
    <FilterChipGroup multiple aria-label="Amenities" defaultValue={['cafe', 'dining']}>
      <FilterChip value="cafe" icon={<LocalCafeIcon />}>
        Café
      </FilterChip>
      <FilterChip value="dining" icon={<RestaurantIcon />}>
        Dining
      </FilterChip>
      <FilterChip value="flights">Flights</FilterChip>
      <FilterChip value="parking">Parking</FilterChip>
    </FilterChipGroup>
  );
}
