import type * as React from 'react';

import { EventIcon, LocalCafeIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import {
  AssistChip,
  ChipSet,
  FilterChip,
  InputChip,
  SuggestionChip,
} from '@/registry/m3ui/ui/chip';

const translations: Translations<{
  calendar: string;
  cafe: string;
  city: string;
  remove: string;
  reply: string;
}> = {
  fa: {
    calendar: 'افزودن به تقویم',
    cafe: 'کافه',
    city: 'تهران',
    remove: 'حذف',
    reply: 'عالیه',
  },
  ar: {
    calendar: 'إضافة إلى التقويم',
    cafe: 'مقهى',
    city: 'القاهرة',
    remove: 'إزالة',
    reply: 'يبدو جيدًا',
  },
  he: {
    calendar: 'הוספה ליומן',
    cafe: 'בית קפה',
    city: 'ירושלים',
    remove: 'הסרה',
    reply: 'נשמע טוב',
  },
};

export default function ChipRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <ChipSet dir={dir} lang={lang}>
      <AssistChip icon={<EventIcon />}>{t.calendar}</AssistChip>
      <FilterChip icon={<LocalCafeIcon />} defaultPressed>
        {t.cafe}
      </FilterChip>
      <InputChip removeLabel={t.remove} onRemove={() => {}}>
        {t.city}
      </InputChip>
      <SuggestionChip>{t.reply}</SuggestionChip>
    </ChipSet>
  );
}
