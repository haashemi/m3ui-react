import type * as React from 'react';

import { ArrowDropDownIcon } from '~/icons';
import { type Language, languages } from '~/lib/translation';
import { Button } from '@/registry/m3ui/ui/button';
import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from '@/registry/m3ui/ui/menu';

export function LanguageSelector({
  value,
  onValueChange,
}: {
  value: Language;
  onValueChange: (value: Language) => void;
}): React.JSX.Element {
  const current = languages.find((language) => language.code === value) ?? languages[0];
  return (
    <Menu>
      <MenuTrigger render={<Button variant="text" size="xs" />}>
        {current.label}
        <ArrowDropDownIcon />
      </MenuTrigger>
      <MenuContent>
        <MenuRadioGroup<Language> value={value} onValueChange={onValueChange}>
          {languages.map((language) => (
            <MenuRadioItem key={language.code} value={language.code} closeOnSelect>
              {language.label}
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
