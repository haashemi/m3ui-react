import type * as React from 'react';

import { type Translations, useTranslation } from '~/lib/translation';
import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';

const translations: Translations<{ label: string; day: string; week: string; month: string }> = {
  fa: { label: 'نما', day: 'روز', week: 'هفته', month: 'ماه' },
  ar: { label: 'العرض', day: 'يوم', week: 'أسبوع', month: 'شهر' },
  he: { label: 'תצוגה', day: 'יום', week: 'שבוע', month: 'חודש' },
};

export default function ConnectedButtonGroupRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang}>
      <ConnectedButtonGroup aria-label={t.label} defaultValue={['day']} deselectable={false}>
        <ConnectedButtonGroupItem value="day">{t.day}</ConnectedButtonGroupItem>
        <ConnectedButtonGroupItem value="week">{t.week}</ConnectedButtonGroupItem>
        <ConnectedButtonGroupItem value="month">{t.month}</ConnectedButtonGroupItem>
      </ConnectedButtonGroup>
    </div>
  );
}
