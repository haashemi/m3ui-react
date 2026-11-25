import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { FlightIcon, ImageIcon, MoreVertIcon, RestaurantIcon } from '~/icons';
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
  CardPrimaryAction,
  CardTitle,
} from '@/registry/m3ui/ui/card';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const variants = ['elevated', 'filled', 'outlined'] as const;

function Placeholder(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center text-on-surface-variant block-full inline-full">
      <ImageIcon className="fill-current opacity-38 block-16 inline-16" />
    </div>
  );
}

function StackedCard({ variant }: { variant: (typeof variants)[number] }): React.JSX.Element {
  return (
    <Card variant={variant} className="inline-full max-inline-90">
      <CardHeader>
        <CardAvatar>A</CardAvatar>
        <CardTitle>Header</CardTitle>
        <CardDescription>Subhead</CardDescription>
        <CardAction>
          <IconButton aria-label={`More options, ${variant} card`}>
            <MoreVertIcon />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardMedia className="block-47">
        <Placeholder />
      </CardMedia>
      <CardContent>
        <div>
          <p className="type-body-large text-on-surface">Title</p>
          <p>Subtitle</p>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
      </CardContent>
      <CardFooter>
        <Button variant="outlined">Secondary</Button>
        <Button>Primary</Button>
      </CardFooter>
    </Card>
  );
}

export function CardsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Cards"
        description="Cards hold content and actions about a single subject. Elevated, filled and outlined cards share the same parts: header, media, content and footer."
        item="card"
      />

      <Section title="Variants">
        <Preview
          code={`<Card variant="elevated">
  <CardHeader>
    <CardAvatar>A</CardAvatar>
    <CardTitle>Header</CardTitle>
    <CardDescription>Subhead</CardDescription>
    <CardAction>
      <IconButton aria-label="More options"><MoreVertIcon /></IconButton>
    </CardAction>
  </CardHeader>
  <CardMedia className="block-47"><img src="…" alt="" /></CardMedia>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button variant="outlined">Secondary</Button>
    <Button>Primary</Button>
  </CardFooter>
</Card>`}
          className="items-start"
        >
          {variants.map((variant) => (
            <StackedCard key={variant} variant={variant} />
          ))}
        </Preview>
      </Section>

      <Section
        title="Horizontal"
        description="Lay the parts out in a row with flex-row. Here the media is a square at the end."
      >
        <Preview className="flex-col">
          {variants.map((variant) => (
            <Card key={variant} variant={variant} className="flex-row inline-full max-inline-90">
              <CardHeader className="flex-1">
                <CardAvatar>A</CardAvatar>
                <CardTitle>Header</CardTitle>
                <CardDescription>Subhead</CardDescription>
              </CardHeader>
              <CardMedia className="inline-20">
                <Placeholder />
              </CardMedia>
            </Card>
          ))}
        </Preview>
      </Section>

      <Section
        title="Interactive"
        description="CardPrimaryAction stretches a button or link over the whole card. Hovering raises the card, and its state layer, ripple and focus ring cover the card. Headers' actions and the footer stay clickable above it. Give it an accessible name."
      >
        <Preview
          code={`<Card variant="filled">
  <CardPrimaryAction aria-label="Open Lisbon trip" onClick={open} />
  <CardHeader>…</CardHeader>
  <CardContent>…</CardContent>
</Card>`}
          className="items-start"
        >
          {variants.map((variant) => (
            <Card key={variant} variant={variant} className="inline-full max-inline-70">
              <CardPrimaryAction aria-label={`Open Lisbon trip, ${variant}`} />
              <CardHeader>
                <CardAvatar>
                  <FlightIcon className="fill-current block-6 inline-6" />
                </CardAvatar>
                <CardTitle>Lisbon</CardTitle>
                <CardDescription>Mar 4 – Mar 9</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Three days of tiled streets, custard tarts and the ride up to Belém.</p>
              </CardContent>
            </Card>
          ))}
          <Card variant="outlined" className="inline-full max-inline-70">
            <CardPrimaryAction aria-label="Open dinner reservation" disabled />
            <CardHeader>
              <CardAvatar>
                <RestaurantIcon className="fill-current block-6 inline-6" />
              </CardAvatar>
              <CardTitle>Dinner</CardTitle>
              <CardDescription>Disabled</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A disabled primary action drops the hover elevation and dims the outline.</p>
            </CardContent>
          </Card>
        </Preview>
      </Section>
    </>
  );
}
