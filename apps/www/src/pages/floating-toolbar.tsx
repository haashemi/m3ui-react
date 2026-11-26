import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, CompositionSection, DocLink, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';
import { ToolbarItemsApi } from '~/components/toolbar-items-api';

export function FloatingToolbarPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Floating Toolbar"
        description="Floating toolbars sit above content. They can be horizontal or vertical, pair with a FAB and collapse into it."
      />
      <ComponentPreview name="floating-toolbar/demo" />

      <Section title="Installation">
        <Installation item="floating-toolbar" />
      </Section>

      <UsageSection
        imports={`import { FloatingToolbar } from '@/components/ui/floating-toolbar';
import { ToolbarIconButton } from '@/components/ui/toolbar';`}
        code={`<FloatingToolbar aria-label="Formatting">
  <ToolbarIconButton aria-label="Undo">
    <UndoIcon />
  </ToolbarIconButton>
</FloatingToolbar>`}
      />

      <CompositionSection
        tree={`FloatingToolbarLayout
├── FloatingToolbar
│   ├── ToolbarIconButton
│   ├── ToolbarToggleIconButton
│   ├── ToolbarButton
│   └── ToolbarToggleGroup
└── ToolbarFab`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Tab enters the toolbar once; arrow keys move between its items, Left and Right when
            horizontal, Up and Down when vertical. Toggle groups join that navigation.
          </p>
          <p>
            To pair it with a FAB, wrap both in <Code>FloatingToolbarLayout</Code>. Its{' '}
            <Code>orientation</Code> flows to the toolbar. Set <Code>expanded={'{false}'}</Code> to
            collapse the toolbar into the FAB on the default spatial spring; a collapsed toolbar is
            inert.
          </p>
          <p>
            Position it yourself, for example <Code>fixed inset-be-4</Code> centered over content.
            For a full-width bar, use a{' '}
            <DocLink to="/components/docked-toolbar">Docked Toolbar</DocLink>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          {
            title: 'Vibrant',
            name: 'floating-toolbar/vibrant',
            description: 'Vibrant toolbars use the primary container.',
          },
          {
            title: 'With a FAB',
            name: 'floating-toolbar/with-fab',
            description: 'Press the FAB to collapse the toolbar into it.',
          },
          { title: 'Vertical', name: 'floating-toolbar/vertical' },
          { title: 'Toggle group', name: 'floating-toolbar/toggle-group' },
        ]}
      />
      <RtlSection name="floating-toolbar/rtl" />
      <FloatingToolbarApi />
    </>
  );
}

function FloatingToolbarApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="FloatingToolbar"
        description="A UI SDK Toolbar that floats, sized to its items."
        inherits={{ label: 'Toolbar', doc: 'toolbar' }}
        props={[
          { name: 'variant', type: "'standard' | 'vibrant'", default: "'standard'" },
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            description: "Defaults to the layout's orientation, or horizontal.",
          },
          { name: 'expanded', type: 'boolean', default: 'true' },
          { name: 'aria-label', type: 'string', description: 'Names the toolbar.' },
        ]}
      />
      <ApiComponent
        name="FloatingToolbarLayout"
        description={
          <>
            A <Code>div</Code> that places a floating toolbar next to its FAB.
          </>
        }
        props={[
          { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
        ]}
      />
      <ApiComponent
        name="ToolbarFab"
        description="A UI SDK Button styled as the FAB paired with a floating toolbar."
        inherits={{ label: 'Button', doc: 'button' }}
        props={[
          { name: 'variant', type: "'standard' | 'vibrant'", default: "'standard'" },
          { name: 'size', type: "'default' | 'medium'", default: "'default'" },
        ]}
      />
      <ToolbarItemsApi />
    </Section>
  );
}
