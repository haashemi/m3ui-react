import type * as React from 'react';

import { ArrowBackIcon, MoreVertIcon, ShareIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const translations: Translations<{
  title: string;
  subtitle: string;
  back: string;
  share: string;
  more: string;
}> = {
  fa: {
    title: 'صندوق ورودی',
    subtitle: '۲۴ پیام',
    back: 'بازگشت',
    share: 'اشتراک‌گذاری',
    more: 'گزینه‌های بیشتر',
  },
  ar: {
    title: 'البريد الوارد',
    subtitle: '٢٤ رسالة',
    back: 'رجوع',
    share: 'مشاركة',
    more: 'خيارات إضافية',
  },
  he: {
    title: 'דואר נכנס',
    subtitle: '24 הודעות',
    back: 'חזרה',
    share: 'שיתוף',
    more: 'אפשרויות נוספות',
  },
};

export default function AppBarRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div
      dir={dir}
      lang={lang}
      className="overflow-hidden rounded-corner-large bg-surface inline-full max-inline-md"
    >
      <AppBar
        size="medium"
        title={t.title}
        subtitle={t.subtitle}
        leading={
          <IconButton aria-label={t.back}>
            <ArrowBackIcon className="rtl:-scale-x-100" />
          </IconButton>
        }
        trailing={
          <>
            <IconButton aria-label={t.share}>
              <ShareIcon />
            </IconButton>
            <IconButton aria-label={t.more}>
              <MoreVertIcon />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
