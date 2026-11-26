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

const stretch = 'flex-col flex-nowrap items-stretch';

export function TabsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Tabs"
        description="Tabs organize content across different screens and views. Primary and secondary tabs, fixed or scrollable, with an indicator that slides to the selected tab on the default spatial spring."
      />
      <ComponentPreview name="tabs/demo" className={stretch} />

      <Section title="Installation">
        <Installation item="tabs" />
      </Section>

      <UsageSection
        imports="import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';"
        code={`<Tabs defaultValue="video">
  <TabsList aria-label="Media">
    <TabsTab value="video">Video</TabsTab>
    <TabsTab value="photos">Photos</TabsTab>
  </TabsList>
  <TabsPanel value="video">…</TabsPanel>
  <TabsPanel value="photos">…</TabsPanel>
</Tabs>`}
      />

      <CompositionSection
        tree={`Tabs
├── TabsList
│   └── TabsTab
└── TabsPanel`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            <strong>Primary</strong> tabs sit at the top of the content pane, under an app bar.
            Their indicator matches the tab&apos;s content. <strong>Secondary</strong> tabs separate
            related content within a pane; their indicator spans the whole tab.
          </p>
          <p>
            The list is one Tab stop and arrow keys move between tabs, swapped in right-to-left
            text. Name it with <Code>aria-label</Code>.
          </p>
          <p>
            <Code>variant</Code>, <Code>iconLayout</Code> and <Code>scrollable</Code> are set on{' '}
            <Code>TabsList</Code> and apply to every tab in it.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Inline icons', name: 'tabs/inline-icons', className: stretch },
          { title: 'Text only', name: 'tabs/text-only', className: stretch },
          { title: 'Secondary', name: 'tabs/secondary', className: stretch },
          {
            title: 'Scrollable',
            name: 'tabs/scrollable',
            description:
              'Scrollable tabs keep their natural width, at least 90dp, with a 52dp leading inset.',
            className: stretch,
          },
        ]}
      />
      <RtlSection name="tabs/rtl" className={stretch} />
      <TabsApi />
    </>
  );
}

function TabsApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="Tabs"
        description="A UI SDK Tabs root that stacks its list and panels."
        inherits={{ label: 'Tabs', doc: 'tabs' }}
        props={[
          { name: 'value', type: 'string' },
          { name: 'defaultValue', type: 'string' },
          { name: 'onValueChange', type: '(value: string, details) => void' },
        ]}
      />
      <ApiComponent
        name="TabsList"
        description="The row of tabs and their indicator."
        inherits={{ label: 'TabsList', doc: 'tabs' }}
        props={[
          { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'" },
          {
            name: 'iconLayout',
            type: "'stacked' | 'inline'",
            default: "'stacked'",
            description: 'Where primary tabs put the icon. Secondary tabs are always inline.',
          },
          { name: 'scrollable', type: 'boolean', default: 'false' },
          { name: 'aria-label', type: 'string', description: 'Names the tab list.' },
        ]}
      />
      <ApiComponent
        name="TabsTab"
        description="A tab with a ripple and an optional icon."
        inherits={{ label: 'TabsTab', doc: 'tabs' }}
        props={[
          { name: 'value', type: 'string', description: 'Matches a TabsPanel.' },
          { name: 'icon', type: 'React.ReactNode' },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]}
      />
      <ApiComponent
        name="TabsPanel"
        description="The content for one tab. It fades and slides in from the side of the newly selected tab."
        inherits={{ label: 'TabsPanel', doc: 'tabs' }}
        props={[{ name: 'value', type: 'string' }]}
      />
    </Section>
  );
}
