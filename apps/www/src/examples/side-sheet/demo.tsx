import type * as React from 'react';

import { CloseIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { Checkbox } from '@/registry/m3ui/ui/checkbox';
import {
  SideSheet,
  SideSheetActions,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
} from '@/registry/m3ui/ui/side-sheet';

const filters = ['Unread', 'Starred', 'Has attachments', 'From contacts'];

export default function SideSheetDemo(): React.JSX.Element {
  return (
    <SideSheet>
      <SideSheetTrigger render={<Button variant="tonal" />}>Open filters</SideSheetTrigger>
      <SideSheetContent>
        <SideSheetHeader>
          <SideSheetTitle>Filters</SideSheetTitle>
          <SideSheetClose aria-label="Close">
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
        <SideSheetActions>
          <SideSheetClose render={<Button />}>Save</SideSheetClose>
          <SideSheetClose render={<Button variant="outlined" />}>Cancel</SideSheetClose>
        </SideSheetActions>
      </SideSheetContent>
    </SideSheet>
  );
}
