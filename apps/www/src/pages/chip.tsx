import * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import {
  DirectionsCarIcon,
  EventIcon,
  FlightIcon,
  LightbulbIcon,
  LocalCafeIcon,
  RestaurantIcon,
  UndoIcon,
} from '~/icons';
import {
  AssistChip,
  ChipSet,
  FilterChip,
  FilterChipGroup,
  InputChip,
  SuggestionChip,
} from '@/registry/m3ui/ui/chip';

const initialPeople = ['Ada Lovelace', 'Alan Turing', 'Grace Hopper'];

function InputChips(): React.JSX.Element {
  const [people, setPeople] = React.useState(initialPeople);
  const [showMeeting, setShowMeeting] = React.useState(true);
  return (
    <ChipSet>
      {people.map((person) => (
        <InputChip
          key={person}
          avatar={
            <span className="flex items-center justify-center bg-primary type-label-medium text-on-primary block-full inline-full">
              {person[0]}
            </span>
          }
          onRemove={() => setPeople((current) => current.filter((value) => value !== person))}
        >
          {person}
        </InputChip>
      ))}
      {showMeeting ? (
        <InputChip icon={<EventIcon />} onRemove={() => setShowMeeting(false)}>
          Team sync
        </InputChip>
      ) : null}
      {people.length < initialPeople.length || !showMeeting ? (
        <AssistChip
          icon={<UndoIcon />}
          onClick={() => {
            setPeople(initialPeople);
            setShowMeeting(true);
          }}
        >
          Reset
        </AssistChip>
      ) : null}
    </ChipSet>
  );
}

export function ChipsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Chips"
        description="Chips help people enter information, make selections, filter content or trigger actions. Assist, filter, input and suggestion chips, outlined or elevated."
        item="chip"
      />

      <Section title="Assist" description="Smart or automated actions that span multiple apps.">
        <Preview code="<AssistChip icon={<EventIcon />}>Add to calendar</AssistChip>">
          <AssistChip icon={<EventIcon />}>Add to calendar</AssistChip>
          <AssistChip icon={<DirectionsCarIcon />}>Get directions</AssistChip>
          <AssistChip variant="elevated" icon={<LightbulbIcon />}>
            Elevated
          </AssistChip>
          <AssistChip disabled icon={<EventIcon />}>
            Disabled
          </AssistChip>
        </Preview>
      </Section>

      <Section
        title="Filter"
        description="Selecting a filter chip adds a checkmark that grows in with the fast spatial spring."
      >
        <Preview
          className="flex-col"
          code={`<FilterChipGroup multiple aria-label="Amenities" defaultValue={['cafe']}>
  <FilterChip value="cafe" icon={<LocalCafeIcon />}>Café</FilterChip>
  <FilterChip value="dining">Dining</FilterChip>
</FilterChipGroup>`}
        >
          <FilterChipGroup multiple aria-label="Amenities" defaultValue={['cafe', 'dining']}>
            <FilterChip value="cafe" icon={<LocalCafeIcon />}>
              Café
            </FilterChip>
            <FilterChip value="dining" icon={<RestaurantIcon />}>
              Dining
            </FilterChip>
            <FilterChip value="flights">Flights</FilterChip>
            <FilterChip value="parking">Parking</FilterChip>
          </FilterChipGroup>
          <ChipSet>
            <FilterChip variant="elevated">Elevated</FilterChip>
            <FilterChip disabled>Disabled</FilterChip>
            <FilterChip disabled defaultPressed>
              Disabled
            </FilterChip>
          </ChipSet>
        </Preview>
      </Section>

      <Section
        title="Input"
        description="Discrete pieces of information entered by a user. Remove one with its close button, or with Backspace or Delete while it's focused."
      >
        <Preview code='<InputChip avatar={<img src="…" alt="" />} onRemove={remove}>Ada Lovelace</InputChip>'>
          <InputChips />
        </Preview>
      </Section>

      <Section title="Suggestion" description="Dynamically generated suggestions, like replies.">
        <Preview code="<SuggestionChip>Sounds good</SuggestionChip>">
          <SuggestionChip>Sounds good</SuggestionChip>
          <SuggestionChip icon={<FlightIcon />}>Book a flight</SuggestionChip>
          <SuggestionChip variant="elevated">Elevated</SuggestionChip>
          <SuggestionChip disabled>Disabled</SuggestionChip>
        </Preview>
      </Section>
    </>
  );
}
