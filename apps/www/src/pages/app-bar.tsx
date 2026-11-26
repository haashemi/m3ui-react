import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

export function AppBarPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="App Bar"
        description="App bars sit at the top of the screen with the page title, navigation and key actions. Small, medium flexible and large flexible sizes, plus a search app bar."
      />
      <ComponentPreview name="app-bar/demo" />

      <Section title="Installation">
        <Installation item="app-bar" />
      </Section>

      <UsageSection
        imports="import { AppBar } from '@/components/ui/app-bar';"
        code={`<AppBar
  title="Title"
  leading={
    <IconButton aria-label="Back">
      <ArrowBackIcon />
    </IconButton>
  }
  trailing={
    <IconButton aria-label="More options">
      <MoreVertIcon />
    </IconButton>
  }
/>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Pass the navigation button to <Code>leading</Code> and up to a few actions to{' '}
            <Code>trailing</Code>. Children replace the title, for a search bar, a logo or an image.
          </p>
          <p>
            App bars are sticky and follow their nearest scroll container, or the window. Pass{' '}
            <Code>scrollTarget</Code> to watch another element. Content scrolling under the bar
            fills it with the surface container color; <Code>scrolled</Code> forces that state.
          </p>
          <p>
            Flexible bars collapse into a small bar on scroll, fading the title from one row to the
            other and snapping open or closed when scrolling stops. With{' '}
            <Code>scrollBehavior=&quot;enter-always&quot;</Code>, the bar hides on scroll down and
            returns on scroll up.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Centered title', name: 'app-bar/center' },
          { title: 'Subtitle', name: 'app-bar/subtitle' },
          {
            title: 'Search',
            name: 'app-bar/search',
            description:
              'A search app bar holds a search bar that opens your search view. Actions can sit inside or outside it.',
          },
          { title: 'Custom content', name: 'app-bar/custom-content' },
          {
            title: 'Medium flexible',
            name: 'app-bar/medium',
            description: '112dp tall, or 136dp with a subtitle. Long titles wrap.',
          },
          {
            title: 'Large flexible',
            name: 'app-bar/large',
            description: '120dp tall, or 152dp with a subtitle.',
          },
          {
            title: 'Collapse on scroll',
            name: 'app-bar/scroll-collapse',
            description: 'Scroll the list. The large bar collapses into a small one.',
          },
          { title: 'Lift on scroll', name: 'app-bar/scroll-lift' },
          { title: 'Hide on scroll', name: 'app-bar/scroll-hide' },
        ]}
      />
      <RtlSection name="app-bar/rtl" />
      <AppBarApi />
    </>
  );
}

function AppBarApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="AppBar"
        description={
          <>
            A <Code>header</Code> with the bar&apos;s rows. Takes every <Code>header</Code> prop.
          </>
        }
        props={[
          { name: 'size', type: "'small' | 'medium' | 'large'", default: "'small'" },
          { name: 'align', type: "'start' | 'center'", default: "'start'" },
          { name: 'title', type: 'React.ReactNode' },
          { name: 'subtitle', type: 'React.ReactNode' },
          { name: 'leading', type: 'React.ReactNode', description: 'Usually a navigation button.' },
          { name: 'trailing', type: 'React.ReactNode', description: 'Actions at the end.' },
          {
            name: 'scrollBehavior',
            type: "'pinned' | 'enter-always' | 'exit-until-collapsed'",
            description:
              "Defaults to 'exit-until-collapsed' for flexible bars, 'pinned' otherwise.",
          },
          {
            name: 'scrollTarget',
            type: 'React.RefObject<HTMLElement | null>',
            description: 'The element to watch. Defaults to the nearest scroll container.',
          },
          { name: 'scrolled', type: 'boolean', description: 'Forces the on-scroll color.' },
        ]}
      />
      <ApiComponent
        name="AppBarSearch"
        description="A UI SDK Button styled as a search bar that opens your search view."
        inherits={{ label: 'Button', doc: 'button' }}
        props={[
          { name: 'children', type: 'React.ReactNode', description: 'The placeholder text.' },
          { name: 'trailing', type: 'React.ReactNode', description: 'Actions inside the bar.' },
        ]}
      />
    </Section>
  );
}
