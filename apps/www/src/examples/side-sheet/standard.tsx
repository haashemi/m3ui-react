import * as React from 'react';

import { CloseIcon, FilterListIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { Checkbox } from '@/registry/m3ui/ui/checkbox';
import {
  SideSheetBody,
  SideSheetClose,
  SideSheetHeader,
  SideSheetTitle,
  StandardSideSheet,
} from '@/registry/m3ui/ui/side-sheet';

const filters = ['Unread', 'Starred', 'Has attachments', 'From contacts'];

export default function SideSheetStandard(): React.JSX.Element {
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
          Filters
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
        </SideSheetBody>
      </StandardSideSheet>
    </div>
  );
}
