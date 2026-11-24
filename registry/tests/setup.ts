import { cleanup } from '@testing-library/react';
import { afterEach } from 'vite-plus/test';

afterEach(cleanup);

Object.defineProperty(Element.prototype, 'animate', {
  configurable: true,
  value() {
    return { cancel() {} };
  },
});
