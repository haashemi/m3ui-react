import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

const variantProp = { name: 'variant', type: "'outlined' | 'elevated'", default: "'outlined'" };
const iconProp = { name: 'icon', type: 'React.ReactNode', description: 'A leading icon.' };

export function ChipPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Chips"
        description="Chips help people enter information, make selections, filter content or trigger actions. Assist, filter, input and suggestion chips, outlined or elevated."
      />
      <ComponentPreview name="chip/demo" />

      <Section title="Installation">
        <Installation item="chip" />
      </Section>

      <UsageSection
        imports={`import {
  AssistChip,
  ChipSet,
  FilterChip,
  FilterChipGroup,
  InputChip,
  SuggestionChip,
} from '@/components/ui/chip';`}
        code={`<ChipSet>
  <AssistChip icon={<EventIcon />}>Add to calendar</AssistChip>
  <SuggestionChip>Sounds good</SuggestionChip>
</ChipSet>`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            <strong>Assist</strong> chips start smart or automated actions. <strong>Filter</strong>{' '}
            chips are toggles that narrow content. <strong>Input</strong> chips hold information
            people entered and can be removed. <strong>Suggestion</strong> chips offer generated
            options, like replies.
          </p>
          <p>
            Put loose chips in a <Code>ChipSet</Code> so they wrap with M3 spacing. Group filter
            chips in a <Code>FilterChipGroup</Code>, a UI SDK ToggleGroup with one Tab stop and
            arrow keys between chips.
          </p>
          <p>
            An input chip with <Code>onRemove</Code> gets a remove button, and Backspace or Delete
            removes it while focused. Translate the button&apos;s name with <Code>removeLabel</Code>
            .
          </p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Assist', name: 'chip/assist' },
          {
            title: 'Filter',
            name: 'chip/filter',
            description: 'Selecting a filter chip adds a checkmark on the fast spatial spring.',
          },
          { title: 'Single-select filter', name: 'chip/filter-single' },
          { title: 'Input', name: 'chip/input' },
          { title: 'Suggestion', name: 'chip/suggestion' },
          { title: 'Elevated', name: 'chip/elevated' },
          { title: 'Disabled', name: 'chip/disabled' },
        ]}
      />
      <RtlSection name="chip/rtl" />

      <ChipApi />
    </>
  );
}

function ChipApi(): React.JSX.Element {
  return (
    <Section title="API Reference">
      <ApiComponent
        name="AssistChip"
        description="A UI SDK Button styled as an assist chip."
        inherits={{ label: 'Button', doc: 'button' }}
        props={[variantProp, iconProp]}
      />
      <ApiComponent
        name="FilterChip"
        description="A UI SDK Toggle styled as a filter chip."
        inherits={{ label: 'Toggle', doc: 'toggle' }}
        props={[
          variantProp,
          iconProp,
          { name: 'trailingIcon', type: 'React.ReactNode' },
          { name: 'value', type: 'string', description: 'Identifies it in a group.' },
          { name: 'defaultPressed', type: 'boolean', default: 'false' },
        ]}
      />
      <ApiComponent
        name="FilterChipGroup"
        description="A UI SDK ToggleGroup that wraps its chips."
        inherits={{ label: 'ToggleGroup', doc: 'toggle' }}
        props={[
          { name: 'multiple', type: 'boolean', default: 'false' },
          { name: 'value', type: 'string[]' },
          { name: 'defaultValue', type: 'string[]' },
          { name: 'onValueChange', type: '(value: string[], details) => void' },
        ]}
      />
      <ApiComponent
        name="InputChip"
        description="A UI SDK Button for the chip, plus a remove button when onRemove is set."
        inherits={{ label: 'Button', doc: 'button' }}
        props={[
          iconProp,
          { name: 'avatar', type: 'React.ReactNode', description: 'Replaces the icon.' },
          { name: 'onRemove', type: '() => void' },
          { name: 'removeLabel', type: 'string', default: "'Remove'" },
          { name: 'selected', type: 'boolean', default: 'false' },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]}
      />
      <ApiComponent
        name="SuggestionChip"
        description="A UI SDK Button styled as a suggestion chip."
        inherits={{ label: 'Button', doc: 'button' }}
        props={[variantProp, iconProp]}
      />
      <ApiComponent
        name="ChipSet"
        description={
          <>
            A <Code>div</Code> that wraps chips with an 8dp gap.
          </>
        }
      />
    </Section>
  );
}
