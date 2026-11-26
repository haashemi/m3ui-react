import * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { DeleteIcon, DriveFileMoveIcon, LinkIcon, ShareIcon } from '~/icons';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/registry/m3ui/ui/bottom-sheet';
import { Button } from '@/registry/m3ui/ui/button';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const actions = [
  { label: 'Share', icon: ShareIcon },
  { label: 'Get link', icon: LinkIcon },
  { label: 'Move', icon: DriveFileMoveIcon },
  { label: 'Delete', icon: DeleteIcon },
];

const places = Array.from({ length: 16 }, (_, index) => `Place ${index + 1}`);

function ActionList({ onAction }: { onAction: () => void }): React.JSX.Element {
  return (
    <ul className="flex flex-col pbe-4">
      {actions.map(({ label, icon: Icon }) => (
        <li key={label}>
          <button
            type="button"
            onClick={onAction}
            className="relative focus-ring flex cursor-pointer items-center gap-4 px-6 text-start type-body-large text-on-surface block-14 inline-full"
          >
            <Ripple />
            <Icon className="fill-on-surface-variant block-6 inline-6" />
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ActionSheet({
  label,
  variant,
  dragHandle = true,
}: {
  label: string;
  variant: 'tonal' | 'outlined';
  dragHandle?: boolean;
}): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    <BottomSheet open={open} onOpenChange={setOpen}>
      <BottomSheetTrigger render={<Button variant={variant} />}>{label}</BottomSheetTrigger>
      <BottomSheetContent dragHandle={dragHandle}>
        <BottomSheetTitle>Report.pdf</BottomSheetTitle>
        <BottomSheetDescription className="mbe-2">Shared with 3 people</BottomSheetDescription>
        <ActionList onAction={() => setOpen(false)} />
      </BottomSheetContent>
    </BottomSheet>
  );
}

function ModalSection(): React.JSX.Element {
  return (
    <Section
      title="Modal"
      description="Modal bottom sheets dim the page with a scrim and trap focus. They rise to fit their content, up to 640dp wide."
    >
      <Preview
        code={`<BottomSheet>
  <BottomSheetTrigger render={<Button variant="tonal" />}>Open</BottomSheetTrigger>
  <BottomSheetContent>
    <BottomSheetTitle>Report.pdf</BottomSheetTitle>
    <BottomSheetDescription>Shared with 3 people</BottomSheetDescription>
    <ul>…</ul>
  </BottomSheetContent>
</BottomSheet>

<BottomSheetContent dragHandle={false}>…</BottomSheetContent>`}
      >
        <ActionSheet label="Modal" variant="tonal" />
        <ActionSheet label="Without drag handle" variant="outlined" dragHandle={false} />
      </Preview>
    </Section>
  );
}

export function BottomSheetsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Bottom sheets"
        description="Bottom sheets show secondary content anchored to the bottom of the screen. Drag them by the handle or the surface, fling them closed, or rest them on snap points. They follow the expressive spatial spring and fade instead of sliding with reduced motion."
        item="bottom-sheet"
      />

      <ModalSection />

      <Section
        title="Snap points"
        description="With more than one snap point the drag handle becomes a button: press it to cycle sizes, or use the arrow keys, Home and End. Scrolling content expands the sheet before it scrolls."
      >
        <Preview
          code={`<BottomSheet snapPoints={[0.5, 1]} expandOnScroll>
  <BottomSheetTrigger render={<Button variant="tonal" />}>Places</BottomSheetTrigger>
  <BottomSheetContent className="block-dvh">
    <BottomSheetTitle>Places nearby</BottomSheetTitle>
    <ul className="min-block-0 flex-1 overflow-y-auto">…</ul>
  </BottomSheetContent>
</BottomSheet>`}
        >
          <BottomSheet snapPoints={[0.5, 1]} expandOnScroll>
            <BottomSheetTrigger render={<Button variant="tonal" />}>
              Places nearby
            </BottomSheetTrigger>
            <BottomSheetContent className="block-dvh">
              <BottomSheetTitle className="mbe-4">Places nearby</BottomSheetTitle>
              <ul className="flex flex-1 flex-col overflow-y-auto px-6 pbe-6 min-block-0">
                {places.map((place) => (
                  <li key={place} className="border-be border-outline-variant py-4 type-body-large">
                    {place}
                  </li>
                ))}
              </ul>
            </BottomSheetContent>
          </BottomSheet>
        </Preview>
      </Section>

      <Section
        title="Standard"
        description="A standard bottom sheet leaves the page usable: no scrim, no focus trap. With modalAbove, a sheet stays standard at its small snap point and turns modal once expanded."
      >
        <Preview
          code={`<BottomSheet modal={false}>…</BottomSheet>

<BottomSheet snapPoints={[0.25, 0.9]} modalAbove={0.25}>…</BottomSheet>`}
        >
          <BottomSheet modal={false}>
            <BottomSheetTrigger render={<Button variant="tonal" />}>Standard</BottomSheetTrigger>
            <BottomSheetContent>
              <BottomSheetTitle>Now playing</BottomSheetTitle>
              <BottomSheetDescription className="mbe-6">
                The page behind stays usable while this sheet is open.
              </BottomSheetDescription>
            </BottomSheetContent>
          </BottomSheet>
          <BottomSheet snapPoints={[0.25, 0.9]} modalAbove={0.25}>
            <BottomSheetTrigger render={<Button variant="outlined" />}>
              Modal when expanded
            </BottomSheetTrigger>
            <BottomSheetContent className="block-dvh">
              <BottomSheetTitle>Directions</BottomSheetTitle>
              <BottomSheetDescription>
                Drag up to expand. Expanded, the sheet becomes modal.
              </BottomSheetDescription>
            </BottomSheetContent>
          </BottomSheet>
        </Preview>
      </Section>
    </>
  );
}
