export interface NavLink {
  title: string;
  description?: string;
  to?: string;
  hash?: string;
}

export interface NavGroup {
  title: string;
  items: NavLink[];
}

export type NavEntry = NavGroup | NavLink;

export const sectionLinks: NavLink[] = [
  { to: '/', title: 'Getting started' },
  { to: '/components', title: 'Components' },
  { to: '/theme', title: 'Theming' },
];

export const componentNav: NavEntry[] = [
  {
    title: 'App bars',
    to: '/components/app-bar',
    description: 'App bars are placed at the top of the screen to help people navigate',
  },
  {
    title: 'Badges',
    to: '/components/badge',
    description: 'Badges show notifications, counts, or status information',
  },
  {
    title: 'Buttons',
    items: [
      {
        title: 'Button groups',
        to: '/components/button-group',
        description: 'Button groups organize buttons and add interactions between them',
      },
      {
        title: 'Buttons',
        to: '/components/button',
        description: 'Buttons prompt most actions in a UI',
      },
      {
        title: 'Extended FABs',
        to: '/components/fab',
        hash: 'extended-fab',
        description: 'Extended FABs help people take primary actions',
      },
      {
        title: 'FAB menu',
        description: 'The FAB menu opens from a FAB to display multiple related actions',
      },
      {
        title: 'FABs',
        to: '/components/fab',
        description: 'Floating action buttons help people take primary actions',
      },
      {
        title: 'Icon buttons',
        to: '/components/icon-button',
        description: 'Icon buttons help people take actions with a single tap',
      },
      {
        title: 'Segmented buttons',
        description: 'Segmented buttons help people select options, switch views, or sort elements',
      },
      {
        title: 'Split button',
        to: '/components/split-button',
        description: 'Split buttons open a menu to give people more options related to an action',
      },
    ],
  },
  {
    title: 'Cards',
    to: '/components/card',
    description: 'Cards display content and actions about a single subject',
  },
  {
    title: 'Carousel',
    description: 'Carousels show a collection of items that can be scrolled on and off the screen',
  },
  {
    title: 'Checkbox',
    to: '/components/checkbox',
    description: 'Checkboxes let users select one or more items from a list',
  },
  {
    title: 'Chips',
    to: '/components/chip',
    description:
      'Chips help people enter information, make selections, filter content, or trigger actions',
  },
  {
    title: 'Date & time pickers',
    items: [
      {
        title: 'Date pickers',
        description: 'Date pickers let people select a date, or a range of dates',
      },
      {
        title: 'Time pickers',
        description: 'Time pickers help people select and set a specific time',
      },
    ],
  },
  { title: 'Dialogs', description: 'Dialogs provide important prompts in a user flow' },
  {
    title: 'Divider',
    description: 'Dividers are thin lines that group content in lists or other containers',
  },
  { title: 'Lists', description: 'Lists are continuous, vertical indexes of text and images' },
  {
    title: 'Loading & progress',
    items: [
      {
        title: 'Loading indicator',
        description: 'Loading indicators show the progress of a process for a short wait time',
      },
      {
        title: 'Progress indicators',
        description: 'Progress indicators show the status of a process in real time',
      },
    ],
  },
  {
    title: 'Menus',
    to: '/components/menu',
    description: 'Menus display a list of choices on a temporary surface',
  },
  {
    title: 'Navigation',
    items: [
      {
        title: 'Navigation bar',
        description: 'Navigation bars let people switch between UI views on smaller devices',
      },
      {
        title: 'Navigation drawer',
        description: 'Navigation drawers let people switch between UI views on larger devices',
      },
      {
        title: 'Navigation rail',
        description: 'Navigation rails let people switch between UI views on mid-sized devices',
      },
    ],
  },
  {
    title: 'Radio button',
    to: '/components/radio',
    description: 'Radio buttons let people select one option from a set of options',
  },
  {
    title: 'Scroll fields',
    description: 'Scroll fields let people pick a value by scrolling a list',
  },
  {
    title: 'Search',
    description: 'Search lets people enter a keyword or phrase to get relevant information',
  },
  {
    title: 'Sheets',
    items: [
      {
        title: 'Bottom sheets',
        to: '/components/bottom-sheet',
        description: 'Bottom sheets show secondary content anchored to the bottom of the screen',
      },
      {
        title: 'Side sheets',
        to: '/components/side-sheet',
        description: 'Side sheets show secondary content anchored to the side of the screen',
      },
    ],
  },
  {
    title: 'Sliders',
    description: 'Sliders allow users to make selections from a range of values',
  },
  { title: 'Snackbar', description: 'Snackbars show short updates about app processes' },
  {
    title: 'Switch',
    to: '/components/switch',
    description: 'Switches toggle the selection of an item on and off',
  },
  {
    title: 'Tabs',
    to: '/components/tabs',
    description: 'Tabs organize content across different screens and views',
  },
  { title: 'Text fields', description: 'Text fields let users enter text into a UI' },
  {
    title: 'Toolbars',
    to: '/components/toolbar',
    description: 'Toolbars display frequently used actions relevant to the current page',
  },
  { title: 'Tooltips', description: 'Tooltips display brief labels or messages' },
];

export function isGroup(entry: NavEntry): entry is NavGroup {
  return 'items' in entry;
}
