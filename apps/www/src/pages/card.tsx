import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, CompositionSection, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

export function CardPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Card"
        description="Cards display content and actions about a single subject. Elevated, filled and outlined cards share the same parts: header, media, content and footer."
      />
      <ComponentPreview name="card/demo" />

      <Section title="Installation">
        <Installation item="card" />
      </Section>

      <UsageSection
        imports={`import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';`}
        code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`}
      />

      <CompositionSection
        tree={`Card
├── CardPrimaryAction
├── CardHeader
│   ├── CardAvatar
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardMedia
├── CardContent
└── CardFooter`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Every part is optional. Put them in any order: media can lead the card, and{' '}
            <Code>flex-row</Code> on the card lays the parts out side by side.
          </p>
          <p>
            <Code>CardPrimaryAction</Code> stretches a button or link over the whole card. Hovering
            raises the card, and its state layer, ripple and focus ring cover it. The header action
            and footer buttons stay clickable above it. Give it an accessible name.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Variants', name: 'card/variants', className: 'items-start' },
          {
            title: 'Horizontal',
            name: 'card/horizontal',
            description: 'flex-row lays the parts out in a row. Here the media is at the end.',
          },
          { title: 'Interactive', name: 'card/interactive' },
          { title: 'As a link', name: 'card/link' },
          { title: 'Disabled', name: 'card/disabled' },
        ]}
      />
      <RtlSection name="card/rtl" />
      <CardApi />
    </>
  );
}

function CardApi(): React.JSX.Element {
  const div = (name: string, description: string) => (
    <ApiComponent
      name={name}
      description={
        <>
          {description} Takes every <Code>div</Code> prop.
        </>
      }
    />
  );
  return (
    <Section title="API Reference">
      <ApiComponent
        name="Card"
        description={
          <>
            The card&apos;s container. Takes every <Code>div</Code> prop.
          </>
        }
        props={[
          { name: 'variant', type: "'elevated' | 'filled' | 'outlined'", default: "'elevated'" },
        ]}
      />
      <ApiComponent
        name="CardPrimaryAction"
        description="A UI SDK Button stretched over the card, under its other parts."
        inherits={{ label: 'Button', doc: 'button' }}
        props={[
          { name: 'aria-label', type: 'string', description: 'Names the action.' },
          {
            name: 'render',
            type: 'React.ReactElement',
            description: 'Renders a link or a router link instead of a button.',
          },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]}
      />
      {div('CardHeader', 'Lays out the avatar, title, description and action.')}
      <ApiComponent
        name="CardAvatar"
        description={
          <>
            A 40dp circle for an initial, an icon or an image. Takes every <Code>span</Code> prop.
          </>
        }
      />
      {div('CardTitle', 'The card title.')}
      {div('CardDescription', 'Supporting text under the title.')}
      {div('CardAction', 'Places an action at the end of the header.')}
      {div('CardMedia', 'Holds an image or video; set its height or width.')}
      {div('CardContent', 'The card body.')}
      {div('CardFooter', 'Actions at the bottom, aligned to the end.')}
    </Section>
  );
}
