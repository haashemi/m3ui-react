import { Link } from '@tanstack/react-router';
import type * as React from 'react';

import { PageHeader, Section } from '~/components/docs';
import { componentNav, isGroup, type NavLink } from '~/nav';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardPrimaryAction,
  CardTitle,
} from '@/registry/m3ui/ui/card';

function ComponentCard({ item }: { item: NavLink }): React.JSX.Element {
  return (
    <Card variant={item.to ? 'filled' : 'outlined'}>
      {item.to ? (
        <CardPrimaryAction
          aria-label={item.title}
          render={<Link to={item.to} {...(item.hash ? { hash: item.hash } : {})} />}
        />
      ) : null}
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.to ? 'Available' : 'Coming soon'}</CardDescription>
      </CardHeader>
      <CardContent>{item.description}</CardContent>
    </Card>
  );
}

function Grid({ items }: { items: NavLink[] }): React.JSX.Element {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ComponentCard key={item.title} item={item} />
      ))}
    </div>
  );
}

export function ComponentsPage(): React.JSX.Element {
  const groups = componentNav.filter(isGroup);
  const others = componentNav.filter((entry): entry is NavLink => !isGroup(entry));
  return (
    <>
      <PageHeader
        title="Components"
        description="Interactive building blocks for creating a user interface, listed the way the Material 3 guidelines organize them. Outlined entries aren't implemented yet."
      />
      {groups.map((group) => (
        <Section key={group.title} title={group.title}>
          <Grid items={group.items} />
        </Section>
      ))}
      <Section title="All other components">
        <Grid items={others} />
      </Section>
    </>
  );
}
