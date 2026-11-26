import type * as React from 'react';

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/registry/m3ui/ui/bottom-sheet';
import { Button } from '@/registry/m3ui/ui/button';

const places = Array.from({ length: 16 }, (_, index) => `Place ${index + 1}`);

export default function BottomSheetSnapPoints(): React.JSX.Element {
  return (
    <BottomSheet snapPoints={[0.5, 1]} expandOnScroll>
      <BottomSheetTrigger render={<Button variant="tonal" />}>Places nearby</BottomSheetTrigger>
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
  );
}
