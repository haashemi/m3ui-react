import type * as React from 'react';

import { type Translations, useTranslation } from '~/lib/translation';
import { EditIcon, SendIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';

const translations: Translations<{ send: string; edit: string; cancel: string }> = {
  fa: { send: 'ارسال', edit: 'ویرایش', cancel: 'لغو' },
  ar: { send: 'إرسال', edit: 'تعديل', cancel: 'إلغاء' },
  he: { send: 'שליחה', edit: 'עריכה', cancel: 'ביטול' },
};

export default function ButtonRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex flex-wrap items-center justify-center gap-4">
      <Button variant="outlined">{t.cancel}</Button>
      <Button variant="tonal">
        <EditIcon />
        {t.edit}
      </Button>
      <Button>
        {t.send}
        <SendIcon className="rtl:-scale-x-100" />
      </Button>
    </div>
  );
}
