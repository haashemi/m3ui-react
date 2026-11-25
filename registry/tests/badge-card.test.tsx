import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vite-plus/test';

import { Badge, BadgeAnchor } from '@/registry/m3ui/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardPrimaryAction,
  CardTitle,
} from '@/registry/m3ui/ui/card';

describe(Badge, () => {
  it('renders a small dot without content and a large badge with content', () => {
    const { container } = render(
      <>
        <Badge data-testid="small" />
        <Badge data-testid="blank"> </Badge>
        <Badge data-testid="large">12</Badge>
      </>,
    );
    expect(screen.getByTestId('small').dataset['size']).toBe('small');
    expect(screen.getByTestId('blank').dataset['size']).toBe('small');
    expect(screen.getByTestId('blank').textContent).toBe('');
    const large = screen.getByTestId('large');
    expect(large.dataset['size']).toBe('large');
    expect(large.textContent).toBe('12');
    expect(container.querySelectorAll('[data-slot=badge]')).toHaveLength(3);
  });

  it('anchors to the top end of its sibling inside BadgeAnchor', () => {
    render(
      <BadgeAnchor data-testid="anchor">
        <svg />
        <Badge data-testid="badge">3</Badge>
      </BadgeAnchor>,
    );
    expect(screen.getByTestId('anchor').className).toContain('relative');
    expect(screen.getByTestId('badge').className).toContain(
      '[[data-slot=badge-anchor]>&]:inset-s-[calc(100%-12px)]',
    );
  });
});

describe(Card, () => {
  it('renders a static card with its variant and parts', () => {
    render(
      <Card variant="outlined" data-testid="card">
        <CardHeader>
          <CardTitle>Header</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    const card = screen.getByTestId('card');
    expect(card.dataset['variant']).toBe('outlined');
    expect(card.querySelector('[data-slot=card-title]')?.textContent).toBe('Header');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('stretches a named primary action with a ripple over the card, below the footer', () => {
    const onClick = vi.fn();
    render(
      <Card>
        <CardPrimaryAction aria-label="Open trip" onClick={onClick} />
        <CardContent>Lisbon</CardContent>
        <CardFooter>
          <button type="button">Share</button>
        </CardFooter>
      </Card>,
    );
    const action = screen.getByRole('button', { name: 'Open trip' });
    expect(action.className).toContain('absolute inset-0');
    expect(action.querySelector('[data-slot=ripple]')).not.toBeNull();
    fireEvent.click(action);
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Share' }).parentElement?.className).toContain('z-3');
  });

  it('marks a disabled primary action', () => {
    render(
      <Card>
        <CardPrimaryAction aria-label="Open" disabled />
      </Card>,
    );
    const action = screen.getByRole('button', { name: 'Open' });
    expect(action.dataset['disabled']).toBe('');
  });
});
