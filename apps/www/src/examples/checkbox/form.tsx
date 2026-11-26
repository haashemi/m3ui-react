import * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';
import { Checkbox } from '@/registry/m3ui/ui/checkbox';

export default function CheckboxForm(): React.JSX.Element {
  const [submitted, setSubmitted] = React.useState<string[]>([]);
  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(data.getAll('notify').map(String));
      }}
    >
      <fieldset className="flex flex-col">
        <legend className="pbe-2 type-title-small">Notify me about</legend>
        <label className="flex items-center gap-2 type-body-large">
          <Checkbox name="notify" value="comments" defaultChecked />
          Comments
        </label>
        <label className="flex items-center gap-2 type-body-large">
          <Checkbox name="notify" value="mentions" />
          Mentions
        </label>
      </fieldset>
      <Button type="submit" variant="tonal">
        Save
      </Button>
      <p className="type-body-medium text-on-surface-variant">
        Submitted: {submitted.length > 0 ? submitted.join(', ') : 'nothing yet'}
      </p>
    </form>
  );
}
