import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, DocLink, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';
import { ToolbarItemsApi } from '~/components/toolbar-items-api';

export function DockedToolbarPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Docked Toolbar"
        description="Docked toolbars span the full width of the window and show frequently used actions for the current page."
      />
      <ComponentPreview name="docked-toolbar/demo" />

      <Section title="Installation">
        <Installation item="docked-toolbar" />
      </Section>

      <UsageSection
        imports={`import { DockedToolbar } from '@/components/ui/docked-toolbar';
import { ToolbarButton, ToolbarIconButton } from '@/components/ui/toolbar';`}
        code={`<DockedToolbar aria-label="Message">
  <ToolbarIconButton aria-label="Archive">
    <ArchiveIcon />
  </ToolbarIconButton>
  <ToolbarButton>Reply</ToolbarButton>
</DockedToolbar>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Tab enters the toolbar once; arrow keys move between its items, swapped in right-to-left
            text. Name it with <Code>aria-label</Code>.
          </p>
          <p>
            Fill it with the items from <Code>toolbar.tsx</Code>: <Code>ToolbarIconButton</Code>,{' '}
            <Code>ToolbarToggleIconButton</Code>, <Code>ToolbarButton</Code> and{' '}
            <Code>ToolbarToggleGroup</Code>. Standard icons pick up the toolbar&apos;s colors.
          </p>
          <p>
            Items spread out by default. On larger windows, gather them in the center with{' '}
            <Code>arrangement=&quot;center&quot;</Code>. For a toolbar over content, use a{' '}
            <DocLink to="/components/floating-toolbar">Floating Toolbar</DocLink>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          {
            title: 'Vibrant',
            name: 'docked-toolbar/vibrant',
            description: 'Vibrant toolbars use the primary container.',
          },
          {
            title: 'Centered',
            name: 'docked-toolbar/center',
            description: 'Items gather in the center, 32dp apart.',
          },
        ]}
      />
      <RtlSection name="docked-toolbar/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="DockedToolbar"
          description="A UI SDK Toolbar that spans its container."
          inherits={{ label: 'Toolbar', doc: 'toolbar' }}
          props={[
            { name: 'variant', type: "'standard' | 'vibrant'", default: "'standard'" },
            { name: 'arrangement', type: "'between' | 'center'", default: "'between'" },
            { name: 'aria-label', type: 'string', description: 'Names the toolbar.' },
          ]}
        />
        <ToolbarItemsApi />
      </Section>
    </>
  );
}
