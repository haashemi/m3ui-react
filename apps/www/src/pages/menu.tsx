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

export function MenuPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Menu"
        description="Menus show a list of choices on a temporary surface. Expressive menus split their items into groups on separate surfaces, whose corners round out while you work inside them, in standard and vibrant colors."
      />
      <ComponentPreview name="menu/demo" />

      <Section title="Installation">
        <Installation item="menu" />
      </Section>

      <UsageSection
        imports="import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu';"
        code={`<Menu onAction={(value) => run(value)}>
  <MenuTrigger render={<Button />}>Open</MenuTrigger>
  <MenuContent>
    <MenuItem value="rename">Rename</MenuItem>
    <MenuItem value="delete">Delete</MenuItem>
  </MenuContent>
</Menu>`}
      />

      <CompositionSection
        tree={`Menu
├── MenuTrigger | MenuContextTrigger
└── MenuContent
    ├── MenuItem
    ├── MenuSeparator
    ├── MenuGroup
    │   ├── MenuGroupLabel
    │   ├── MenuItem
    │   ├── MenuCheckboxItem
    │   └── MenuRadioGroup
    │       └── MenuRadioItem
    └── MenuSub
        ├── MenuSubTrigger
        └── MenuSubContent`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Any button can open a menu through <Code>MenuTrigger</Code>&apos;s <Code>render</Code>{' '}
            prop. Give items a <Code>value</Code> and handle <Code>onAction</Code> on the menu to
            run them.
          </p>
          <p>
            Each <Code>MenuGroup</Code> is its own surface, 2dp from the next. Without groups, the
            menu is one surface and <Code>MenuSeparator</Code> divides it.
          </p>
          <p>
            Checkbox and radio items stay open when chosen. Submenus open to the end side, flipped
            in right-to-left text, and inherit the parent&apos;s colors unless you set a variant.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Separator', name: 'menu/separator' },
          {
            title: 'Groups',
            name: 'menu/groups-standard',
            description: 'MenuGroupLabel names a section.',
          },
          {
            title: 'Vibrant',
            name: 'menu/groups-vibrant',
            description: 'The vibrant variant uses tertiary colors for menus that need emphasis.',
          },
          {
            title: 'Selection',
            name: 'menu/selection',
            description:
              'Selected items fill with tertiary container and show a check unless they have their own icon.',
          },
          { title: 'Submenus and supporting text', name: 'menu/submenu' },
          { title: 'Context menu', name: 'menu/context-menu' },
        ]}
      />
      <RtlSection name="menu/rtl" />
      <MenuApi />
    </>
  );
}

function MenuApi(): React.JSX.Element {
  const slots = [
    { name: 'icon', type: 'React.ReactNode', description: 'A leading icon.' },
    { name: 'supportingText', type: 'React.ReactNode' },
    { name: 'trailingText', type: 'React.ReactNode' },
    { name: 'trailingIcon', type: 'React.ReactNode' },
  ];
  return (
    <Section title="API Reference">
      <ApiComponent
        name="Menu"
        description="The UI SDK Menu root: state, keyboard and onAction."
        inherits={{ label: 'Menu', doc: 'menu' }}
        props={[
          { name: 'onAction', type: '(value: string) => void' },
          { name: 'open', type: 'boolean' },
          { name: 'onOpenChange', type: '(open: boolean, details) => void' },
        ]}
      />
      <ApiComponent
        name="MenuContent"
        description="The popup surface."
        inherits={{ label: 'MenuContent', doc: 'menu' }}
        props={[
          { name: 'variant', type: "'standard' | 'vibrant'", default: "'standard'" },
          { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'" },
          { name: 'sideOffset', type: 'number', default: '4' },
        ]}
      />
      <ApiComponent
        name="MenuItem"
        description="An action with a ripple and optional slots."
        inherits={{ label: 'MenuItem', doc: 'menu' }}
        props={[
          { name: 'value', type: 'string', description: 'Passed to onAction.' },
          ...slots,
          { name: 'shortcut', type: 'string', description: "Shown at the end, like 'mod+c'." },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]}
      />
      <ApiComponent
        name="MenuCheckboxItem"
        description="An item that toggles, with a check."
        inherits={{ label: 'MenuCheckboxItem', doc: 'menu' }}
        props={[
          { name: 'checked', type: 'boolean' },
          { name: 'defaultChecked', type: 'boolean' },
        ]}
      />
      <ApiComponent
        name="MenuRadioGroup"
        description="Radio items that share one value."
        inherits={{ label: 'MenuRadioGroup', doc: 'menu' }}
        props={[
          { name: 'value', type: 'string' },
          { name: 'onValueChange', type: '(value: string) => void' },
        ]}
      />
      <ApiComponent
        name="MenuRadioItem"
        description="An item in a radio group."
        inherits={{ label: 'MenuRadioItem', doc: 'menu' }}
      />
      <ApiComponent
        name="MenuGroup"
        description="A section on its own surface."
        inherits={{ label: 'MenuGroup', doc: 'menu' }}
      />
      <ApiComponent name="MenuGroupLabel" description="Names a group." />
      <ApiComponent name="MenuSeparator" description="Divides items on one surface." />
      <ApiComponent
        name="MenuSubTrigger"
        description="An item that opens a submenu, with an arrow at the end."
        props={slots.slice(0, 2)}
      />
      <ApiComponent
        name="MenuSubContent"
        description="The submenu surface. Inherits the parent's variant unless set."
        props={[{ name: 'variant', type: "'standard' | 'vibrant'" }]}
      />
    </Section>
  );
}
