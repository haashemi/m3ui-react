import * as React from 'react';

import { DeleteIcon, LinkIcon, ShareIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/registry/m3ui/ui/bottom-sheet';
import { Button } from '@/registry/m3ui/ui/button';
import { Ripple } from '@/registry/m3ui/ui/ripple';

const translations: Translations<{
  open: string;
  title: string;
  description: string;
  resize: string;
  share: string;
  link: string;
  delete: string;
}> = {
  fa: {
    open: 'گزینه‌های فایل',
    title: 'گزارش.pdf',
    description: 'با ۳ نفر به اشتراک گذاشته شده',
    resize: 'تغییر اندازه',
    share: 'اشتراک‌گذاری',
    link: 'دریافت پیوند',
    delete: 'حذف',
  },
  ar: {
    open: 'خيارات الملف',
    title: 'التقرير.pdf',
    description: 'تمت مشاركته مع ٣ أشخاص',
    resize: 'تغيير الحجم',
    share: 'مشاركة',
    link: 'الحصول على رابط',
    delete: 'حذف',
  },
  he: {
    open: 'אפשרויות קובץ',
    title: 'דוח.pdf',
    description: 'משותף עם 3 אנשים',
    resize: 'שינוי גודל',
    share: 'שיתוף',
    link: 'קבלת קישור',
    delete: 'מחיקה',
  },
};

export default function BottomSheetRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  const [open, setOpen] = React.useState(false);
  const actions = [
    { label: t.share, icon: ShareIcon },
    { label: t.link, icon: LinkIcon },
    { label: t.delete, icon: DeleteIcon },
  ];
  return (
    <div dir={dir} lang={lang}>
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger render={<Button variant="tonal" />}>{t.open}</BottomSheetTrigger>
        <BottomSheetContent dragHandleLabel={t.resize}>
          <BottomSheetTitle>{t.title}</BottomSheetTitle>
          <BottomSheetDescription className="mbe-2">{t.description}</BottomSheetDescription>
          <ul className="flex flex-col pbe-4">
            {actions.map(({ label, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="relative focus-ring flex cursor-pointer items-center gap-4 px-6 text-start type-body-large text-on-surface block-14 inline-full"
                >
                  <Ripple />
                  <Icon className="fill-on-surface-variant block-6 inline-6" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
}
