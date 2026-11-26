import * as React from 'react';

import { EventIcon, UndoIcon } from '~/icons';
import { AssistChip, ChipSet, InputChip } from '@/registry/m3ui/ui/chip';

const initialPeople = ['Ada Lovelace', 'Alan Turing', 'Grace Hopper'];

export default function ChipInput(): React.JSX.Element {
  const [people, setPeople] = React.useState(initialPeople);
  const [meeting, setMeeting] = React.useState(true);
  const changed = people.length < initialPeople.length || !meeting;

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
      {meeting ? (
        <InputChip icon={<EventIcon />} onRemove={() => setMeeting(false)}>
          Team sync
        </InputChip>
      ) : null}
      {changed ? (
        <AssistChip
          icon={<UndoIcon />}
          onClick={() => {
            setPeople(initialPeople);
            setMeeting(true);
          }}
        >
          Reset
        </AssistChip>
      ) : null}
    </ChipSet>
  );
}
