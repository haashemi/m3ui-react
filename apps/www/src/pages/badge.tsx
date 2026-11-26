import type * as React from 'react';

import { ApiComponent } from '~/components/api-reference';
import {
  ComponentPreview,
  ExamplesSection,
  RtlSection,
  UsageSection,
} from '~/components/component-preview';
import { Code, CompositionSection, PageHeader, Prose, Section } from '~/components/docs';
import { Installation } from '~/components/installation';

export function BadgePage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Badge"
        description="Badges show notifications, counts or status on navigation items and icons. With no content a badge is a small dot; with a number or short label it grows into a large badge."
      />
      <ComponentPreview name="badge/demo" />

      <Section title="Installation">
        <Installation item="badge" />
      </Section>

      <UsageSection
        imports="import { Badge, BadgeAnchor } from '@/components/ui/badge';"
        code={`<BadgeAnchor>
  <NotificationsIcon />
  <Badge>3</Badge>
</BadgeAnchor>`}
      />

      <CompositionSection
        tree={`BadgeAnchor
├── Icon
└── Badge`}
      />

      <Section title="Notes">
        <Prose>
          <p>
            Wrap the icon and badge in <Code>BadgeAnchor</Code>. Small badges sit in the icon&apos;s
            top end corner; large badges start at its center and rise 2dp above it.
          </p>
          <p>
            The badge is only visual. Put the count in the control&apos;s accessible name too, like{' '}
            <Code>aria-label=&quot;Notifications, 3 new&quot;</Code>.
          </p>
          <p>Large badges hold up to four characters. Cap long counts yourself, like 999+.</p>
        </Prose>
      </Section>

      <ExamplesSection
        examples={[
          { title: 'Small and large', name: 'badge/sizes' },
          { title: 'On icon buttons', name: 'badge/icon-buttons' },
          { title: 'Maximum count', name: 'badge/max-count' },
        ]}
      />
      <RtlSection name="badge/rtl" />

      <Section title="API Reference">
        <ApiComponent
          name="Badge"
          description={
            <>
              A <Code>span</Code>. Children make it a large badge; without them it&apos;s a small
              dot. Takes every <Code>span</Code> prop.
            </>
          }
        />
        <ApiComponent
          name="BadgeAnchor"
          description={
            <>
              A <Code>span</Code> that positions a badge on the element next to it. Takes every{' '}
              <Code>span</Code> prop.
            </>
          }
        />
      </Section>
    </>
  );
}
