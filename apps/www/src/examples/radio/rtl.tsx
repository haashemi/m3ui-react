import type * as React from 'react';

import { type Translations, useTranslation } from '~/lib/translation';
import { Radio, RadioGroup } from '@/registry/m3ui/ui/radio';

const translations: Translations<{
  label: string;
  standard: string;
  express: string;
  overnight: string;
}> = {
  fa: { label: 'سرعت ارسال', standard: 'عادی', express: 'سریع', overnight: 'یک‌شبه' },
  ar: { label: 'سرعة الشحن', standard: 'عادي', express: 'سريع', overnight: 'خلال ليلة' },
  he: { label: 'מהירות משלוח', standard: 'רגיל', express: 'מהיר', overnight: 'למחרת' },
};

export default function RadioRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang}>
      <RadioGroup aria-label={t.label} defaultValue="standard">
        <label className="flex items-center gap-2 type-body-large">
          <Radio value="standard" />
          {t.standard}
        </label>
        <label className="flex items-center gap-2 type-body-large">
          <Radio value="express" />
          {t.express}
        </label>
        <label className="flex items-center gap-2 type-body-large">
          <Radio value="overnight" />
          {t.overnight}
        </label>
      </RadioGroup>
    </div>
  );
}
