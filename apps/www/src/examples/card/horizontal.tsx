import type * as React from 'react';

import { ImageIcon } from '~/icons';
import {
  Card,
  CardAvatar,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from '@/registry/m3ui/ui/card';

export default function CardHorizontal(): React.JSX.Element {
  return (
    <Card variant="filled" className="flex-row inline-full max-inline-90">
      <CardHeader className="flex-1">
        <CardAvatar>A</CardAvatar>
        <CardTitle>Header</CardTitle>
        <CardDescription>Subhead</CardDescription>
      </CardHeader>
      <CardMedia className="inline-20">
        <div className="flex items-center justify-center text-on-surface-variant block-full inline-full">
          <ImageIcon className="fill-current opacity-38 block-8 inline-8" />
        </div>
      </CardMedia>
    </Card>
  );
}
