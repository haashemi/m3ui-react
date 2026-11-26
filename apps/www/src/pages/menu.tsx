import * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import {
  ContentCopyIcon,
  ContentCutIcon,
  ContentPasteIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  HelpIcon,
  LinkIcon,
  LogoutIcon,
  MoreVertIcon,
  PersonIcon,
  PrintIcon,
  SettingsIcon,
  ShareIcon,
  VisibilityIcon,
} from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { IconButton } from '@/registry/m3ui/ui/icon-button';
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from '@/registry/m3ui/ui/menu';

const variants = ['standard', 'vibrant'] as const;

function EditItems(): React.JSX.Element {
  return (
    <>
      <MenuItem value="cut" icon={<ContentCutIcon />} shortcut="mod+x">
        Cut
      </MenuItem>
      <MenuItem value="copy" icon={<ContentCopyIcon />} shortcut="mod+c">
        Copy
      </MenuItem>
      <MenuItem value="paste" icon={<ContentPasteIcon />} shortcut="mod+v" disabled>
        Paste
      </MenuItem>
    </>
  );
}

function GroupedMenu({ variant }: { variant: (typeof variants)[number] }): React.JSX.Element {
  return (
    <Menu>
      <MenuTrigger render={<Button variant={variant === 'vibrant' ? 'tonal' : 'outlined'} />}>
        {variant === 'vibrant' ? 'Vibrant' : 'Standard'}
      </MenuTrigger>
      <MenuContent variant={variant}>
        <MenuGroup>
          <MenuItem value="preview" icon={<VisibilityIcon />}>
            Preview
          </MenuItem>
          <MenuItem value="share" icon={<ShareIcon />}>
            Share
          </MenuItem>
          <MenuItem value="link" icon={<LinkIcon />}>
            Get link
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuGroupLabel>Edit</MenuGroupLabel>
          <EditItems />
        </MenuGroup>
        <MenuGroup>
          <MenuItem value="download" icon={<DownloadIcon />}>
            Download
          </MenuItem>
          <MenuItem value="print" icon={<PrintIcon />}>
            Print
          </MenuItem>
          <MenuItem value="delete" icon={<DeleteIcon />}>
            Move to trash
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}

function SelectionMenu(): React.JSX.Element {
  const [density, setDensity] = React.useState<string | null>('comfortable');
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outlined" />}>View options</MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuGroupLabel>Show</MenuGroupLabel>
          <MenuCheckboxItem value="toolbar" defaultChecked>
            Toolbar
          </MenuCheckboxItem>
          <MenuCheckboxItem value="sidebar">Sidebar</MenuCheckboxItem>
          <MenuCheckboxItem value="status-bar" defaultChecked disabled>
            Status bar
          </MenuCheckboxItem>
        </MenuGroup>
        <MenuGroup>
          <MenuGroupLabel>Density</MenuGroupLabel>
          <MenuRadioGroup value={density} onValueChange={setDensity}>
            <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
            <MenuRadioItem value="cozy">Cozy</MenuRadioItem>
            <MenuRadioItem value="compact">Compact</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}

function BasicSection(): React.JSX.Element {
  return (
    <Section
      title="Basic"
      description="Any button can open a menu through MenuTrigger's render prop. Items take a leading icon, a shortcut or trailing text, and a trailing icon."
    >
      <Preview
        code={`<Menu onAction={(value) => run(value)}>
  <MenuTrigger render={<IconButton aria-label="More options" />}>
<MoreVertIcon />
  </MenuTrigger>
  <MenuContent>
<MenuItem value="cut" icon={<ContentCutIcon />} shortcut="mod+x">Cut</MenuItem>
<MenuItem value="copy" icon={<ContentCopyIcon />} shortcut="mod+c">Copy</MenuItem>
<MenuItem value="paste" icon={<ContentPasteIcon />} shortcut="mod+v" disabled>
  Paste
</MenuItem>
  </MenuContent>
</Menu>`}
      >
        <Menu>
          <MenuTrigger render={<IconButton aria-label="More options" />}>
            <MoreVertIcon />
          </MenuTrigger>
          <MenuContent>
            <EditItems />
          </MenuContent>
        </Menu>
        <Menu>
          <MenuTrigger render={<Button variant="tonal" />}>Plain items</MenuTrigger>
          <MenuContent>
            <MenuItem value="rename">Rename</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuItem value="archive">Archive</MenuItem>
            <MenuSeparator />
            <MenuItem value="delete">Delete</MenuItem>
          </MenuContent>
        </Menu>
      </Preview>
    </Section>
  );
}

function GroupsSection(): React.JSX.Element {
  return (
    <Section
      title="Groups and colors"
      description="Each MenuGroup is its own surface, 2px from the next. MenuGroupLabel names a section. The vibrant variant uses tertiary colors for menus that need more emphasis."
    >
      <Preview
        code={`<MenuContent variant="vibrant">
  <MenuGroup>
<MenuItem value="preview" icon={<VisibilityIcon />}>Preview</MenuItem>
…
  </MenuGroup>
  <MenuGroup>
<MenuGroupLabel>Edit</MenuGroupLabel>
…
  </MenuGroup>
</MenuContent>`}
      >
        {variants.map((variant) => (
          <GroupedMenu key={variant} variant={variant} />
        ))}
      </Preview>
    </Section>
  );
}

function SelectionSection(): React.JSX.Element {
  return (
    <Section
      title="Selection"
      description="Checkbox and radio items stay open when chosen. Selected items fill with tertiary container and show a check unless they have their own icon."
    >
      <Preview
        code={`<MenuCheckboxItem value="toolbar" defaultChecked>Toolbar</MenuCheckboxItem>
<MenuRadioGroup value={density} onValueChange={setDensity}>
  <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
  <MenuRadioItem value="compact">Compact</MenuRadioItem>
</MenuRadioGroup>`}
      >
        <SelectionMenu />
      </Preview>
    </Section>
  );
}

function SubmenuSection(): React.JSX.Element {
  return (
    <Section
      title="Submenus and supporting text"
      description="MenuSubTrigger shows an arrow and keeps a state layer while its submenu is open. Submenus inherit the parent's colors unless you set a variant."
    >
      <Preview
        code={`<MenuSub>
  <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
  <MenuSubContent>…</MenuSubContent>
</MenuSub>`}
      >
        <Menu>
          <MenuTrigger render={<Button variant="filled" />}>Account</MenuTrigger>
          <MenuContent>
            <MenuGroup>
              <MenuItem value="profile" icon={<PersonIcon />} supportingText="ada@example.com">
                Ada Lovelace
              </MenuItem>
              <MenuItem value="edit" icon={<EditIcon />}>
                Edit profile
              </MenuItem>
            </MenuGroup>
            <MenuGroup>
              <MenuSub>
                <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem value="language" trailingText="English">
                    Language
                  </MenuItem>
                  <MenuItem value="region" trailingText="Canada">
                    Region
                  </MenuItem>
                  <MenuCheckboxItem value="notifications" defaultChecked>
                    Notifications
                  </MenuCheckboxItem>
                </MenuSubContent>
              </MenuSub>
              <MenuItem value="help" icon={<HelpIcon />}>
                Help
              </MenuItem>
              <MenuItem value="sign-out" icon={<LogoutIcon />}>
                Sign out
              </MenuItem>
            </MenuGroup>
          </MenuContent>
        </Menu>
      </Preview>
    </Section>
  );
}

export function MenusPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Menus"
        description="Menus show a list of choices on a temporary surface. Expressive menus split their items into groups on separate surfaces, whose corners round out while you work inside them, and come in standard and vibrant colors."
        item="menu"
      />

      <BasicSection />

      <GroupsSection />

      <SelectionSection />

      <SubmenuSection />
    </>
  );
}
