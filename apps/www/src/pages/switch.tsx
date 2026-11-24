import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { Switch } from '@/registry/m3ui/ui/switch';

export function SwitchPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Switch"
        description="Switches turn a setting on or off. The handle grows when selected and when pressed, and slides on the fast spatial spring."
        item="switch"
      />

      <Section title="Basic">
        <Preview
          code={`<label className="flex items-center gap-4">
  Wi-Fi
  <Switch defaultChecked />
</label>`}
        >
          <label className="flex items-center gap-4 type-body-large">
            Wi-Fi
            <Switch defaultChecked />
          </label>
          <label className="flex items-center gap-4 type-body-large">
            Bluetooth
            <Switch />
          </label>
        </Preview>
      </Section>

      <Section
        title="Icons"
        description="Show a check on the selected handle, or icons in both states."
      >
        <Preview code='<Switch icons="checked" />\n<Switch icons="both" />'>
          <Switch aria-label="Check icon" icons="checked" defaultChecked />
          <Switch aria-label="Check icon, off" icons="checked" />
          <Switch aria-label="Both icons" icons="both" defaultChecked />
          <Switch aria-label="Both icons, off" icons="both" />
        </Preview>
      </Section>

      <Section title="Disabled">
        <Preview code="<Switch disabled />">
          <Switch aria-label="Disabled, on" disabled defaultChecked icons="both" />
          <Switch aria-label="Disabled, off" disabled icons="both" />
          <Switch aria-label="Disabled, on, no icon" disabled defaultChecked />
          <Switch aria-label="Disabled, off, no icon" disabled />
        </Preview>
      </Section>
    </>
  );
}
