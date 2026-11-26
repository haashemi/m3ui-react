import type * as React from 'react';

import { RestaurantIcon } from '~/icons';
import {
  Card,
  CardAvatar,
  CardContent,
  CardDescription,
  CardHeader,
  CardPrimaryAction,
  CardTitle,
} from '@/registry/m3ui/ui/card';

export default function CardDisabled(): React.JSX.Element {
  return (
    <Card variant="outlined" className="inline-full max-inline-70">
      <CardPrimaryAction aria-label="Open dinner reservation" disabled />
      <CardHeader>
        <CardAvatar>
          <RestaurantIcon className="fill-current block-6 inline-6" />
        </CardAvatar>
        <CardTitle>Dinner</CardTitle>
        <CardDescription>Fully booked</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A disabled primary action drops the hover elevation and dims the outline.</p>
      </CardContent>
    </Card>
  );
}
