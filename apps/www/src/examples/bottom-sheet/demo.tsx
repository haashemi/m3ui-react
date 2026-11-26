import * as React from 'react';

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

export default function BottomSheetDemo(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    <BottomSheet open={open} onOpenChange={setOpen}>
      <BottomSheetTrigger render={<Button variant="tonal" />}>Open sheet</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetTitle>Report.pdf</BottomSheetTitle>
        <BottomSheetDescription className="mbe-2">Shared with 3 people</BottomSheetDescription>
        <ul className="flex flex-col pbe-4">
          {actions.map(({ label, icon: Icon }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative focus-ring flex cursor-pointer items-center gap-4 px-6 text-start type-body-large text-on-surface block-14 inline-full"
              >
                <Ripple />
                <Icon className="fill-on-surface-variant block-6 inline-6" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheetContent>
    </BottomSheet>
  );
}
