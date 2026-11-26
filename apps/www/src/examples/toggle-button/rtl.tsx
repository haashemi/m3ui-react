import type * as React from 'react';

import { BookmarkFillIcon, BookmarkIcon, StarFillIcon, StarIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

const translations: Translations<{ save: string; star: string }> = {
  fa: { save: 'ذخیره', star: 'ستاره‌دار' },
  ar: { save: 'حفظ', star: 'تمييز بنجمة' },
  he: { save: 'שמירה', star: 'סימון בכוכב' },
};

export default function ToggleButtonRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex flex-wrap items-center justify-center gap-4">
      <ToggleButton defaultPressed>
        <BookmarkIcon className="in-data-pressed:hidden" />
        <BookmarkFillIcon className="not-in-data-pressed:hidden" />
        {t.save}
      </ToggleButton>
      <ToggleButton variant="outlined">
        <StarIcon className="in-data-pressed:hidden" />
        <StarFillIcon className="not-in-data-pressed:hidden" />
        {t.star}
      </ToggleButton>
    </div>
  );
}
