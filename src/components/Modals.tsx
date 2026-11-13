import {
  ArrowLeft,
  ArrowRight,
  Check,
  Monitor,
  Smartphone,
  X,
} from 'lucide-react';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import {
  ACCENT_PALETTES,
  AccentColorId,
  APP_TEMPLATES,
  AppTemplate,
  INFO_MODAL_CONTENT,
  InfoModalTopic,
} from '../data/appforgeData';

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  children: ReactNode;
}

function ModalShell({
  open,
  onClose,
  title,
  subtitle,
  maxWidth = 'max-w-lg',
  children,
}: ModalShellProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111318]/45 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xl sm:p-7`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="modal-heading"
              className="font-display text-xl font-bold tracking-tight text-[#111318]"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-[#4B5563]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111318]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

/* 1. Start Building Modal */
interface StartBuildingModalProps {
  open: boolean;
  initialAppName?: string;
  initialAccent?: AccentColorId;
  initialPlan?: string;
  onClose: () => void;
  onLaunchInSandbox: (template: AppTemplate) => void;
}

export function StartBuildingModal({
  open,
  initialAppName,
  initialAccent,
  initialPlan,
  onClose,
  onLaunchInSandbox,
}: StartBuildingModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    APP_TEMPLATES[0].id
  );
  const [appName, setAppName] = useState(initialAppName || 'My First App');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setAppName(initialAppName || 'My First App');
      setError('');
      setSubmitted(false);
    }
  }, [open, initialAppName]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!appName.trim()) {
      setError('Please enter a name for your app.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const selectedTemplate =
    APP_TEMPLATES.find((t) => t.id === selectedTemplateId) ?? APP_TEMPLATES[0];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={
        initialPlan === 'studio'
          ? 'Start your Pro workspace'
          : 'Start building with AppForge'
      }
      subtitle="Pick a starting layout and name your app. You can adjust everything later."
    >
      {submitted ? (
        <div className="space-y-4 rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] p-5">
          <div className="flex items-center gap-2.5 text-[#047857]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ECFDF5]">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-semibold">
              Workspace prepared for “{appName}”
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#4B5563]">
            We sent a workspace link to <span className="font-medium text-[#111318]">{email}</span>. You can also explore your chosen layout right now in the interactive editor on this page.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => {
                onLaunchInSandbox({
                  ...selectedTemplate,
                  appTitle: appName.trim() || selectedTemplate.appTitle,
                  accent: initialAccent ?? selectedTemplate.accent,
                });
                onClose();
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF]"
            >
              <span>Open in interactive editor</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[40px] items-center rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-xs font-medium text-[#111318] transition-colors hover:bg-[#F9FAFB]"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="start-app-name"
              className="block text-xs font-semibold text-[#111318]"
            >
              App name
            </label>
            <input
              id="start-app-name"
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g. Client Intake Portal"
              className="mt-1.5 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111318] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-[#111318]">
              Starting layout
            </span>
            <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {APP_TEMPLATES.map((tpl) => {
                const active = tpl.id === selectedTemplateId;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      active
                        ? 'border-[#1D4ED8] bg-[#EFF6FF]/60'
                        : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#111318]">
                      {tpl.name}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#6B7280]">
                      {tpl.category} · {tpl.screenCount}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="start-email"
              className="block text-xs font-semibold text-[#111318]"
            >
              Email address
            </label>
            <input
              id="start-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111318] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-[#B91C1C]">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-xs font-medium text-[#111318] transition-colors hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[40px] rounded-lg bg-[#1D4ED8] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF]"
            >
              Create free workspace
            </button>
          </div>
        </form>
      )}
    </ModalShell>
  );
}

/* 2. Watch Demo Modal */
interface DemoModalProps {
  open: boolean;
  onClose: () => void;
  onStartBuilding: () => void;
}

const DEMO_STEPS = [
  {
    step: 'Step 1 of 3',
    title: 'Pick a layout or start blank',
    body: 'Choose a starting screen like a booking portal or inspection checklist. Every block is already sized for mobile and desktop screens.',
    highlight: 'Component panel · Starter blocks',
  },
  {
    step: 'Step 2 of 3',
    title: 'Customize text, order, and style',
    body: 'Click any block on the central canvas to edit its heading, toggle visibility, reorder sections, or switch your app’s accent color.',
    highlight: 'Direct canvas editing · Instant updates',
  },
  {
    step: 'Step 3 of 3',
    title: 'Test live and share a link',
    body: 'Switch between phone and desktop views in the live preview pane to test buttons and forms, then share your app with a single link.',
    highlight: 'Mobile & desktop preview · Shareable URL',
  },
];

export function DemoModal({ open, onClose, onStartBuilding }: DemoModalProps) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (open) setStepIdx(0);
  }, [open]);

  const current = DEMO_STEPS[stepIdx];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="How AppForge works"
      subtitle="A quick walkthrough of the visual editor."
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Step Progress Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {DEMO_STEPS.map((item, idx) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setStepIdx(idx)}
              className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                idx === stepIdx
                  ? 'border-[#1D4ED8] bg-[#EFF6FF]'
                  : 'border-[#E5E7EB] bg-[#F8F9FB] hover:border-[#D1D5DB]'
              }`}
            >
              <div className="font-mono text-[11px] font-medium text-[#1D4ED8]">
                0{idx + 1}.
              </div>
              <div className="mt-0.5 truncate text-xs font-medium text-[#111318]">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Visual Step Frame */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] p-5">
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span className="font-mono font-medium text-[#1D4ED8]">
              {current.step}
            </span>
            <span>{current.highlight}</span>
          </div>

          <h3 className="mt-2 font-display text-lg font-semibold text-[#111318]">
            {current.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563]">
            {current.body}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2.5 rounded-lg border border-[#E5E7EB] bg-white p-3">
            <div
              className={`rounded-md border p-2.5 ${
                stepIdx === 0
                  ? 'border-[#1D4ED8] bg-[#EFF6FF]/60'
                  : 'border-[#F3F4F6] bg-[#F9FAFB]'
              }`}
            >
              <div className="text-[11px] font-semibold text-[#111318]">
                Blocks
              </div>
              <div className="mt-1.5 space-y-1">
                <div className="h-2 w-full rounded bg-[#E5E7EB]" />
                <div className="h-2 w-4/5 rounded bg-[#E5E7EB]" />
              </div>
            </div>
            <div
              className={`rounded-md border p-2.5 ${
                stepIdx === 1
                  ? 'border-[#1D4ED8] bg-[#EFF6FF]/60'
                  : 'border-[#F3F4F6] bg-[#F9FAFB]'
              }`}
            >
              <div className="text-[11px] font-semibold text-[#111318]">
                Canvas
              </div>
              <div className="mt-1.5 space-y-1">
                <div className="h-2 w-full rounded bg-[#1D4ED8]/25" />
                <div className="h-2 w-3/4 rounded bg-[#E5E7EB]" />
              </div>
            </div>
            <div
              className={`rounded-md border p-2.5 ${
                stepIdx === 2
                  ? 'border-[#1D4ED8] bg-[#EFF6FF]/60'
                  : 'border-[#F3F4F6] bg-[#F9FAFB]'
              }`}
            >
              <div className="text-[11px] font-semibold text-[#111318]">
                Preview
              </div>
              <div className="mt-1.5 space-y-1">
                <div className="h-2 w-full rounded bg-[#047857]/25" />
                <div className="h-2 w-2/3 rounded bg-[#E5E7EB]" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            disabled={stepIdx === 0}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs font-medium text-[#111318] transition-colors hover:bg-[#F9FAFB] disabled:opacity-40"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          {stepIdx < DEMO_STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() =>
                setStepIdx((i) => Math.min(DEMO_STEPS.length - 1, i + 1))
              }
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#111318] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#27272A]"
            >
              <span>Next step</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartBuilding();
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF]"
            >
              <span>Start building free</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </ModalShell>
  );
}

/* 3. Sign In Modal */
interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

export function SignInModal({ open, onClose }: SignInModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setError('');
      setDone(false);
    }
  }, [open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setDone(true);
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={mode === 'signin' ? 'Sign in to AppForge' : 'Create your AppForge account'}
      subtitle={
        mode === 'signin'
          ? 'Enter your email and password to open your saved apps.'
          : 'Save your app layouts and publish preview links.'
      }
      maxWidth="max-w-md"
    >
      {done ? (
        <div className="space-y-4 rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] p-5">
          <div className="flex items-center gap-2 text-[#047857]">
            <Check className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {mode === 'signin' ? 'Signed in' : 'Account created'}
            </span>
          </div>
          <p className="text-sm text-[#4B5563]">
            Signed in as <span className="font-medium text-[#111318]">{email}</span>.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] w-full rounded-lg bg-[#111318] px-4 py-2 text-xs font-medium text-white hover:bg-[#27272A]"
          >
            Continue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="auth-email"
              className="block text-xs font-semibold text-[#111318]"
            >
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm text-[#111318] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="auth-password"
              className="block text-xs font-semibold text-[#111318]"
            >
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="mt-1.5 w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm text-[#111318] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-[#B91C1C]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="min-h-[44px] w-full rounded-lg bg-[#1D4ED8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1E40AF]"
          >
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>

          <p className="text-center text-xs text-[#6B7280]">
            {mode === 'signin' ? 'New to AppForge? ' : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError('');
              }}
              className="font-medium text-[#1D4ED8] underline-offset-2 hover:underline"
            >
              {mode === 'signin' ? 'Create a free account' : 'Sign in instead'}
            </button>
          </p>
        </form>
      )}
    </ModalShell>
  );
}

/* 4. Template Preview Modal */
interface TemplatePreviewModalProps {
  template: AppTemplate | null;
  onClose: () => void;
  onLoadInEditor: (template: AppTemplate) => void;
}

export function TemplatePreviewModal({
  template,
  onClose,
  onLoadInEditor,
}: TemplatePreviewModalProps) {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  if (!template) return null;

  const accent =
    ACCENT_PALETTES.find((p) => p.id === template.accent) ?? ACCENT_PALETTES[0];

  return (
    <ModalShell
      open={Boolean(template)}
      onClose={onClose}
      title={template.name}
      subtitle={`${template.category} · ${template.screenCount} · ${template.layoutType}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-lg bg-[#F3F4F6] p-1">
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                device === 'mobile'
                  ? 'bg-white text-[#111318] shadow-xs'
                  : 'text-[#4B5563]'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                device === 'desktop'
                  ? 'bg-white text-[#111318] shadow-xs'
                  : 'text-[#4B5563]'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onLoadInEditor(template);
              onClose();
            }}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-[#1D4ED8] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF]"
          >
            <span>Edit this template</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex justify-center rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] p-5">
          <div
            className={`w-full border border-[#D4D8E0] bg-white p-4 shadow-sm ${
              device === 'mobile' ? 'max-w-[300px] rounded-[24px]' : 'rounded-xl'
            }`}
          >
            <div className="space-y-3">
              {template.blocks
                .filter((b) => b.enabled)
                .map((block) => {
                  if (block.type === 'header') {
                    return (
                      <div
                        key={block.id}
                        className="flex items-center justify-between border-b border-[#F3F4F6] pb-2"
                      >
                        <span className="font-display text-sm font-semibold text-[#111318]">
                          {block.title}
                        </span>
                        <span className="text-[11px] text-[#6B7280]">
                          {block.subtitle}
                        </span>
                      </div>
                    );
                  }
                  if (block.type === 'summary') {
                    return (
                      <div
                        key={block.id}
                        className="rounded-xl p-3"
                        style={{ backgroundColor: accent.softBg }}
                      >
                        <div
                          className="text-xs font-semibold"
                          style={{ color: accent.text }}
                        >
                          {block.title}
                        </div>
                        <p className="mt-1 text-xs text-[#374151]">
                          {block.subtitle}
                        </p>
                      </div>
                    );
                  }
                  if (block.type === 'schedule' || block.type === 'checklist') {
                    return (
                      <div key={block.id} className="space-y-1.5">
                        <div className="text-xs font-semibold text-[#111318]">
                          {block.title}
                        </div>
                        {block.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg border border-[#E5E7EB] px-2.5 py-2 text-xs"
                          >
                            <span className="text-[#111318]">{item.label}</span>
                            <span className="text-[11px] text-[#6B7280]">
                              {item.meta}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (block.type === 'action') {
                    return (
                      <div
                        key={block.id}
                        className="rounded-lg py-2 text-center text-xs font-medium text-white"
                        style={{ backgroundColor: accent.hex }}
                      >
                        {block.title}
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

/* 5. Info Modal for Footer Help / Company / Privacy */
interface InfoModalProps {
  topic: InfoModalTopic | null;
  onClose: () => void;
}

export function InfoModal({ topic, onClose }: InfoModalProps) {
  if (!topic) return null;
  const content = INFO_MODAL_CONTENT[topic];

  return (
    <ModalShell
      open={Boolean(topic)}
      onClose={onClose}
      title={content.title}
      subtitle={content.subtitle}
    >
      <div className="space-y-4">
        {content.sections.map((section) => (
          <div
            key={section.heading}
            className="rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] p-4"
          >
            <h3 className="text-sm font-semibold text-[#111318]">
              {section.heading}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
              {section.body}
            </p>
          </div>
        ))}

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg bg-[#111318] px-4 py-2 text-xs font-medium text-white hover:bg-[#27272A]"
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
