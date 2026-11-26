import * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { ArrowBackIcon, CloseIcon, FilterListIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { Checkbox } from '@/registry/m3ui/ui/checkbox';
import { IconButton } from '@/registry/m3ui/ui/icon-button';
import {
  SideSheet,
  SideSheetActions,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
  StandardSideSheet,
} from '@/registry/m3ui/ui/side-sheet';

const filters = ['Unread', 'Starred', 'Has attachments', 'From contacts', 'Sent to me'];

function FilterList(): React.JSX.Element {
  return (
    <ul className="flex flex-col">
      {filters.map((filter) => (
        <li key={filter}>
          <label className="flex items-center gap-2 py-1 type-body-large">
            <Checkbox defaultChecked={filter === 'Unread'} />
            {filter}
          </label>
        </li>
      ))}
    </ul>
  );
}

function ModalExample({
  label,
  detached = false,
  back = false,
}: {
  label: string;
  detached?: boolean;
  back?: boolean;
}): React.JSX.Element {
  return (
    <SideSheet>
      <SideSheetTrigger render={<Button variant="tonal" />}>{label}</SideSheetTrigger>
      <SideSheetContent detached={detached}>
        <SideSheetHeader>
          {back ? (
            <SideSheetClose aria-label="Back" render={<IconButton width="narrow" />}>
              <ArrowBackIcon />
            </SideSheetClose>
          ) : null}
          <SideSheetTitle>Filters</SideSheetTitle>
          <SideSheetClose aria-label="Close">
            <CloseIcon />
          </SideSheetClose>
        </SideSheetHeader>
        <SideSheetBody>
          <FilterList />
        </SideSheetBody>
        <SideSheetActions>
          <SideSheetClose render={<Button />}>Save</SideSheetClose>
          <SideSheetClose render={<Button variant="outlined" />}>Cancel</SideSheetClose>
        </SideSheetActions>
      </SideSheetContent>
    </SideSheet>
  );
}

function StandardExample(): React.JSX.Element {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="flex overflow-hidden rounded-corner-large bg-surface block-120 inline-full">
      <div className="flex flex-1 flex-col items-start gap-4 p-6 min-inline-0">
        <h3 className="type-title-large">Inbox</h3>
        <p className="type-body-medium text-on-surface-variant">
          The standard sheet shares the space with this content and pushes it aside.
        </p>
        <Button variant="tonal" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <FilterListIcon />
          {open ? 'Hide filters' : 'Show filters'}
        </Button>
      </div>
      <StandardSideSheet aria-label="Filters" open={open} onOpenChange={setOpen}>
        <SideSheetHeader>
          <SideSheetTitle>Filters</SideSheetTitle>
          <SideSheetClose aria-label="Close filters">
            <CloseIcon />
          </SideSheetClose>
        </SideSheetHeader>
        <SideSheetBody>
          <FilterList />
        </SideSheetBody>
      </StandardSideSheet>
    </div>
  );
}

export function SideSheetsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Side sheets"
        description="Side sheets show secondary content anchored to the side of the screen. Standard side sheets sit beside the main content; modal side sheets slide in over a scrim and block the rest of the page until they close."
        item="side-sheet"
      />

      <Section
        title="Modal"
        description="Modal side sheets come from the end edge, round their inner corners and close with Escape, a press on the scrim, a swipe toward their edge or any close part. Detached sheets float 16dp from the edges with all corners rounded."
      >
        <Preview
          code={`<SideSheet>
  <SideSheetTrigger render={<Button variant="tonal" />}>Open</SideSheetTrigger>
  <SideSheetContent>
    <SideSheetHeader>
      <SideSheetTitle>Filters</SideSheetTitle>
      <SideSheetClose aria-label="Close"><CloseIcon /></SideSheetClose>
    </SideSheetHeader>
    <SideSheetBody>…</SideSheetBody>
    <SideSheetActions>
      <SideSheetClose render={<Button />}>Save</SideSheetClose>
      <SideSheetClose render={<Button variant="outlined" />}>Cancel</SideSheetClose>
    </SideSheetActions>
  </SideSheetContent>
</SideSheet>

<SideSheetContent detached>…</SideSheetContent>`}
        >
          <ModalExample label="Modal" />
          <ModalExample label="Detached" detached />
          <ModalExample label="With back button" back />
        </Preview>
      </Section>

      <Section
        title="Standard"
        description="Standard side sheets are part of the layout. They open and close with the spatial spring, take the surface color and a divider on their inner edge, and become inert while closed."
      >
        <Preview
          code={`const [open, setOpen] = React.useState(true);

<div className="flex">
  <main className="flex-1">…</main>
  <StandardSideSheet aria-label="Filters" open={open} onOpenChange={setOpen}>
    <SideSheetHeader>
      <SideSheetTitle>Filters</SideSheetTitle>
      <SideSheetClose aria-label="Close filters"><CloseIcon /></SideSheetClose>
    </SideSheetHeader>
    <SideSheetBody>…</SideSheetBody>
  </StandardSideSheet>
</div>`}
        >
          <StandardExample />
        </Preview>
      </Section>
    </>
  );
}
