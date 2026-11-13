import { ArrowUpRight, Check, Layers, Palette, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  ACCENT_PALETTES,
  AccentColorId,
  APP_TEMPLATES,
  AppTemplate,
} from '../data/appforgeData';

interface ProductTourSectionProps {
  onLoadTemplateInBuilder: (template: AppTemplate) => void;
}

type TourViewId = 'canvas' | 'responsive' | 'tokens';

const TOUR_VIEWS: {
  id: TourViewId;
  number: string;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    id: 'canvas',
    number: '01.',
    label: 'Visual canvas',
    title: 'Arrange screens by stacking clear, predictable blocks',
    description:
      'Every section snaps to consistent spacing rules so headings, lists, and action buttons line up cleanly without manual CSS.',
  },
  {
    id: 'responsive',
    number: '02.',
    label: 'Mobile & desktop',
    title: 'One layout adapts cleanly to phones and larger screens',
    description:
      'Tap targets stay comfortably sized on mobile while multi-column summaries expand automatically when opened on a laptop.',
  },
  {
    id: 'tokens',
    number: '03.',
    label: 'Shared styles',
    title: 'Update your accent color once and apply it everywhere',
    description:
      'Keep headers, highlights, and primary buttons consistent across every screen in your app from a single style setting.',
  },
];

export function ProductTourSection({
  onLoadTemplateInBuilder,
}: ProductTourSectionProps) {
  const [activeView, setActiveView] = useState<TourViewId>('canvas');
  const [activeTemplateId, setActiveTemplateId] = useState<string>(
    APP_TEMPLATES[0].id
  );
  const [tourAccentId, setTourAccentId] = useState<AccentColorId>(
    APP_TEMPLATES[0].accent
  );

  const selectedTemplate =
    APP_TEMPLATES.find((t) => t.id === activeTemplateId) ?? APP_TEMPLATES[0];
  const accent =
    ACCENT_PALETTES.find((p) => p.id === tourAccentId) ?? ACCENT_PALETTES[0];
  const currentView =
    TOUR_VIEWS.find((v) => v.id === activeView) ?? TOUR_VIEWS[0];

  const handleTemplateSelect = (tpl: AppTemplate) => {
    setActiveTemplateId(tpl.id);
    setTourAccentId(tpl.accent);
  };

  const listBlock = selectedTemplate.blocks.find(
    (b) => b.type === 'schedule' || b.type === 'checklist'
  );
  const summaryBlock = selectedTemplate.blocks.find((b) => b.type === 'summary');
  const actionBlock = selectedTemplate.blocks.find((b) => b.type === 'action');

  return (
    <section
      id="product-tour"
      className="scroll-mt-16 border-t border-[#E4E2DC] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#1D4ED8]">
              Explore the builder
            </p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#121316] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              See how one screen transforms as you edit.
            </h2>
          </div>

          {/* Template Quick Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#6B6E75]">
              Example app:
            </span>
            <div
              role="group"
              aria-label="Select tour app template"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#E4E2DC] bg-white p-1"
            >
              {APP_TEMPLATES.slice(0, 3).map((tpl) => {
                const isSelected = tpl.id === selectedTemplate.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleTemplateSelect(tpl)}
                    aria-pressed={isSelected}
                    className={`min-h-[34px] whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#121316] text-white'
                        : 'text-[#4B4E54] hover:text-[#121316]'
                    }`}
                  >
                    {tpl.appTitle}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left: 3 Interactive View Tabs */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            <div className="space-y-3">
              {TOUR_VIEWS.map((view) => {
                const isActive = view.id === activeView;
                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveView(view.id)}
                    aria-pressed={isActive}
                    className={`w-full rounded-xl border p-5 text-left transition-all duration-150 ${
                      isActive
                        ? 'border-[#1D4ED8] bg-white shadow-xs'
                        : 'border-[#E4E2DC] bg-[#FAF9F6] hover:border-[#C9C5BC] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-medium text-[#1D4ED8]">
                        {view.number} {view.label}
                      </span>
                      <span className="text-[#4B4E54]" aria-hidden="true">
                        {view.id === 'canvas' && <Layers className="h-4 w-4" />}
                        {view.id === 'responsive' && (
                          <Smartphone className="h-4 w-4" />
                        )}
                        {view.id === 'tokens' && <Palette className="h-4 w-4" />}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-[#121316]">
                      {view.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4B4E54]">
                      {view.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#E4E2DC] bg-white px-4 py-3">
              <span className="text-xs text-[#4B4E54]">
                Want to rearrange blocks yourself?
              </span>
              <button
                type="button"
                onClick={() => onLoadTemplateInBuilder(selectedTemplate)}
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-[#1D4ED8] underline-offset-4 hover:underline"
              >
                <span>Open in live editor</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right: Dynamic Visual Inspector */}
          <motion.div
            key={`${activeView}-${selectedTemplate.id}-${tourAccentId}`}
            initial={{ opacity: 0.6, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-[#DFDDD6] bg-white p-6 sm:p-8 lg:col-span-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EEE9] pb-4">
              <div>
                <div className="font-mono text-[11px] font-medium text-[#1D4ED8]">
                  {currentView.number} {currentView.label}
                </div>
                <div className="mt-0.5 font-display text-base font-semibold text-[#121316]">
                  {selectedTemplate.name}
                </div>
              </div>

              {activeView === 'tokens' ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6B6E75]">Try accent:</span>
                  {ACCENT_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => setTourAccentId(palette.id)}
                      aria-label={`Apply ${palette.label} accent`}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition-transform ${
                        palette.id === tourAccentId
                          ? 'scale-110 border-[#121316] ring-2 ring-[#121316]/15'
                          : 'border-black/10 hover:scale-105'
                      }`}
                      style={{ backgroundColor: palette.hex }}
                    >
                      {palette.id === tourAccentId && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="font-mono text-[11px] text-[#6B6E75]">
                  {selectedTemplate.screenCount} · {selectedTemplate.layoutType}
                </span>
              )}
            </div>

            {/* Interactive View Canvas */}
            <div className="my-6 flex flex-1 items-center justify-center rounded-xl border border-[#E8E6E0] bg-[#FAF9F6] p-5 sm:p-6">
              {activeView === 'responsive' ? (
                <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:items-end">
                  {/* Mobile Frame */}
                  <div className="w-full max-w-[210px] rounded-[20px] border border-[#D8D5CD] bg-white p-3 shadow-xs">
                    <div className="mx-auto mb-2.5 h-1 w-8 rounded-full bg-[#E4E2DC]" />
                    <div className="text-[11px] font-semibold text-[#121316]">
                      {selectedTemplate.appTitle}
                    </div>
                    <div
                      className="mt-2 rounded-lg p-2"
                      style={{ backgroundColor: accent.softBg }}
                    >
                      <div
                        className="text-[11px] font-semibold"
                        style={{ color: accent.text }}
                      >
                        {summaryBlock?.title}
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {listBlock?.items?.slice(0, 2).map((item, i) => (
                        <div
                          key={i}
                          className="truncate rounded border border-[#F0EEE9] px-2 py-1.5 text-[10px] text-[#2E3035]"
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                    {actionBlock && (
                      <div
                        className="mt-2 rounded-md py-1.5 text-center text-[10px] font-medium text-white"
                        style={{ backgroundColor: accent.hex }}
                      >
                        {actionBlock.title}
                      </div>
                    )}
                  </div>

                  {/* Desktop Frame */}
                  <div className="hidden w-full max-w-[270px] rounded-xl border border-[#D8D5CD] bg-white p-3.5 shadow-xs sm:block">
                    <div className="mb-2 flex items-center justify-between border-b border-[#F0EEE9] pb-1.5">
                      <span className="font-mono text-[10px] text-[#6B6E75]">
                        Desktop · 1024px+
                      </span>
                      <span className="text-[10px] text-[#6B6E75]">
                        Auto grid
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#121316]">
                      {selectedTemplate.appTitle}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {listBlock?.items?.slice(0, 2).map((item, i) => (
                        <div
                          key={i}
                          className="rounded border border-[#F0EEE9] bg-[#FAF9F6] p-2 text-[10px]"
                        >
                          <div className="truncate font-medium text-[#121316]">
                            {item.label}
                          </div>
                          <div className="mt-0.5 text-[#6B6E75]">
                            {item.meta}
                          </div>
                        </div>
                      ))}
                    </div>
                    {actionBlock && (
                      <div
                        className="mt-2.5 w-fit rounded-md px-3 py-1 text-[10px] font-medium text-white"
                        style={{ backgroundColor: accent.hex }}
                      >
                        {actionBlock.title}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-sm rounded-xl border border-[#D8D5CD] bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#F0EEE9] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white"
                        style={{ backgroundColor: accent.hex }}
                      >
                        {selectedTemplate.appTitle.slice(0, 1)}
                      </span>
                      <span className="font-display text-sm font-semibold text-[#121316]">
                        {selectedTemplate.appTitle}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#6B6E75]">
                      {activeView === 'canvas' ? '16px gap' : accent.label}
                    </span>
                  </div>

                  {summaryBlock && (
                    <div
                      className={`mt-3 rounded-lg p-3 ${
                        activeView === 'canvas'
                          ? 'ring-1 ring-[#1D4ED8]/40 ring-offset-2'
                          : ''
                      }`}
                      style={{ backgroundColor: accent.softBg }}
                    >
                      <div
                        className="text-xs font-semibold"
                        style={{ color: accent.text }}
                      >
                        {summaryBlock.title}
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#2E3035]">
                        {summaryBlock.subtitle}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 space-y-1.5">
                    {listBlock?.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-[#E8E6E0] px-3 py-2 text-xs"
                      >
                        <span className="font-medium text-[#121316]">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-[#6B6E75]">
                          {item.meta}
                        </span>
                      </div>
                    ))}
                  </div>

                  {actionBlock && (
                    <div
                      className="mt-3 rounded-lg py-2 text-center text-xs font-medium text-white"
                      style={{ backgroundColor: accent.hex }}
                    >
                      {actionBlock.title}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B6E75]">
              <span>
                {activeView === 'canvas' &&
                  'Highlighted container shows automatic 16px block spacing.'}
                {activeView === 'responsive' &&
                  'Layouts reflow between mobile stacks and desktop grids automatically.'}
                {activeView === 'tokens' &&
                  'Select any color swatch above to test the live theme update.'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
