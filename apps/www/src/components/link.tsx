import type * as React from 'react';

import { base, navigate } from '~/router';

export function Link({
  to,
  onClick,
  children,
  ...props
}: Omit<React.ComponentProps<'a'>, 'href'> & { to: string }): React.JSX.Element {
  return (
    <a
      href={`${base}${to}`}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
