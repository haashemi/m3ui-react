import type * as React from 'react';

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/registry/m3ui/ui/bottom-sheet';
import { Button } from '@/registry/m3ui/ui/button';

export default function BottomSheetModalAbove(): React.JSX.Element {
  return (
    <BottomSheet snapPoints={[0.25, 0.9]} modalAbove={0.25}>
      <BottomSheetTrigger render={<Button variant="outlined" />}>Directions</BottomSheetTrigger>
      <BottomSheetContent className="block-dvh">
        <BottomSheetTitle>Directions</BottomSheetTitle>
        <BottomSheetDescription>
          Drag up to expand. Expanded, the sheet becomes modal.
        </BottomSheetDescription>
      </BottomSheetContent>
    </BottomSheet>
  );
}
