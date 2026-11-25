export function pageTitle(title?: string): { meta: { title: string }[] } {
  return { meta: [{ title: title ? `${title} · M3UI React` : 'M3UI React' }] };
}
