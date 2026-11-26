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

export function SideSheetPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Side Sheet"
        description="Side sheets show secondary content anchored to the side of the screen. Modal side sheets slide in over a scrim; standard side sheets sit beside the main content."
      />
      <ComponentPreview name="side-sheet/demo" />

      <Section title="Installation">
        <Installation item="side-sheet" />
      </Section>

      <UsageSection
        imports={`import {
  SideSheet,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
} from '@/components/ui/side-sheet';`}
        code={`<SideSheet>
  <SideSheetTrigger render={<Button />}>Open</SideSheetTrigger>
  <SideSheetContent>
    <SideSheetHeader>
      <SideSheetTitle>Filters</SideSheetTitle>
      <SideSheetClose aria-label="Close">
        <CloseIcon />
      </SideSheetClose>
    </SideSheetHeader>
    <SideSheetBody>…</SideSheetBody>
  </SideSheetContent>
</SideSheet>`}
      />

      <CompositionSection
        tree={`SideSheet
├── SideSheetTrigger
└── SideSheetContent
    ├── SideSheetHeader
    │   ├── SideSheetClose (back)
    │   ├── SideSheetTitle
    │   └── SideSheetClose
    ├── SideSheetDescription
    ├── SideSheetBody
    └── SideSheetActions

StandardSideSheet
├── SideSheetHeader
└── SideSheetBody`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Modal sheets are UI SDK Drawers. They trap focus and close with Escape, a press on the
            scrim, a swipe toward their edge or any <Code>SideSheetClose</Code>. Detached sheets
            float 16dp from the edges with every corner rounded.
          </p>
          <p>
            <Code>StandardSideSheet</Code> is part of the layout. It opens and closes on the spatial
            spring, pushes the content beside it, and becomes inert while closed.
          </p>
          <p>
            <Code>side</Code> is logical: <Code>end</Code> is the right edge in left-to-right pages
            and the left edge in right-to-left ones. <Code>SideSheetClose</Code> renders an icon
            button; pass <Code>render</Code> for a text button.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Detached', name: 'side-sheet/detached' },
          { title: 'Back button', name: 'side-sheet/back' },
          { title: 'Start side', name: 'side-sheet/start' },
          { title: 'Standard', name: 'side-sheet/standard' },
        ]}
      />
      <RtlSection name="side-sheet/rtl" />
      <SideSheetApi />
    </>
  );
}

function SideSheetApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="SideSheet"
        description="A modal UI SDK Drawer from a side edge."
        inherits={{ label: 'Drawer', doc: 'drawer' }}
        props={[
          { name: 'side', type: "'start' | 'end'", default: "'end'" },
          { name: 'open', type: 'boolean' },
          { name: 'defaultOpen', type: 'boolean', default: 'false' },
          { name: 'onOpenChange', type: '(open: boolean, details) => void' },
        ]}
      />
      <ApiComponent
        name="SideSheetContent"
        description="The sheet surface with its scrim."
        inherits={{ label: 'DrawerContent', doc: 'drawer' }}
        props={[{ name: 'detached', type: 'boolean', default: 'false' }]}
      />
      <ApiComponent
        name="StandardSideSheet"
        description={
          <>
            An <Code>aside</Code> that sits in the layout. Takes every <Code>aside</Code> prop.
          </>
        }
        props={[
          { name: 'open', type: 'boolean' },
          { name: 'defaultOpen', type: 'boolean', default: 'true' },
          { name: 'onOpenChange', type: '(open: boolean) => void' },
          { name: 'side', type: "'start' | 'end'", default: "'end'" },
          { name: 'divider', type: 'boolean', default: 'true' },
        ]}
      />
      <ApiComponent name="SideSheetTrigger" description="Opens the modal sheet." />
      <ApiComponent
        name="SideSheetHeader"
        description="A row for the back button, title and close button."
      />
      <ApiComponent name="SideSheetTitle" description="Names the sheet." />
      <ApiComponent name="SideSheetDescription" description="Supporting text under the title." />
      <ApiComponent
        name="SideSheetClose"
        description="Closes the sheet. Renders an icon button unless you pass render."
      />
      <ApiComponent name="SideSheetBody" description="The scrolling content area." />
      <ApiComponent
        name="SideSheetActions"
        description="A row of buttons at the bottom, under a divider."
      />
    </Section>
  );
}
