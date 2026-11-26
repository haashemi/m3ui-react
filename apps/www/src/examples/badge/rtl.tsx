import type * as React from 'react';

import { ChatIcon, NotificationsIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Badge, BadgeAnchor } from '@/registry/m3ui/ui/badge';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const translations: Translations<{
  notifications: string;
  chat: string;
  count: string;
}> = {
  fa: { notifications: 'اعلان‌ها، ۳ مورد جدید', chat: 'گفتگو، پیام جدید', count: '۳' },
  ar: { notifications: 'الإشعارات، ٣ جديدة', chat: 'الدردشة، رسالة جديدة', count: '٣' },
  he: { notifications: 'התראות, 3 חדשות', chat: "צ'אט, הודעה חדשה", count: '3' },
};

export default function BadgeRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <div dir={dir} lang={lang} className="flex items-center gap-4">
      <IconButton aria-label={t.notifications}>
        <BadgeAnchor>
          <NotificationsIcon />
          <Badge>{t.count}</Badge>
        </BadgeAnchor>
      </IconButton>
      <IconButton aria-label={t.chat}>
        <BadgeAnchor>
          <ChatIcon />
          <Badge />
        </BadgeAnchor>
      </IconButton>
    </div>
  );
}
