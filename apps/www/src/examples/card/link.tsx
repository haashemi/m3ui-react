import type * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardPrimaryAction,
  CardTitle,
} from '@/registry/m3ui/ui/card';

export default function CardLink(): React.JSX.Element {
  return (
    <Card variant="outlined" className="inline-full max-inline-70">
      <CardPrimaryAction
        aria-label="Material 3 cards guidelines"
        // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- CardPrimaryAction names the link
        render={<a href="https://m3.material.io/components/cards" />}
      />
      <CardHeader>
        <CardTitle>Cards guidelines</CardTitle>
        <CardDescription>m3.material.io</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The whole card is a link. Its state layer, ripple and focus ring cover the card.</p>
      </CardContent>
    </Card>
  );
}
