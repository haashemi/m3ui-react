import type * as React from 'react';

import { type Translations, useTranslation } from '~/lib/translation';
import { Checkbox } from '@/registry/m3ui/ui/checkbox';

const translations: Translations<{ updates: string; digest: string }> = {
  fa: { updates: 'اطلاع‌رسانی به‌روزرسانی‌ها با ایمیل', digest: 'ارسال خلاصه هفتگی' },
  ar: { updates: 'راسلني بشأن التحديثات', digest: 'إرسال ملخص أسبوعي' },
  he: { updates: 'שלחו לי עדכונים במייל', digest: 'שליחת סיכום שבועי' },
};

export default function CheckboxRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex flex-col">
      <label className="flex items-center gap-2 type-body-large">
        <Checkbox defaultChecked />
        {t.updates}
      </label>
      <label className="flex items-center gap-2 type-body-large">
        <Checkbox defaultChecked="indeterminate" />
        {t.digest}
      </label>
    </div>
  );
}
