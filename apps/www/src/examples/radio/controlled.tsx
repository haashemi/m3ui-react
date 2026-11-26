import * as React from 'react';

import { Radio, RadioGroup } from '@/registry/m3ui/ui/radio';

const themes = ['System', 'Light', 'Dark'];

export default function RadioControlled(): React.JSX.Element {
  const [theme, setTheme] = React.useState<string | null>('System');
  return (
    <div className="flex flex-col items-center gap-4">
      <RadioGroup aria-label="Theme" value={theme} onValueChange={setTheme}>
        {themes.map((name) => (
          <label key={name} className="flex items-center gap-2 type-body-large">
            <Radio value={name} />
            {name}
          </label>
        ))}
      </RadioGroup>
      <p className="type-body-medium text-on-surface-variant">Theme: {theme}</p>
    </div>
  );
}
