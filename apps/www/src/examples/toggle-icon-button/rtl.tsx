import type * as React from 'react';

import { FormatAlignLeftIcon, FormatAlignRightIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

const translations: Translations<{ alignStart: string; alignEnd: string }> = {
  fa: { alignStart: 'تراز به ابتدا', alignEnd: 'تراز به انتها' },
  ar: { alignStart: 'محاذاة إلى البداية', alignEnd: 'محاذاة إلى النهاية' },
  he: { alignStart: 'יישור להתחלה', alignEnd: 'יישור לסוף' },
};

export default function ToggleIconButtonRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex items-center gap-2">
      <ToggleIconButton variant="tonal" defaultPressed aria-label={t.alignStart}>
        <FormatAlignRightIcon />
      </ToggleIconButton>
      <ToggleIconButton variant="tonal" aria-label={t.alignEnd}>
        <FormatAlignLeftIcon />
      </ToggleIconButton>
    </div>
  );
}
