import type * as React from 'react';

import { EditIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { ExtendedFab } from '@/registry/m3ui/ui/extended-fab';

const translations: Translations<{ compose: string }> = {
  fa: { compose: 'نوشتن' },
  ar: { compose: 'إنشاء' },
  he: { compose: 'כתיבה' },
};

export default function ExtendedFabRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex flex-wrap items-center justify-center gap-4">
      <ExtendedFab icon={<EditIcon />}>{t.compose}</ExtendedFab>
      <ExtendedFab size="medium" variant="secondary-container" icon={<EditIcon />}>
        {t.compose}
      </ExtendedFab>
    </div>
  );
}
