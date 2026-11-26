import type * as React from 'react';

import { ArchiveIcon, ArrowBackIcon, DeleteIcon, MailIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { DockedToolbar } from '@/registry/m3ui/ui/docked-toolbar';
import { ToolbarButton, ToolbarIconButton } from '@/registry/m3ui/ui/toolbar';

const translations: Translations<{
  label: string;
  back: string;
  archive: string;
  delete: string;
  reply: string;
  send: string;
}> = {
  fa: {
    label: 'پیام',
    back: 'بازگشت',
    archive: 'بایگانی',
    delete: 'حذف',
    reply: 'پاسخ',
    send: 'ارسال',
  },
  ar: {
    label: 'رسالة',
    back: 'رجوع',
    archive: 'أرشفة',
    delete: 'حذف',
    reply: 'رد',
    send: 'إرسال',
  },
  he: {
    label: 'הודעה',
    back: 'חזרה',
    archive: 'העברה לארכיון',
    delete: 'מחיקה',
    reply: 'תשובה',
    send: 'שליחה',
  },
};

export default function DockedToolbarRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="inline-full">
      <DockedToolbar aria-label={t.label}>
        <ToolbarIconButton aria-label={t.back}>
          <ArrowBackIcon className="rtl:-scale-x-100" />
        </ToolbarIconButton>
        <ToolbarIconButton aria-label={t.archive}>
          <ArchiveIcon />
        </ToolbarIconButton>
        <ToolbarIconButton aria-label={t.delete}>
          <DeleteIcon />
        </ToolbarIconButton>
        <ToolbarButton>{t.reply}</ToolbarButton>
        <ToolbarIconButton variant="filled" aria-label={t.send}>
          <MailIcon />
        </ToolbarIconButton>
      </DockedToolbar>
    </div>
  );
}
