import type * as React from 'react';

import { FlightIcon, MoreVertIcon } from '~/icons';
import { type Translations, useTranslation } from '~/lib/translation';
import { Button } from '@/registry/m3ui/ui/button';
import {
  Card,
  CardAction,
  CardAvatar,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/m3ui/ui/card';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const translations: Translations<{
  title: string;
  dates: string;
  body: string;
  options: string;
  details: string;
  book: string;
}> = {
  fa: {
    title: 'اصفهان',
    dates: '۱۴ تا ۱۸ فروردین',
    body: 'چهار روز میان کاشی‌های آبی، پل‌های تاریخی و میدان نقش جهان.',
    options: 'گزینه‌های سفر',
    details: 'جزئیات',
    book: 'رزرو',
  },
  ar: {
    title: 'مراكش',
    dates: '٤ – ٩ مارس',
    body: 'ثلاثة أيام بين الأسواق القديمة والحدائق وساحة جامع الفنا.',
    options: 'خيارات الرحلة',
    details: 'التفاصيل',
    book: 'احجز',
  },
  he: {
    title: 'חיפה',
    dates: '4–9 במרץ',
    body: 'שלושה ימים בין הגנים, הנמל והטיילת על הכרמל.',
    options: 'אפשרויות טיול',
    details: 'פרטים',
    book: 'הזמנה',
  },
};

export default function CardRtl(): React.JSX.Element {
  const { dir, lang, t } = useTranslation(translations);
  return (
    <Card dir={dir} lang={lang} variant="filled" className="inline-full max-inline-80">
      <CardHeader>
        <CardAvatar>
          <FlightIcon className="fill-current block-6 inline-6 rtl:-scale-x-100" />
        </CardAvatar>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.dates}</CardDescription>
        <CardAction>
          <IconButton aria-label={t.options}>
            <MoreVertIcon />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{t.body}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outlined">{t.details}</Button>
        <Button>{t.book}</Button>
      </CardFooter>
    </Card>
  );
}
