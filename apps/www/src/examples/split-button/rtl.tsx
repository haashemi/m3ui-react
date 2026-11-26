import type * as React from 'react';

import { SendIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/registry/m3ui/ui/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
} from '@/registry/m3ui/ui/split-button';

const translations: Translations<{
  send: string;
  more: string;
  schedule: string;
  draft: string;
}> = {
  fa: { send: 'ارسال', more: 'گزینه‌های بیشتر', schedule: 'زمان‌بندی ارسال', draft: 'ذخیره پیش‌نویس' },
  ar: { send: 'إرسال', more: 'خيارات إضافية', schedule: 'جدولة الإرسال', draft: 'حفظ المسودة' },
  he: { send: 'שליחה', more: 'אפשרויות נוספות', schedule: 'תזמון שליחה', draft: 'שמירת טיוטה' },
};

export default function SplitButtonRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang}>
      <SplitButton>
        <SplitButtonAction>
          <SendIcon className="rtl:-scale-x-100" />
          {t.send}
        </SplitButtonAction>
        <Menu>
          <MenuTrigger render={<SplitButtonTrigger aria-label={t.more} />} />
          <MenuContent align="end">
            <MenuItem value="schedule">{t.schedule}</MenuItem>
            <MenuItem value="draft">{t.draft}</MenuItem>
          </MenuContent>
        </Menu>
      </SplitButton>
    </div>
  );
}
