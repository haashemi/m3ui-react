import type * as React from 'react';

import { CloseIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Button } from '@/registry/m3ui/ui/button';
import { Checkbox } from '@/registry/m3ui/ui/checkbox';
import {
  SideSheet,
  SideSheetActions,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
} from '@/registry/m3ui/ui/side-sheet';

const translations: Translations<{
  open: string;
  title: string;
  close: string;
  save: string;
  cancel: string;
  filters: string[];
}> = {
  fa: {
    open: 'نمایش فیلترها',
    title: 'فیلترها',
    close: 'بستن',
    save: 'ذخیره',
    cancel: 'لغو',
    filters: ['خوانده‌نشده', 'ستاره‌دار', 'دارای پیوست'],
  },
  ar: {
    open: 'عرض عوامل التصفية',
    title: 'عوامل التصفية',
    close: 'إغلاق',
    save: 'حفظ',
    cancel: 'إلغاء',
    filters: ['غير مقروءة', 'مميزة بنجمة', 'بها مرفقات'],
  },
  he: {
    open: 'הצגת מסננים',
    title: 'מסננים',
    close: 'סגירה',
    save: 'שמירה',
    cancel: 'ביטול',
    filters: ['לא נקראו', 'מסומנות בכוכב', 'עם קבצים מצורפים'],
  },
};

export default function SideSheetRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang}>
      <SideSheet>
        <SideSheetTrigger render={<Button variant="tonal" />}>{t.open}</SideSheetTrigger>
        <SideSheetContent>
          <SideSheetHeader>
            <SideSheetTitle>{t.title}</SideSheetTitle>
            <SideSheetClose aria-label={t.close}>
              <CloseIcon />
            </SideSheetClose>
          </SideSheetHeader>
          <SideSheetBody>
            <ul className="flex flex-col">
              {t.filters.map((filter) => (
                <li key={filter}>
                  <label className="flex items-center gap-2 py-1 type-body-large">
                    <Checkbox />
                    {filter}
                  </label>
                </li>
              ))}
            </ul>
          </SideSheetBody>
          <SideSheetActions>
            <SideSheetClose render={<Button />}>{t.save}</SideSheetClose>
            <SideSheetClose render={<Button variant="outlined" />}>{t.cancel}</SideSheetClose>
          </SideSheetActions>
        </SideSheetContent>
      </SideSheet>
    </div>
  );
}
