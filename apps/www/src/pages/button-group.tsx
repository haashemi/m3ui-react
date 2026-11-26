import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, DocLink, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

export function ButtonGroupPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Button Group"
        description="Button groups organize buttons and add interactions between them. When a button is pressed, it grows and its neighbors make room."
      />
      <ComponentPreview name="button-group/demo" />

      <Section title="Installation">
        <Installation item="button-group" />
      </Section>

      <UsageSection
        imports="import { ButtonGroup } from '@/components/ui/button-group';"
        code={`<ButtonGroup>
  <Button>Edit</Button>
  <Button>Share</Button>
</ButtonGroup>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Any button works inside: <DocLink to="/components/button">Button</DocLink>,{' '}
            <DocLink to="/components/icon-button">Icon Button</DocLink> and their toggle versions.
            Give the group and its buttons the same <Code>size</Code>; the group sets the gap
            between them.
          </p>
          <p>
            Pressing a button widens it by 15% on the fast spatial spring while its neighbors
            shrink, by pointer or by Enter and Space.
          </p>
          <p>
            For a set of options where one or several stay selected, use a{' '}
            <DocLink to="/components/connected-button-group">Connected Button Group</DocLink>.
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          {
            title: 'Sizes',
            name: 'button-group/sizes',
            description: 'Press and hold a button to see it grow.',
          },
          { title: 'Buttons', name: 'button-group/buttons' },
          { title: 'Toggle icon buttons', name: 'button-group/toggles' },
        ]}
      />
      <RtlSection name="button-group/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="ButtonGroup"
          description={
            <>
              A <Code>div</Code> with <Code>role=&quot;group&quot;</Code> that spaces its buttons
              and grows the pressed one. Takes every <Code>div</Code> prop.
            </>
          }
          props={[
            {
              name: 'size',
              type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
              default: "'sm'",
              description: 'Match the size of the buttons inside.',
            },
          ]}
        />
      </Section>
    </>
  );
}
