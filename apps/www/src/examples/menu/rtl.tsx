import type * as React from 'react';

import { ContentCopyIcon, ContentCutIcon, SettingsIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Button } from '@/registry/m3ui/ui/button';
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from '@/registry/m3ui/ui/menu';

const translations: Translations<{
  open: string;
  cut: string;
  copy: string;
  settings: string;
  language: string;
  languageName: string;
  theme: string;
}> = {
  fa: {
    open: 'ویرایش',
    cut: 'برش',
    copy: 'کپی',
    settings: 'تنظیمات',
    language: 'زبان',
    languageName: 'فارسی',
    theme: 'پوسته',
  },
  ar: {
    open: 'تعديل',
    cut: 'قص',
    copy: 'نسخ',
    settings: 'الإعدادات',
    language: 'اللغة',
    languageName: 'العربية',
    theme: 'المظهر',
  },
  he: {
    open: 'עריכה',
    cut: 'גזירה',
    copy: 'העתקה',
    settings: 'הגדרות',
    language: 'שפה',
    languageName: 'עברית',
    theme: 'ערכת נושא',
  },
};

export default function MenuRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang}>
      <Menu>
        <MenuTrigger render={<Button variant="tonal" />}>{t.open}</MenuTrigger>
        <MenuContent>
          <MenuGroup>
            <MenuItem value="cut" icon={<ContentCutIcon />} shortcut="mod+x">
              {t.cut}
            </MenuItem>
            <MenuItem value="copy" icon={<ContentCopyIcon />} shortcut="mod+c">
              {t.copy}
            </MenuItem>
          </MenuGroup>
          <MenuGroup>
            <MenuSub>
              <MenuSubTrigger icon={<SettingsIcon />}>{t.settings}</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem value="language" trailingText={t.languageName}>
                  {t.language}
                </MenuItem>
                <MenuItem value="theme">{t.theme}</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuGroup>
        </MenuContent>
      </Menu>
    </div>
  );
}
