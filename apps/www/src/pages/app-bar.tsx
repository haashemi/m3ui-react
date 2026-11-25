import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import {
  AccountCircleIcon,
  ArrowBackIcon,
  AttachFileIcon,
  EditIcon,
  MenuIcon,
  MicIcon,
  MoreVertIcon,
  NotificationsIcon,
  PaletteIcon,
  SearchIcon,
  ShareIcon,
} from '~/icons';
import { AppBar, AppBarSearch, type AppBarScrollBehavior } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const items = Array.from({ length: 24 }, (_, index) => `Message ${index + 1}`);

function Back(): React.JSX.Element {
  return (
    <IconButton aria-label="Back">
      <ArrowBackIcon />
    </IconButton>
  );
}

function Actions(): React.JSX.Element {
  return (
    <>
      <IconButton aria-label="Attach">
        <AttachFileIcon />
      </IconButton>
      <IconButton aria-label="More options">
        <MoreVertIcon />
      </IconButton>
    </>
  );
}

function Frame({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-corner-large bg-surface inline-full max-inline-md">
      {children}
    </div>
  );
}

function ScrollFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <figure className="flex flex-col gap-2 inline-full max-inline-80">
      <section
        aria-label={label}
        className="overflow-y-auto rounded-corner-large bg-surface block-120"
      >
        {children}
        <ul className="flex flex-col gap-2 px-4 py-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-corner-medium bg-surface-container-low px-4 py-3 type-body-large"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
      <figcaption className="type-label-large text-on-surface-variant">{label}</figcaption>
    </figure>
  );
}

function ScrollDemo({
  behavior,
  size,
  label,
}: {
  behavior: AppBarScrollBehavior;
  size: 'small' | 'large';
  label: string;
}): React.JSX.Element {
  return (
    <ScrollFrame label={label}>
      <AppBar
        size={size}
        scrollBehavior={behavior}
        title="Inbox"
        subtitle={size === 'large' ? '24 messages' : undefined}
        leading={
          <IconButton aria-label="Menu">
            <MenuIcon />
          </IconButton>
        }
        trailing={
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
        }
      />
    </ScrollFrame>
  );
}

function SmallSection(): React.JSX.Element {
  return (
    <Section
      title="Small"
      description="Small app bars are 64dp tall. The title starts after the leading button, or is centered across the whole bar. A subtitle stacks under the title."
    >
      <Preview
        className="flex-col"
        code={`<AppBar title="Title" leading={<IconButton aria-label="Back"><ArrowBackIcon /></IconButton>} trailing={…} />

<AppBar align="center" title="Title" leading={…} trailing={…} />

<AppBar title="Title" subtitle="Subtitle" leading={…} trailing={…} />`}
      >
        <Frame>
          <AppBar title="Title" leading={<Back />} trailing={<Actions />} />
        </Frame>
        <Frame>
          <AppBar
            align="center"
            title="Title"
            leading={
              <IconButton aria-label="Menu">
                <MenuIcon />
              </IconButton>
            }
            trailing={
              <IconButton aria-label="Account">
                <AccountCircleIcon />
              </IconButton>
            }
          />
        </Frame>
        <Frame>
          <AppBar title="Title" subtitle="Subtitle" leading={<Back />} trailing={<Actions />} />
        </Frame>
        <Frame>
          <AppBar
            align="center"
            title="Title"
            subtitle="Subtitle"
            leading={<Back />}
            trailing={
              <IconButton variant="filled" width="wide" aria-label="Edit">
                <EditIcon />
              </IconButton>
            }
          />
        </Frame>
      </Preview>
    </Section>
  );
}

function SearchSection(): React.JSX.Element {
  return (
    <Section
      title="Search"
      description="A search app bar holds a search bar that opens your search view. Actions can sit inside or outside it. On scroll, both the bar and the search container darken."
    >
      <Preview
        className="flex-col"
        code={`<AppBar
  leading={<IconButton aria-label="Menu"><MenuIcon /></IconButton>}
  trailing={<IconButton aria-label="Account"><AccountCircleIcon /></IconButton>}
>
  <AppBarSearch onClick={openSearch}>Search messages</AppBarSearch>
</AppBar>

<AppBar align="center" scrolled leading={…}>
  <AppBarSearch trailing={<IconButton aria-label="Voice search"><MicIcon /></IconButton>}>
    Search messages
  </AppBarSearch>
</AppBar>`}
      >
        <Frame>
          <AppBar
            leading={
              <IconButton aria-label="Menu">
                <MenuIcon />
              </IconButton>
            }
            trailing={
              <IconButton aria-label="Account">
                <AccountCircleIcon />
              </IconButton>
            }
          >
            <AppBarSearch>Search messages</AppBarSearch>
          </AppBar>
        </Frame>
        <Frame>
          <AppBar
            align="center"
            scrolled
            leading={
              <IconButton aria-label="Menu">
                <MenuIcon />
              </IconButton>
            }
            trailing={
              <IconButton aria-label="Notifications">
                <NotificationsIcon />
              </IconButton>
            }
          >
            <AppBarSearch
              trailing={
                <IconButton aria-label="Voice search">
                  <MicIcon />
                </IconButton>
              }
            >
              Search messages
            </AppBarSearch>
          </AppBar>
        </Frame>
      </Preview>
    </Section>
  );
}

function FlexibleSection(): React.JSX.Element {
  return (
    <Section
      title="Medium and large flexible"
      description="Flexible app bars put the title on its own row, wrap long titles and grow to fit a subtitle: 112 or 136dp for medium, 120 or 152dp for large."
    >
      <Preview
        className="flex-col"
        code={`<AppBar size="medium" title="Title" leading={…} trailing={…} />
<AppBar size="medium" title="Title" subtitle="Subtitle" leading={…} trailing={…} />
<AppBar size="large" title="Title" leading={…} trailing={…} />
<AppBar size="large" align="center" title="Title" subtitle="Subtitle" leading={…} trailing={…} />`}
      >
        <Frame>
          <AppBar size="medium" title="Title" leading={<Back />} trailing={<Actions />} />
        </Frame>
        <Frame>
          <AppBar
            size="medium"
            title="Title"
            subtitle="Subtitle"
            leading={<Back />}
            trailing={<Actions />}
          />
        </Frame>
        <Frame>
          <AppBar size="large" title="Title" leading={<Back />} trailing={<Actions />} />
        </Frame>
        <Frame>
          <AppBar
            size="large"
            align="center"
            title="Title"
            subtitle="Subtitle"
            leading={<Back />}
            trailing={<Actions />}
          />
        </Frame>
        <Frame>
          <AppBar
            size="medium"
            title="A longer title wraps onto a second line"
            leading={<Back />}
            trailing={<Actions />}
          />
        </Frame>
      </Preview>
    </Section>
  );
}

export function AppBarPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="App bars"
        description="App bars sit at the top of the screen with the page title, navigation and one or two key actions. They come in small, medium flexible and large flexible sizes, plus a search app bar, and fill with the surface container color when content scrolls under them."
        item="app-bar"
      />

      <SmallSection />
      <SearchSection />

      <Section
        title="Custom content"
        description="Children replace the title, for example an image or a logo on small app bars."
      >
        <Preview
          code={`<AppBar leading={…} trailing={…}>
  <span className="flex items-center gap-2 type-title-large-emphasized text-primary">
    <PaletteIcon className="fill-current block-6 inline-6" /> Palette
  </span>
</AppBar>`}
        >
          <Frame>
            <AppBar
              leading={<Back />}
              trailing={
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>
              }
            >
              <span className="flex items-center gap-2 type-title-large-emphasized text-primary">
                <PaletteIcon className="fill-current block-6 inline-6" />
                Palette
              </span>
            </AppBar>
          </Frame>
        </Preview>
      </Section>

      <FlexibleSection />

      <Section
        title="Scrolling"
        description="App bars are sticky and follow their nearest scroll container (or the window). Small bars lift on scroll. Flexible bars collapse into a small bar, fading the title from one row to the other and snapping open or closed when scrolling stops. With enter-always, the bar hides on scroll down and returns on scroll up."
      >
        <Preview
          className="items-start"
          code={`<div className="overflow-y-auto">
  <AppBar size="large" title="Inbox" subtitle="24 messages" leading={…} trailing={…} />
  …
</div>

<AppBar title="Inbox" scrollBehavior="enter-always" />

<AppBar title="Inbox" scrolled /> {/* force the on-scroll color */}`}
        >
          <ScrollDemo size="large" behavior="exit-until-collapsed" label="Collapse on scroll" />
          <ScrollDemo size="small" behavior="pinned" label="Lift on scroll" />
          <ScrollDemo size="small" behavior="enter-always" label="Hide on scroll" />
        </Preview>
      </Section>
    </>
  );
}
