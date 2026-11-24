import * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import {
  AddIcon,
  ArchiveIcon,
  AttachFileIcon,
  DeleteIcon,
  DrawIcon,
  EditIcon,
  FormatAlignCenterIcon,
  FormatAlignLeftIcon,
  FormatAlignRightIcon,
  FormatBoldIcon,
  FormatItalicIcon,
  FormatUnderlinedIcon,
  ImageIcon,
  MailIcon,
  MicIcon,
  MoreVertIcon,
  PhotoCameraIcon,
  RedoIcon,
  TextFieldsIcon,
  UndoIcon,
} from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import {
  DockedToolbar,
  FloatingToolbar,
  FloatingToolbarLayout,
  ToolbarButton,
  ToolbarFab,
  ToolbarIconButton,
  ToolbarToggleGroup,
  ToolbarToggleIconButton,
} from '@/registry/m3ui/ui/toolbar';

function FormattingItems(): React.JSX.Element {
  return (
    <>
      <ToolbarToggleIconButton aria-label="Bold" defaultPressed>
        <FormatBoldIcon />
      </ToolbarToggleIconButton>
      <ToolbarToggleIconButton aria-label="Italic">
        <FormatItalicIcon />
      </ToolbarToggleIconButton>
      <ToolbarToggleIconButton aria-label="Underline">
        <FormatUnderlinedIcon />
      </ToolbarToggleIconButton>
      <ToolbarIconButton aria-label="Undo">
        <UndoIcon />
      </ToolbarIconButton>
      <ToolbarIconButton aria-label="Redo" disabled>
        <RedoIcon />
      </ToolbarIconButton>
    </>
  );
}

function FabToolbar(): React.JSX.Element {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div className="flex flex-col items-center gap-6">
      <FloatingToolbarLayout>
        <FloatingToolbar variant="vibrant" expanded={expanded} aria-label="Compose">
          <ToolbarIconButton aria-label="Attach">
            <AttachFileIcon />
          </ToolbarIconButton>
          <ToolbarIconButton aria-label="Insert image">
            <ImageIcon />
          </ToolbarIconButton>
          <ToolbarIconButton aria-label="Camera">
            <PhotoCameraIcon />
          </ToolbarIconButton>
          <ToolbarIconButton aria-label="Dictate">
            <MicIcon />
          </ToolbarIconButton>
        </FloatingToolbar>
        <ToolbarFab
          variant="vibrant"
          aria-label={expanded ? 'Collapse toolbar' : 'Expand toolbar'}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? <EditIcon /> : <AddIcon />}
        </ToolbarFab>
      </FloatingToolbarLayout>
      <Button variant="outlined" onClick={() => setExpanded((value) => !value)}>
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
    </div>
  );
}

function VerticalSection(): React.JSX.Element {
  return (
    <Section
      title="Vertical"
      description="Vertical floating toolbars move with Up and Down. Toggle groups join the toolbar's navigation."
    >
      <Preview
        code={`<FloatingToolbarLayout orientation="vertical">
<FloatingToolbar aria-label="Tools">
  <ToolbarToggleGroup aria-label="Tool" defaultValue={['draw']} deselectable={false}>
    <ToolbarToggleIconButton value="draw" aria-label="Draw"><DrawIcon /></ToolbarToggleIconButton>
    <ToolbarToggleIconButton value="text" aria-label="Text"><TextFieldsIcon /></ToolbarToggleIconButton>
  </ToolbarToggleGroup>
</FloatingToolbar>
<ToolbarFab aria-label="Add"><AddIcon /></ToolbarFab>
</FloatingToolbarLayout>`}
      >
        <FloatingToolbarLayout orientation="vertical">
          <FloatingToolbar aria-label="Tools">
            <ToolbarToggleGroup aria-label="Tool" defaultValue={['draw']} deselectable={false}>
              <ToolbarToggleIconButton value="draw" aria-label="Draw">
                <DrawIcon />
              </ToolbarToggleIconButton>
              <ToolbarToggleIconButton value="text" aria-label="Text">
                <TextFieldsIcon />
              </ToolbarToggleIconButton>
              <ToolbarToggleIconButton value="image" aria-label="Image">
                <ImageIcon />
              </ToolbarToggleIconButton>
            </ToolbarToggleGroup>
            <ToolbarIconButton aria-label="Delete">
              <DeleteIcon />
            </ToolbarIconButton>
          </FloatingToolbar>
          <ToolbarFab aria-label="Add">
            <AddIcon />
          </ToolbarFab>
        </FloatingToolbarLayout>
        <FloatingToolbar orientation="vertical" variant="vibrant" aria-label="Alignment">
          <ToolbarToggleGroup aria-label="Align" defaultValue={['left']} deselectable={false}>
            <ToolbarToggleIconButton value="left" aria-label="Align left">
              <FormatAlignLeftIcon />
            </ToolbarToggleIconButton>
            <ToolbarToggleIconButton value="center" aria-label="Align center">
              <FormatAlignCenterIcon />
            </ToolbarToggleIconButton>
            <ToolbarToggleIconButton value="right" aria-label="Align right">
              <FormatAlignRightIcon />
            </ToolbarToggleIconButton>
          </ToolbarToggleGroup>
        </FloatingToolbar>
      </Preview>
    </Section>
  );
}

function DockedSection(): React.JSX.Element {
  return (
    <Section
      title="Docked"
      description="Docked toolbars span the full width of the window. Items spread out by default, or gather in the center 32px apart on larger windows."
    >
      <Preview
        className="flex-col items-stretch"
        code={`<DockedToolbar aria-label="Message">
<ToolbarIconButton aria-label="Archive"><ArchiveIcon /></ToolbarIconButton>
<ToolbarIconButton aria-label="Delete"><DeleteIcon /></ToolbarIconButton>
<ToolbarButton>Reply</ToolbarButton>
<ToolbarIconButton variant="filled" aria-label="Send"><MailIcon /></ToolbarIconButton>
</DockedToolbar>

<DockedToolbar variant="vibrant" arrangement="center" aria-label="Message">…</DockedToolbar>`}
      >
        <DockedToolbar aria-label="Message">
          <ToolbarIconButton aria-label="Archive">
            <ArchiveIcon />
          </ToolbarIconButton>
          <ToolbarIconButton aria-label="Delete">
            <DeleteIcon />
          </ToolbarIconButton>
          <ToolbarButton>Reply</ToolbarButton>
          <ToolbarIconButton aria-label="More">
            <MoreVertIcon />
          </ToolbarIconButton>
          <ToolbarIconButton variant="filled" aria-label="Send">
            <MailIcon />
          </ToolbarIconButton>
        </DockedToolbar>
        <DockedToolbar variant="vibrant" arrangement="center" aria-label="Message (vibrant)">
          <ToolbarIconButton aria-label="Archive">
            <ArchiveIcon />
          </ToolbarIconButton>
          <ToolbarIconButton aria-label="Delete">
            <DeleteIcon />
          </ToolbarIconButton>
          <ToolbarToggleIconButton aria-label="Mark as important">
            <EditIcon />
          </ToolbarToggleIconButton>
          <ToolbarIconButton variant="tonal" aria-label="Send">
            <MailIcon />
          </ToolbarIconButton>
        </DockedToolbar>
      </Preview>
    </Section>
  );
}

export function ToolbarPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Toolbar"
        description="Toolbars show frequently used actions relevant to the current page. Docked toolbars span the window; floating toolbars sit above content, can be horizontal or vertical, pair with a FAB and collapse into it."
        item="toolbar"
      />

      <Section
        title="Floating"
        description="Tab enters the toolbar once; the arrow keys move between its items. Standard toolbars use the surface container, vibrant toolbars the primary container."
      >
        <Preview
          className="flex-col"
          code={`<FloatingToolbar aria-label="Formatting">
  <ToolbarToggleIconButton aria-label="Bold"><FormatBoldIcon /></ToolbarToggleIconButton>
  <ToolbarToggleIconButton aria-label="Italic"><FormatItalicIcon /></ToolbarToggleIconButton>
  <ToolbarIconButton aria-label="Undo"><UndoIcon /></ToolbarIconButton>
</FloatingToolbar>

<FloatingToolbar variant="vibrant" aria-label="Formatting">…</FloatingToolbar>`}
        >
          <FloatingToolbar aria-label="Formatting">
            <FormattingItems />
          </FloatingToolbar>
          <FloatingToolbar variant="vibrant" aria-label="Formatting (vibrant)">
            <FormattingItems />
          </FloatingToolbar>
        </Preview>
      </Section>

      <Section
        title="With a FAB"
        description="A floating toolbar can pair with a FAB. When collapsed, the toolbar shrinks into the FAB on the default spatial spring."
      >
        <Preview
          code={`const [expanded, setExpanded] = React.useState(true);

<FloatingToolbarLayout>
  <FloatingToolbar variant="vibrant" expanded={expanded} aria-label="Compose">
    <ToolbarIconButton aria-label="Attach"><AttachFileIcon /></ToolbarIconButton>
    <ToolbarIconButton aria-label="Insert image"><ImageIcon /></ToolbarIconButton>
  </FloatingToolbar>
  <ToolbarFab variant="vibrant" aria-label="Edit" onClick={() => setExpanded((value) => !value)}>
    <EditIcon />
  </ToolbarFab>
</FloatingToolbarLayout>`}
        >
          <FabToolbar />
        </Preview>
      </Section>

      <VerticalSection />
      <DockedSection />
    </>
  );
}
