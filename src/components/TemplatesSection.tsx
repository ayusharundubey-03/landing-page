import { ArrowUpRight, Check, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  ACCENT_PALETTES,
  APP_TEMPLATES,
  AppTemplate,
} from '../data/appforgeData';

interface TemplatesSectionProps {
  onPreviewTemplate: (template: AppTemplate) => void;
  onLoadInEditor: (template: AppTemplate) => void;
}

const CATEGORIES = ['All', 'Client Portals', 'Operations', 'Events'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export function TemplatesSection({
  onPreviewTemplate,
  onLoadInEditor,
}: TemplatesSectionProps) {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const filteredTemplates =
    filter === 'All'
      ? APP_TEMPLATES
      : APP_TEMPLATES.filter((t) => t.category === filter);

  return (
    <section
      id="templates"
      className="scroll-mt-16 border-t border-[#E4E2DC] bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#1D4ED8]">Templates</p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#121316] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Start from a working example, then make it yours.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4B4E54]">
              Preview any app idea below or open its layout directly in the AppForge builder.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter templates by category"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] p-1"
          >
            {CATEGORIES.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={active}
                  className={`min-h-[36px] whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 ${
                    active
                      ? 'bg-[#121316] text-white'
                      : 'text-[#4B4E54] hover:text-[#121316]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredTemplates.map((template, index) => {
            const accent =
              ACCENT_PALETTES.find((p) => p.id === template.accent) ??
              ACCENT_PALETTES[0];
            const listBlock = template.blocks.find(
              (b) => b.type === 'schedule' || b.type === 'checklist'
            );
            const actionBlock = template.blocks.find((b) => b.type === 'action');

            return (
              <motion.article
                key={template.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] transition-colors hover:border-[#C9C5BC]"
              >
                {/* Miniature App UI Preview */}
                <div className="border-b border-[#E4E2DC] bg-[#F3F2EE] p-5 sm:p-6">
                  <div className="mx-auto max-w-sm rounded-xl border border-[#DFDDD6] bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#F0EEE9] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-white"
                          style={{ backgroundColor: accent.hex }}
                        >
                          {template.appTitle.slice(0, 1)}
                        </span>
                        <span className="font-display text-xs font-semibold text-[#121316]">
                          {template.appTitle}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[#6B6E75]">
                        {template.screenCount}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {listBlock?.items?.slice(0, 2).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg border border-[#F0EEE9] bg-[#FAF9F6] px-2.5 py-2"
                        >
                          <span className="truncate text-xs font-medium text-[#121316]">
                            {item.label}
                          </span>
                          <span
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
                            style={{
                              backgroundColor: item.checked
                                ? accent.hex
                                : '#E4E2DC',
                            }}
                          >
                            {item.checked && (
                              <Check className="h-2.5 w-2.5 text-white" />
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    {actionBlock && (
                      <div
                        className="mt-3 rounded-lg py-1.5 text-center text-[11px] font-medium text-white"
                        style={{ backgroundColor: accent.hex }}
                      >
                        {actionBlock.title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Copy & Actions */}
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#6B6E75]">
                      <span>{template.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{template.screenCount}</span>
                      <span aria-hidden="true">·</span>
                      <span>{template.layoutType}</span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-[#121316]">
                      {template.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B4E54]">
                      {template.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onPreviewTemplate(template)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#121316] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#27292E]"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onLoadInEditor(template)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#D8D5CD] bg-white px-4 py-2 text-xs font-medium text-[#121316] transition-colors hover:bg-[#FAF9F6]"
                    >
                      <span>Open in builder</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#4B4E54]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
