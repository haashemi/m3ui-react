import type * as React from 'react';

import { ArrowBackIcon, SendIcon, ShareIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const translations: Translations<{ back: string; share: string; send: string }> = {
  fa: { back: 'بازگشت', share: 'اشتراک‌گذاری', send: 'ارسال' },
  ar: { back: 'رجوع', share: 'مشاركة', send: 'إرسال' },
  he: { back: 'חזרה', share: 'שיתוף', send: 'שליחה' },
};

export default function IconButtonRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex items-center gap-4">
      <IconButton aria-label={t.back}>
        <ArrowBackIcon className="rtl:-scale-x-100" />
      </IconButton>
      <IconButton variant="tonal" aria-label={t.share}>
        <ShareIcon />
      </IconButton>
      <IconButton variant="filled" width="wide" aria-label={t.send}>
        <SendIcon className="rtl:-scale-x-100" />
      </IconButton>
    </div>
  );
}
