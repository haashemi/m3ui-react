import type * as React from 'react';

import { MovieIcon, MusicNoteIcon, PhotoLibraryIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/m3ui/ui/tabs';

const translations: Translations<{
  label: string;
  video: string;
  photos: string;
  audio: string;
  videoText: string;
  photosText: string;
  audioText: string;
}> = {
  fa: {
    label: 'رسانه',
    video: 'ویدیو',
    photos: 'عکس‌ها',
    audio: 'صدا',
    videoText: '۲۴ ویدیو، ۳ مورد این هفته اضافه شده.',
    photosText: '۱٬۲۰۴ عکس در ۱۸ آلبوم.',
    audioText: '۳۱۲ آهنگ و ۸ پادکست.',
  },
  ar: {
    label: 'الوسائط',
    video: 'فيديو',
    photos: 'صور',
    audio: 'صوت',
    videoText: '٢٤ فيديو، أُضيف ٣ منها هذا الأسبوع.',
    photosText: '١٬٢٠٤ صورة في ١٨ ألبومًا.',
    audioText: '٣١٢ أغنية و٨ بودكاست.',
  },
  he: {
    label: 'מדיה',
    video: 'וידאו',
    photos: 'תמונות',
    audio: 'אודיו',
    videoText: '24 סרטונים, 3 נוספו השבוע.',
    photosText: '1,204 תמונות ב-18 אלבומים.',
    audioText: '312 שירים ו-8 פודקאסטים.',
  },
};

export default function TabsRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <Tabs defaultValue="video" dir={dir} lang={lang}>
      <TabsList aria-label={t.label}>
        <TabsTab value="video" icon={<MovieIcon />}>
          {t.video}
        </TabsTab>
        <TabsTab value="photos" icon={<PhotoLibraryIcon />}>
          {t.photos}
        </TabsTab>
        <TabsTab value="audio" icon={<MusicNoteIcon />}>
          {t.audio}
        </TabsTab>
      </TabsList>
      <TabsPanel value="video">
        <p className="p-6 type-body-large text-on-surface-variant">{t.videoText}</p>
      </TabsPanel>
      <TabsPanel value="photos">
        <p className="p-6 type-body-large text-on-surface-variant">{t.photosText}</p>
      </TabsPanel>
      <TabsPanel value="audio">
        <p className="p-6 type-body-large text-on-surface-variant">{t.audioText}</p>
      </TabsPanel>
    </Tabs>
  );
}
