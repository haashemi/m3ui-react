export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^0-9a-z]+/gu, '-')
    .replaceAll(/^-|-$/gu, '');
}
