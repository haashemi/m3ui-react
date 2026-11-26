import type * as React from 'react';

import { ApiComponent, type PropDoc } from '~/components/api-reference';

const iconButtonProps: PropDoc[] = [
  {
    name: 'variant',
    type: "'filled' | 'tonal' | 'outlined' | 'standard'",
    default: "'standard'",
  },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
  { name: 'width', type: "'narrow' | 'default' | 'wide'", default: "'default'" },
  { name: 'shape', type: "'round' | 'square'", default: "'round'" },
];

export function ToolbarItemsApi(): React.JSX.Element {
  return (
    <>
      <ApiComponent
        name="ToolbarIconButton"
        description="An icon button that takes part in the toolbar's arrow-key navigation."
        inherits={{ label: 'ToolbarButton', doc: 'toolbar' }}
        props={iconButtonProps}
      />
      <ApiComponent
        name="ToolbarToggleIconButton"
        description="A toggle icon button whose selected colors follow the toolbar."
        inherits={{ label: 'Toggle', doc: 'toggle' }}
        props={iconButtonProps}
      />
      <ApiComponent
        name="ToolbarButton"
        description="A labeled button inside a toolbar."
        inherits={{ label: 'ToolbarButton', doc: 'toolbar' }}
        props={[
          {
            name: 'variant',
            type: "'elevated' | 'filled' | 'tonal' | 'outlined' | 'text'",
            default: "'text'",
          },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'sm'" },
          { name: 'shape', type: "'round' | 'square'", default: "'round'" },
        ]}
      />
      <ApiComponent
        name="ToolbarToggleGroup"
        description="A UI SDK ToggleGroup that follows the toolbar's orientation."
        inherits={{ label: 'ToggleGroup', doc: 'toggle' }}
      />
    </>
  );
}
