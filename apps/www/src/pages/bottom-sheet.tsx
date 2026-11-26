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

export function BottomSheetPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Bottom Sheet"
        description="Bottom sheets show secondary content anchored to the bottom of the screen. Drag them by the handle or the surface, fling them closed, or rest them on snap points."
      />
      <ComponentPreview name="bottom-sheet/demo" />

      <Section title="Installation">
        <Installation item="bottom-sheet" />
      </Section>

      <UsageSection
        imports={`import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/components/ui/bottom-sheet';`}
        code={`<BottomSheet>
  <BottomSheetTrigger render={<Button />}>Open</BottomSheetTrigger>
  <BottomSheetContent>
    <BottomSheetTitle>Report.pdf</BottomSheetTitle>
    <BottomSheetDescription>Shared with 3 people</BottomSheetDescription>
  </BottomSheetContent>
</BottomSheet>`}
      />

      <CompositionSection
        tree={`BottomSheet
├── BottomSheetTrigger
└── BottomSheetContent
    ├── BottomSheetTitle
    └── BottomSheetDescription`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Bottom sheets are UI SDK Drawers on the bottom edge. They follow the expressive spatial
            spring and fade instead of sliding when people prefer reduced motion.
          </p>
          <p>
            Modal sheets dim the page and trap focus. They rise to fit their content, up to 640dp
            wide. Set <Code>modal={'{false}'}</Code> to leave the page usable.
          </p>
          <p>
            With more than one snap point, the drag handle becomes a button: press it to cycle
            sizes, or use the arrow keys, Home and End. Translate its name with{' '}
            <Code>dragHandleLabel</Code>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Without a drag handle', name: 'bottom-sheet/no-handle' },
          {
            title: 'Snap points',
            name: 'bottom-sheet/snap-points',
            description: 'Scrolling the list expands the sheet before the list scrolls.',
          },
          { title: 'Standard', name: 'bottom-sheet/standard' },
          {
            title: 'Modal when expanded',
            name: 'bottom-sheet/modal-above',
            description:
              'With modalAbove, the sheet stays standard at its small snap point and turns modal once expanded.',
          },
        ]}
      />
      <RtlSection name="bottom-sheet/rtl" />
      <BottomSheetApi />
    </>
  );
}

function BottomSheetApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="BottomSheet"
        description="A UI SDK Drawer on the bottom edge with M3 physics."
        inherits={{ label: 'Drawer', doc: 'drawer' }}
        props={[
          { name: 'open', type: 'boolean' },
          { name: 'onOpenChange', type: '(open: boolean, details) => void' },
          { name: 'modal', type: "boolean | 'trap-focus'", default: 'true' },
          {
            name: 'snapPoints',
            type: 'SnapPoint[]',
            description: "Where it rests: screen fractions, pixels, '…rem', '…%' or 'content'.",
          },
          { name: 'modalAbove', type: 'SnapPoint', description: 'Turns modal above this point.' },
          { name: 'expandOnScroll', type: 'boolean', default: 'false' },
        ]}
      />
      <ApiComponent
        name="BottomSheetContent"
        description="The sheet surface, its scrim and its drag handle."
        inherits={{ label: 'DrawerContent', doc: 'drawer' }}
        props={[
          { name: 'dragHandle', type: 'boolean', default: 'true' },
          { name: 'dragHandleLabel', type: 'string', default: "'Resize'" },
        ]}
      />
      <ApiComponent name="BottomSheetTrigger" description="Opens the sheet." />
      <ApiComponent name="BottomSheetTitle" description="Names the sheet." />
      <ApiComponent name="BottomSheetDescription" description="Supporting text under the title." />
    </Section>
  );
}
