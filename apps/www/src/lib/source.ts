const typeImport = "import type * as React from 'react';\n\n";

export function toDisplaySource(source: string): string {
  let code = source
    .replaceAll('@/registry/m3ui/ui/', '@/components/ui/')
    .replaceAll('): React.JSX.Element {', ') {')
    .replaceAll(/^[\t ]*\/\/ oxlint-disable.*\n/gmu, '');
  if (code.startsWith(typeImport) && !code.slice(typeImport.length).includes('React.')) {
    code = code.slice(typeImport.length);
  }
  return code;
}
