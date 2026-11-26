import * as React from 'react';

import { MicIcon } from '~/icons';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

export default function ToggleIconButtonControlled(): React.JSX.Element {
  const [listening, setListening] = React.useState(false);
  return (
    <div className="flex items-center gap-4">
      <ToggleIconButton
        variant="filled"
        size="md"
        aria-label="Voice input"
        pressed={listening}
        onPressedChange={setListening}
      >
        <MicIcon />
      </ToggleIconButton>
      <p className="type-body-medium text-on-surface-variant">
        {listening ? 'Listening…' : 'Microphone off'}
      </p>
    </div>
  );
}
