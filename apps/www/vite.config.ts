import { fileURLToPath } from 'node:url';

import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite-plus';

const path = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  base: '/m3ui-react/',
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: [
      { find: /^~\//u, replacement: `${path('./src')}/` },
      { find: /^@\/registry\//u, replacement: `${path('../../registry')}/` },
      { find: '@/lib/utils', replacement: path('../../registry/lib/utils.ts') },
    ],
    dedupe: ['react', 'react-dom'],
  },
});
