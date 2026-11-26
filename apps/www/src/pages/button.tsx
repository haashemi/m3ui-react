import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { AddIcon, BookmarkIcon, EditIcon, SendIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

const variants = ['elevated', 'filled', 'tonal', 'outlined', 'text'] as const;
const toggleVariants = ['elevated', 'filled', 'tonal', 'outlined'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export function ButtonsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Buttons"
        description="Buttons prompt most actions in a UI. Five sizes, five color styles, round or square shapes that morph when pressed, and toggle buttons that change shape when selected."
        item="button"
      />

      <Section title="Color styles">
        <Preview
          code={`<Button variant="elevated">Elevated</Button>
<Button variant="filled">Filled</Button>
<Button variant="tonal">Tonal</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>`}
        >
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant[0]?.toUpperCase()}
              {variant.slice(1)}
            </Button>
          ))}
        </Preview>
      </Section>

      <Section title="With an icon">
        <Preview
          code={`<Button>
  <SendIcon />
  Send
</Button>`}
        >
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              <SendIcon />
              Send
            </Button>
          ))}
        </Preview>
      </Section>

      <Section
        title="Sizes"
        description="Extra small (32dp) to extra large (136dp). Padding, icon size, label type and corner radius follow each size's tokens."
      >
        <Preview code='<Button size="xs">Extra small</Button> … <Button size="xl">Extra large</Button>'>
          {sizes.map((size) => (
            <Button key={size} size={size}>
              <EditIcon />
              {size.toUpperCase()}
            </Button>
          ))}
        </Preview>
      </Section>

      <Section
        title="Shapes"
        description="Round and square containers. Press and hold to see the corners morph with the fast spatial spring."
      >
        <Preview
          code={`<Button shape="round">Round</Button>\n<Button shape="square">Square</Button>`}
        >
          {sizes.map((size) => (
            <Button key={size} size={size} shape="square" variant="tonal">
              Square
            </Button>
          ))}
        </Preview>
      </Section>

      <ToggleAndStateSections />
    </>
  );
}

function ToggleAndStateSections(): React.JSX.Element {
  return (
    <>
      <Section
        title="Toggle buttons"
        description="Selecting a toggle button swaps its colors and morphs its shape: round turns square, square turns round."
      >
        <Preview
          code={`<ToggleButton variant="filled">
    <BookmarkIcon />
    Save
  </ToggleButton>`}
        >
          {toggleVariants.map((variant) => (
            <ToggleButton key={variant} variant={variant} defaultPressed={variant === 'filled'}>
              <BookmarkIcon />
              Save
            </ToggleButton>
          ))}
          <ToggleButton shape="square" size="md" defaultPressed>
            <AddIcon />
            Square
          </ToggleButton>
        </Preview>
      </Section>

      <Section title="Disabled">
        <Preview code="<Button disabled>Disabled</Button>">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              Disabled
            </Button>
          ))}
        </Preview>
      </Section>

      <Section title="As a link">
        <Preview code='<Button render={<a href="https://m3.material.io" />}>Material 3</Button>'>
          {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label -- the label comes from Button's children */}
          <Button variant="tonal" render={<a href="https://m3.material.io/components/buttons" />}>
            M3 button guidelines
          </Button>
        </Preview>
      </Section>
    </>
  );
}
