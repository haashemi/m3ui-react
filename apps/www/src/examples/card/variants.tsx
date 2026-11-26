import type * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/m3ui/ui/card';

const variants = ['elevated', 'filled', 'outlined'] as const;

export default function CardVariants(): React.JSX.Element {
  return (
    <>
      {variants.map((variant) => (
        <Card key={variant} variant={variant} className="inline-full max-inline-60">
          <CardHeader>
            <CardTitle>{variant[0]?.toUpperCase() + variant.slice(1)}</CardTitle>
            <CardDescription>Card variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Cards share the same parts in every variant.</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
