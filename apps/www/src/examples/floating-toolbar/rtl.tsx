import type * as React from 'react';

import { AttachFileIcon, EditIcon, ImageIcon, MicIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import {
  FloatingToolbar,
  FloatingToolbarLayout,
  ToolbarFab,
} from '@/registry/m3ui/ui/floating-toolbar';
import { ToolbarIconButton } from '@/registry/m3ui/ui/toolbar';

const translations: Translations<{
  label: string;
  attach: string;
  image: string;
  dictate: string;
  compose: string;
}> = {
  fa: {
    label: 'نوشتن',
    attach: 'پیوست',
    image: 'افزودن تصویر',
    dictate: 'دیکته',
    compose: 'نوشتن',
  },
  ar: { label: 'إنشاء', attach: 'إرفاق', image: 'إدراج صورة', dictate: 'إملاء', compose: 'إنشاء' },
  he: { label: 'כתיבה', attach: 'צירוף', image: 'הוספת תמונה', dictate: 'הכתבה', compose: 'כתיבה' },
};

export default function FloatingToolbarRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang}>
      <FloatingToolbarLayout>
        <FloatingToolbar aria-label={t.label}>
          <ToolbarIconButton aria-label={t.attach}>
            <AttachFileIcon />
          </ToolbarIconButton>
          <ToolbarIconButton aria-label={t.image}>
            <ImageIcon />
          </ToolbarIconButton>
          <ToolbarIconButton aria-label={t.dictate}>
            <MicIcon />
          </ToolbarIconButton>
        </FloatingToolbar>
        <ToolbarFab aria-label={t.compose}>
          <EditIcon />
        </ToolbarFab>
      </FloatingToolbarLayout>
    </div>
  );
}
