import type * as React from 'react';

import { EditIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Fab } from '@/registry/m3ui/ui/fab';

const translations: Translations<{ compose: string; inbox: string }> = {
  fa: { compose: 'نوشتن', inbox: 'صندوق ورودی' },
  ar: { compose: 'إنشاء', inbox: 'البريد الوارد' },
  he: { compose: 'כתיבה', inbox: 'דואר נכנס' },
};

export default function FabRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div
      dir={dir}
      lang={lang}
      className="relative overflow-hidden rounded-corner-large bg-surface block-64 inline-full max-inline-90"
    >
      <p className="p-4 type-title-medium">{t.inbox}</p>
      <Fab aria-label={t.compose} className="absolute inset-e-4 inset-be-4">
        <EditIcon />
      </Fab>
    </div>
  );
}
