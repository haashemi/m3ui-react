import * as React from 'react';

export const languages = [
  { code: 'fa', label: 'Persian (فارسی)' },
  { code: 'ar', label: 'Arabic (العربية)' },
  { code: 'he', label: 'Hebrew (עברית)' },
] as const;

export type Language = (typeof languages)[number]['code'];

export type Translations<T> = Record<Language, T>;

export const LanguageContext = React.createContext<Language>('fa');

export function useTranslation<T>(translations: Translations<T>): {
  dir: 'rtl';
  lang: Language;
  t: T;
} {
  const lang = React.use(LanguageContext);
  return { dir: 'rtl', lang, t: translations[lang] };
}
