import type * as React from 'react';

import { type Translations, useTranslation } from '~/lib/translation';
import { Switch } from '@/registry/m3ui/ui/switch';

const translations: Translations<{ wifi: string; bluetooth: string }> = {
  fa: { wifi: 'وای‌فای', bluetooth: 'بلوتوث' },
  ar: { wifi: 'واي فاي', bluetooth: 'بلوتوث' },
  he: { wifi: 'Wi-Fi', bluetooth: 'בלוטות׳' },
};

export default function SwitchRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex flex-col gap-2 inline-60">
      <label className="flex items-center justify-between gap-4 type-body-large">
        {t.wifi}
        <Switch defaultChecked icons="checked" />
      </label>
      <label className="flex items-center justify-between gap-4 type-body-large">
        {t.bluetooth}
        <Switch icons="checked" />
      </label>
    </div>
  );
}
