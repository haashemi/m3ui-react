import { writeFileSync } from 'node:fs';

import { createTheme, createThemeRegistryItem, themeToCss } from '@m3ui/tokens';

const theme = createTheme();
const root = new URL('../', import.meta.url);

writeFileSync(new URL('apps/www/src/styles/m3ui.css', root), themeToCss(theme));
writeFileSync(
  new URL('registry/theme/registry.json', root),
  `${JSON.stringify({ items: [createThemeRegistryItem(theme)] }, null, 2)}\n`,
);
console.log('Wrote apps/www/src/styles/m3ui.css and registry/theme/registry.json');
