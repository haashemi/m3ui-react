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

export function SplitButtonPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Split Button"
        description="Split buttons pair a primary action with a menu of related actions. Hovering and pressing tighten the inner corners; opening the menu rounds the trigger and turns its icon."
      />
      <ComponentPreview name="split-button/demo" />

      <Section title="Installation">
        <Installation item="split-button" />
      </Section>

      <UsageSection
        imports={`import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
} from '@/components/ui/split-button';`}
        code={`<SplitButton>
  <SplitButtonAction>Send</SplitButtonAction>
  <Menu>
    <MenuTrigger render={<SplitButtonTrigger aria-label="More send options" />} />
    <MenuContent align="end">
      <MenuItem value="schedule">Schedule send</MenuItem>
    </MenuContent>
  </Menu>
</SplitButton>`}
      />

      <CompositionSection
        tree={`SplitButton
├── SplitButtonAction
└── Menu
    ├── MenuTrigger → SplitButtonTrigger
    └── MenuContent`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            The trigger works with any menu or popover: it reads <Code>aria-expanded</Code> or{' '}
            <Code>data-open</Code> to round its corners and turn its icon. The examples use{' '}
            <DocLink to="/components/menu">Menu</DocLink>.
          </p>
          <p>
            The trigger shows only an icon, so give it an <Code>aria-label</Code>. Both halves read{' '}
            <Code>size</Code> and <Code>variant</Code> from <Code>SplitButton</Code>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Color styles', name: 'split-button/variants' },
          { title: 'Sizes', name: 'split-button/sizes' },
        ]}
      />
      <RtlSection name="split-button/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="SplitButton"
          description={
            <>
              A <Code>div</Code> with <Code>role=&quot;group&quot;</Code> that sizes and colors both
              halves.
            </>
          }
          props={[
            {
              name: 'variant',
              type: "'elevated' | 'filled' | 'tonal' | 'outlined'",
              default: "'filled'",
            },
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
          ]}
        />
        <ApiComponent
          name="SplitButtonAction"
          description="The primary action, a UI SDK Button."
          inherits={{ label: 'Button', doc: 'button' }}
        />
        <ApiComponent
          name="SplitButtonTrigger"
          description={
            <>
              A native <Code>button</Code> with a drop-down icon. Render it through a menu
              trigger&apos;s <Code>render</Code> prop. Pass children to replace the icon.
            </>
          }
          props={[{ name: 'aria-label', type: 'string', description: 'Names the menu.' }]}
        />
      </Section>
    </>
  );
}
