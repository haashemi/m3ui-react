import type * as React from 'react';

import { ImageIcon, MoreVertIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import {
  Card,
  CardAction,
  CardAvatar,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from '@/registry/m3ui/ui/card';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function CardDemo(): React.JSX.Element {
  return (
    <Card className="inline-full max-inline-90">
      <CardHeader>
        <CardAvatar>A</CardAvatar>
        <CardTitle>Header</CardTitle>
        <CardDescription>Subhead</CardDescription>
        <CardAction>
          <IconButton aria-label="More options">
            <MoreVertIcon />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardMedia className="block-47">
        <div className="flex items-center justify-center text-on-surface-variant block-full inline-full">
          <ImageIcon className="fill-current opacity-38 block-16 inline-16" />
        </div>
      </CardMedia>
      <CardContent>
        <div>
          <p className="type-body-large text-on-surface">Title</p>
          <p>Subtitle</p>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outlined">Secondary</Button>
        <Button>Primary</Button>
      </CardFooter>
    </Card>
  );
}
