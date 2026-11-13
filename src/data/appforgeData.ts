export type AccentColorId = 'cobalt' | 'emerald' | 'slate' | 'amber';

export interface AccentPalette {
  id: AccentColorId;
  label: string;
  hex: string;
  softBg: string;
  text: string;
  border: string;
}

export const ACCENT_PALETTES: AccentPalette[] = [
  {
    id: 'cobalt',
    label: 'Cobalt',
    hex: '#1D4ED8',
    softBg: '#EFF6FF',
    text: '#1E40AF',
    border: '#BFDBFE',
  },
  {
    id: 'emerald',
    label: 'Forest',
    hex: '#047857',
    softBg: '#ECFDF5',
    text: '#065F46',
    border: '#A7F3D0',
  },
  {
    id: 'slate',
    label: 'Ink',
    hex: '#18181B',
    softBg: '#F4F4F5',
    text: '#18181B',
    border: '#E4E4E7',
  },
  {
    id: 'amber',
    label: 'Ochre',
    hex: '#B45309',
    softBg: '#FFFBEB',
    text: '#92400E',
    border: '#FDE68A',
  },
];

export type BlockType =
  | 'header'
  | 'summary'
  | 'checklist'
  | 'form'
  | 'schedule'
  | 'metric'
  | 'action';

export interface EditorBlock {
  id: string;
  type: BlockType;
  label: string;
  description: string;
  enabled: boolean;
  title: string;
  subtitle?: string;
  ctaText?: string;
  items?: { label: string; meta: string; checked?: boolean }[];
}

export interface PaletteComponentItem {
  type: BlockType;
  label: string;
  hint: string;
  defaultTitle: string;
  defaultSubtitle?: string;
  defaultItems?: { label: string; meta: string; checked?: boolean }[];
}

export const COMPONENT_CATALOG: PaletteComponentItem[] = [
  {
    type: 'header',
    label: 'Header Bar',
    hint: 'Top app title and section label',
    defaultTitle: 'My Workspace',
    defaultSubtitle: 'Overview',
  },
  {
    type: 'summary',
    label: 'Text Banner',
    hint: 'Intro heading with supporting copy',
    defaultTitle: 'Welcome to your app',
    defaultSubtitle: 'Share clear instructions or highlight what matters first.',
  },
  {
    type: 'metric',
    label: 'Summary Cards',
    hint: 'Two-column highlight tiles',
    defaultTitle: 'Quick overview',
    defaultItems: [
      { label: 'Active items', meta: '12 open' },
      { label: 'Next review', meta: 'Today, 4 PM' },
    ],
  },
  {
    type: 'checklist',
    label: 'Checklist',
    hint: 'Interactive rows users can tap',
    defaultTitle: 'Tasks to complete',
    defaultItems: [
      { label: 'Review details', meta: 'Done', checked: true },
      { label: 'Confirm schedule', meta: 'Pending', checked: false },
    ],
  },
  {
    type: 'form',
    label: 'Input Field',
    hint: 'Collect an email, name, or note',
    defaultTitle: 'Your contact info',
    defaultSubtitle: 'Enter email or short note',
  },
  {
    type: 'action',
    label: 'Primary Button',
    hint: 'Full-width submit or continue action',
    defaultTitle: 'Continue',
  },
];

export interface AppTemplate {
  id: string;
  name: string;
  category: 'Client Portals' | 'Operations' | 'Events';
  summary: string;
  screenCount: string;
  layoutType: string;
  accent: AccentColorId;
  appTitle: string;
  appSubtitle: string;
  blocks: EditorBlock[];
}

export const APP_TEMPLATES: AppTemplate[] = [
  {
    id: 'client-booking',
    name: 'Client Booking Portal',
    category: 'Client Portals',
    summary:
      'A mobile-friendly intake and appointment flow where clients pick a session, review details, and confirm.',
    screenCount: '3 screens',
    layoutType: 'Mobile & Desktop',
    accent: 'cobalt',
    appTitle: 'Studio North',
    appSubtitle: 'Book a consultation or send project notes',
    blocks: [
      {
        id: 'blk-header',
        type: 'header',
        label: 'Header Bar',
        description: 'App title, navigation trigger, and brand mark',
        enabled: true,
        title: 'Studio North',
        subtitle: 'Client Intake',
      },
      {
        id: 'blk-summary',
        type: 'summary',
        label: 'Welcome Banner',
        description: 'Introduces the screen and sets clear context',
        enabled: true,
        title: 'Schedule your session',
        subtitle: 'Choose a time that fits your team and share your goals.',
      },
      {
        id: 'blk-schedule',
        type: 'schedule',
        label: 'Time Slot List',
        description: 'Selectable rows for available appointments',
        enabled: true,
        title: 'Available times',
        items: [
          { label: 'Tue, Nov 17 · 10:00 AM', meta: '30 min · Video', checked: true },
          { label: 'Wed, Nov 18 · 2:30 PM', meta: '30 min · Video', checked: false },
          { label: 'Thu, Nov 19 · 11:00 AM', meta: '45 min · Review', checked: false },
        ],
      },
      {
        id: 'blk-form',
        type: 'form',
        label: 'Contact Fields',
        description: 'Clean single-column inputs for name and notes',
        enabled: true,
        title: 'Your details',
        subtitle: 'Name, email, and project summary',
      },
      {
        id: 'blk-action',
        type: 'action',
        label: 'Primary Button',
        description: 'Full-width confirmation button anchored cleanly',
        enabled: true,
        title: 'Confirm booking',
        ctaText: 'Confirm booking',
      },
    ],
  },
  {
    id: 'field-checklist',
    name: 'Field Inspection Checklist',
    category: 'Operations',
    summary:
      'Structured task verification for on-site teams with tap-friendly checkboxes and quick status notes.',
    screenCount: '4 screens',
    layoutType: 'Mobile-first',
    accent: 'emerald',
    appTitle: 'Site Walkthrough',
    appSubtitle: 'Daily opening and safety verification',
    blocks: [
      {
        id: 'blk-header',
        type: 'header',
        label: 'Header Bar',
        description: 'App title, navigation trigger, and brand mark',
        enabled: true,
        title: 'Site Walkthrough',
        subtitle: 'Zone B · Morning',
      },
      {
        id: 'blk-summary',
        type: 'summary',
        label: 'Welcome Banner',
        description: 'Introduces the screen and sets clear context',
        enabled: true,
        title: 'Opening checklist',
        subtitle: 'Verify each checkpoint before signing off the shift.',
      },
      {
        id: 'blk-checklist',
        type: 'checklist',
        label: 'Checklist Items',
        description: 'Interactive tap targets with completion states',
        enabled: true,
        title: 'Checkpoints',
        items: [
          { label: 'Main entry access unlocked', meta: 'Verified', checked: true },
          { label: 'Equipment power check', meta: 'Verified', checked: true },
          { label: 'Safety signage unobstructed', meta: 'Pending', checked: false },
        ],
      },
      {
        id: 'blk-form',
        type: 'form',
        label: 'Inspector Note',
        description: 'Optional field for follow-up remarks',
        enabled: false,
        title: 'Shift notes',
        subtitle: 'Add notes for maintenance or handover',
      },
      {
        id: 'blk-action',
        type: 'action',
        label: 'Primary Button',
        description: 'Submits the completed inspection record',
        enabled: true,
        title: 'Submit checklist',
        ctaText: 'Submit checklist',
      },
    ],
  },
  {
    id: 'event-guide',
    name: 'Community Event Guide',
    category: 'Events',
    summary:
      'A pocket companion for workshops and meetups featuring room schedules, speaker notes, and RSVP.',
    screenCount: '3 screens',
    layoutType: 'Responsive',
    accent: 'amber',
    appTitle: 'Design Craft Day',
    appSubtitle: 'Workshop schedule and room map',
    blocks: [
      {
        id: 'blk-header',
        type: 'header',
        label: 'Header Bar',
        description: 'App title, navigation trigger, and brand mark',
        enabled: true,
        title: 'Design Craft Day',
        subtitle: 'Main Hall',
      },
      {
        id: 'blk-summary',
        type: 'summary',
        label: 'Welcome Banner',
        description: 'Introduces the event and today’s highlight',
        enabled: true,
        title: 'Afternoon sessions',
        subtitle: 'Tap any session below to reserve a seat in the room.',
      },
      {
        id: 'blk-schedule',
        type: 'schedule',
        label: 'Session Schedule',
        description: 'Clean timetable rows with room locations',
        enabled: true,
        title: 'Today’s lineup',
        items: [
          { label: '1:00 PM · Prototyping interfaces', meta: 'Room 204', checked: true },
          { label: '2:15 PM · Mobile layout basics', meta: 'Studio A', checked: false },
          { label: '3:30 PM · Open feedback desk', meta: 'Atrium', checked: false },
        ],
      },
      {
        id: 'blk-form',
        type: 'form',
        label: 'Question Box',
        description: 'Collect attendee questions for speakers',
        enabled: true,
        title: 'Ask a speaker',
        subtitle: 'Your question goes straight to the moderator',
      },
      {
        id: 'blk-action',
        type: 'action',
        label: 'Primary Button',
        description: 'Saves seat reservation on the attendee’s device',
        enabled: true,
        title: 'Save my seat',
        ctaText: 'Save my seat',
      },
    ],
  },
  {
    id: 'service-directory',
    name: 'Neighborhood Vendor Hub',
    category: 'Client Portals',
    summary:
      'Organize local services, hours, and request forms in one straightforward directory for residents or members.',
    screenCount: '3 screens',
    layoutType: 'Mobile & Desktop',
    accent: 'slate',
    appTitle: 'Oakridge Hub',
    appSubtitle: 'Member services and request desk',
    blocks: [
      {
        id: 'blk-header',
        type: 'header',
        label: 'Header Bar',
        description: 'App title, navigation trigger, and brand mark',
        enabled: true,
        title: 'Oakridge Hub',
        subtitle: 'Directory',
      },
      {
        id: 'blk-summary',
        type: 'summary',
        label: 'Welcome Banner',
        description: 'Clear welcome message for members',
        enabled: true,
        title: 'Member services',
        subtitle: 'Browse available providers or request assistance directly.',
      },
      {
        id: 'blk-checklist',
        type: 'checklist',
        label: 'Service Directory',
        description: 'List of local services with hours',
        enabled: true,
        title: 'Available desks',
        items: [
          { label: 'Bike & parcel locker support', meta: '8 AM – 6 PM', checked: true },
          { label: 'Meeting room booking', meta: 'Open today', checked: true },
          { label: 'Maintenance request', meta: 'Same-day', checked: false },
        ],
      },
      {
        id: 'blk-form',
        type: 'form',
        label: 'Request Form',
        description: 'Collect member unit and message',
        enabled: true,
        title: 'Send a request',
        subtitle: 'Include preferred contact method',
      },
      {
        id: 'blk-action',
        type: 'action',
        label: 'Primary Button',
        description: 'Sends request to the coordinator',
        enabled: true,
        title: 'Send request',
        ctaText: 'Send request',
      },
    ],
  },
];

export interface BenefitItem {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  span: 'wide' | 'narrow';
}

export const BENEFITS: BenefitItem[] = [
  {
    id: 'visual-editing',
    number: '01.',
    title: 'Visual editing without guesswork',
    description:
      'Click any heading, list, or button directly on the canvas to adjust wording, spacing, and alignment. You see the exact layout as you arrange it—no style sheets or markup required.',
    detail: 'Direct canvas selection · Snap spacing · Plain-language controls',
    span: 'wide',
  },
  {
    id: 'reusable-components',
    number: '02.',
    title: 'Reusable components that stay consistent',
    description:
      'Build with tested headers, forms, cards, and action rows. Update your accent color or corner style once, and every screen in your app updates to match.',
    detail: 'Shared styles · Consistent buttons · Clean structure',
    span: 'narrow',
  },
  {
    id: 'mobile-friendly',
    number: '03.',
    title: 'Mobile-friendly design from the first click',
    description:
      'Every block adapts cleanly between phone screens and desktop browsers. Tap targets stay comfortably sized and text remains legible on any device.',
    detail: 'Phone & desktop breakpoints · Touch-ready sizing',
    span: 'narrow',
  },
  {
    id: 'live-preview',
    number: '04.',
    title: 'Live preview as you assemble',
    description:
      'Test checkboxes, buttons, and forms side-by-side while you edit. Check how the app behaves before anyone else opens your link.',
    detail: 'Interactive states · Instant device switch · Shareable preview',
    span: 'wide',
  },
];

export interface StepItem {
  number: string;
  title: string;
  description: string;
  hint: string;
}

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01.',
    title: 'Choose a starting point',
    description:
      'Pick a ready-made layout like a client booking portal, checklist, or event guide—or start from a clean blank screen.',
    hint: 'Start with structure instead of an empty page',
  },
  {
    number: '02.',
    title: 'Customize the design',
    description:
      'Add or reorder blocks from the component panel, write your own labels, and set a color palette that fits your project.',
    hint: 'Every change appears on the canvas immediately',
  },
  {
    number: '03.',
    title: 'Preview and share',
    description:
      'Switch between mobile and desktop views to test every tap and form field, then publish a clean link anyone can open.',
    hint: 'Ready for phones, tablets, and desktop browsers',
  },
];

export interface PricingPlan {
  id: string;
  name: string;
  summary: string;
  monthlyPrice: string;
  annualPrice: string;
  cadenceNote: string;
  ctaLabel: string;
  featured: boolean;
  features: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    summary: 'Everything you need to design, test, and share your first app.',
    monthlyPrice: '$0',
    annualPrice: '$0',
    cadenceNote: 'Free to start, no card required',
    ctaLabel: 'Start building free',
    featured: false,
    features: [
      'Visual drag-and-arrange editor',
      'Core component library (headers, lists, forms, buttons)',
      'Live mobile and desktop preview',
      'Shareable AppForge preview link',
    ],
  },
  {
    id: 'studio',
    name: 'Pro',
    summary: 'For teams and makers publishing polished apps on their own domain.',
    monthlyPrice: '$19',
    annualPrice: '$15',
    cadenceNote: 'Per workspace, billed monthly or annually',
    ctaLabel: 'Start with Pro',
    featured: true,
    features: [
      'Everything in Starter',
      'Custom domain publishing',
      'Saved reusable component presets',
      'Shared workspace editing for collaborators',
    ],
  },
];

export type InfoModalTopic = 'help' | 'company' | 'privacy';

export const INFO_MODAL_CONTENT: Record<
  InfoModalTopic,
  { title: string; subtitle: string; sections: { heading: string; body: string }[] }
> = {
  help: {
    title: 'Help & Getting Started',
    subtitle: 'Plain answers to common questions about building with AppForge.',
    sections: [
      {
        heading: 'Do I need any coding background?',
        body: 'No. AppForge is built around visual blocks—headers, lists, forms, and buttons—that you arrange and edit directly on the canvas.',
      },
      {
        heading: 'How do I check how my app looks on a phone?',
        body: 'Use the Mobile and Desktop toggle at the top of the editor. The live preview updates immediately so you can test tap targets and spacing.',
      },
      {
        heading: 'Can I start from a template and change everything?',
        body: 'Yes. Templates give you a clean starting structure, and every title, block order, color, and button label can be customized or removed.',
      },
    ],
  },
  company: {
    title: 'About AppForge',
    subtitle: 'Software tools designed so more people can turn ideas into working interfaces.',
    sections: [
      {
        heading: 'Why we built AppForge',
        body: 'Too many straightforward tools—like client portals, checklists, and event guides—never get built because traditional app development takes weeks of setup.',
      },
      {
        heading: 'Our approach',
        body: 'We focus on clean defaults, predictable layout rules, and mobile-ready components so beginners can produce thoughtful, readable apps on their first try.',
      },
    ],
  },
  privacy: {
    title: 'Privacy & Data Practices',
    subtitle: 'Clear terms for how AppForge handles your projects and account details.',
    sections: [
      {
        heading: 'Your designs belong to you',
        body: 'Any text, layouts, and app configurations you create inside AppForge remain yours to edit, export, or remove at any time.',
      },
      {
        heading: 'Minimal account data',
        body: 'We only ask for the account details needed to save your workspace and publish links you choose to share.',
      },
    ],
  },
};
