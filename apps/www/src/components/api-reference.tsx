import type * as React from 'react';

import { SubSection } from '~/components/docs';

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export function ApiComponent({
  name,
  description,
  props,
  inherits,
}: {
  name: string;
  description: React.ReactNode;
  props?: PropDoc[];
  inherits?: { label: string; doc: string };
}): React.JSX.Element {
  return (
    <SubSection title={name} id={`api-${name.toLowerCase()}`} description={description}>
      {props && props.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="border-collapse text-start type-body-medium inline-full">
            <thead>
              <tr className="border-be border-outline-variant text-on-surface-variant">
                <th className="py-2 pe-4 text-start type-label-large">Prop</th>
                <th className="py-2 pe-4 text-start type-label-large">Type</th>
                <th className="py-2 text-start type-label-large">Default</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop) => (
                <tr key={prop.name} className="border-be border-outline-variant align-top">
                  <td className="py-3 pe-4">
                    <code className="font-mono text-primary">{prop.name}</code>
                    {prop.description ? (
                      <p className="pbs-1 type-body-small text-on-surface-variant min-inline-40">
                        {prop.description}
                      </p>
                    ) : null}
                  </td>
                  <td className="py-3 pe-4">
                    <code className="font-mono">{prop.type}</code>
                  </td>
                  <td className="py-3">
                    <code className="font-mono text-on-surface-variant">{prop.default ?? '-'}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {inherits ? (
        <p className="type-body-medium text-on-surface-variant">
          Also takes every prop of UI SDK&apos;s{' '}
          <a
            href={`https://ui-sdk.dev/docs/react/components/${inherits.doc}`}
            className="text-primary underline"
          >
            {inherits.label}
          </a>
          .
        </p>
      ) : null}
    </SubSection>
  );
}
