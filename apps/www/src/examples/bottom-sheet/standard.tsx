import type * as React from 'react';

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/registry/m3ui/ui/bottom-sheet';
import { Button } from '@/registry/m3ui/ui/button';

export default function BottomSheetStandard(): React.JSX.Element {
  return (
    <BottomSheet modal={false}>
      <BottomSheetTrigger render={<Button variant="tonal" />}>Now playing</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetTitle>Now playing</BottomSheetTitle>
        <BottomSheetDescription className="mbe-6">
          The page behind stays usable while this sheet is open.
        </BottomSheetDescription>
      </BottomSheetContent>
    </BottomSheet>
  );
}
