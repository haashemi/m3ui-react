import type * as React from 'react';

import { FlightIcon, MoreVertIcon } from '~/icons';
import {
  Card,
  CardAction,
  CardAvatar,
  CardContent,
  CardDescription,
  CardHeader,
  CardPrimaryAction,
  CardTitle,
} from '@/registry/m3ui/ui/card';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function CardInteractive(): React.JSX.Element {
  return (
    <Card variant="filled" className="inline-full max-inline-70">
      <CardPrimaryAction aria-label="Open Lisbon trip" />
      <CardHeader>
        <CardAvatar>
          <FlightIcon className="fill-current block-6 inline-6" />
        </CardAvatar>
        <CardTitle>Lisbon</CardTitle>
        <CardDescription>Mar 4 – Mar 9</CardDescription>
        <CardAction>
          <IconButton aria-label="Trip options">
            <MoreVertIcon />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Three days of tiled streets, custard tarts and the ride up to Belém.</p>
      </CardContent>
    </Card>
  );
}
