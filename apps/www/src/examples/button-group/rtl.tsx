import type * as React from 'react';

import { ArrowBackIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Button } from '@/registry/m3ui/ui/button';
import { ButtonGroup } from '@/registry/m3ui/ui/button-group';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const translations: Translations<{ back: string; skip: string; next: string }> = {
  fa: { back: 'بازگشت', skip: 'رد شدن', next: 'بعدی' },
  ar: { back: 'رجوع', skip: 'تخطي', next: 'التالي' },
  he: { back: 'חזרה', skip: 'דילוג', next: 'הבא' },
};

export default function ButtonGroupRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang}>
      <ButtonGroup>
        <IconButton variant="tonal" aria-label={t.back}>
          <ArrowBackIcon className="rtl:-scale-x-100" />
        </IconButton>
        <Button variant="tonal">{t.skip}</Button>
        <Button>{t.next}</Button>
      </ButtonGroup>
    </div>
  );
}
