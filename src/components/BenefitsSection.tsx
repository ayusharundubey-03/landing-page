import { motion } from 'motion/react';

export function BenefitsSection() {
  return (
    <section
      id="features"
      className="scroll-mt-16 border-t border-[#E4E2DC] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#1D4ED8]">Features</p>
          <h2
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#121316] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Built so non-technical makers can design with confidence.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4B4E54]">
            Clear visual controls keep your layouts structured and legible on every screen size.
          </p>
        </div>

        {/* Clean 2x2 Asymmetric Architectural Feature Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Feature 1: Visual editing */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-[#E4E2DC] bg-white p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <span className="font-mono text-xs font-medium text-[#1D4ED8]">
                01. Visual editing
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#121316]">
                Edit words, order, and layout directly on the canvas
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B4E54] sm:text-base">
                Click any heading, form field, or action button to adjust it in place. Blocks snap cleanly into position with zero code or manual CSS.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] p-4">
              <div className="flex items-center justify-between rounded-lg border-2 border-[#1D4ED8] bg-white px-3.5 py-2.5">
                <div>
                  <div className="text-xs font-semibold text-[#121316]">
                    Appointment banner
                  </div>
                  <div className="text-[11px] text-[#6B6E75]">
                    Editable title · Auto 16px spacing
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#1D4ED8]">
                  Selected
                </span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="rounded-md border border-[#E4E2DC] bg-white px-2.5 py-1.5 text-[11px] text-[#4B4E54]">
                  Heading text
                </div>
                <div className="rounded-md border border-[#E4E2DC] bg-white px-2.5 py-1.5 text-[11px] text-[#4B4E54]">
                  Block order
                </div>
                <div className="rounded-md border border-[#E4E2DC] bg-white px-2.5 py-1.5 text-[11px] text-[#4B4E54]">
                  Button label
                </div>
              </div>
            </div>
          </motion.article>

          {/* Feature 2: Reusable components */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-[#E4E2DC] bg-white p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <span className="font-mono text-xs font-medium text-[#1D4ED8]">
                02. Reusable components
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#121316]">
                Consistent building blocks across every screen
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B4E54] sm:text-base">
                Drop in tested headers, checklists, forms, and buttons. Change your accent color or corner style once and every block updates together.
              </p>
            </div>

            <div className="mt-6 space-y-2 rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] p-4">
              <div className="flex items-center justify-between rounded-lg border border-[#E4E2DC] bg-white px-3 py-2">
                <span className="text-xs font-medium text-[#121316]">
                  Primary Button
                </span>
                <span className="h-3.5 w-10 rounded bg-[#1D4ED8]" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#E4E2DC] bg-white px-3 py-2">
                <span className="text-xs font-medium text-[#121316]">
                  Checklist Row
                </span>
                <span className="h-3.5 w-3.5 rounded bg-[#1D4ED8]" />
              </div>
            </div>
          </motion.article>

          {/* Feature 3: Mobile-friendly layouts */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-[#E4E2DC] bg-white p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <span className="font-mono text-xs font-medium text-[#1D4ED8]">
                03. Mobile-friendly layouts
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#121316]">
                Sized for thumbs first, ready for desktop
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B4E54] sm:text-base">
                Every interface block maintains comfortable tap targets and readable type on phones while expanding cleanly on wider browser windows.
              </p>
            </div>

            <div className="mt-6 flex items-end gap-3 rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] p-4">
              <div className="w-20 rounded-lg border border-[#D8D5CD] bg-white p-2">
                <div className="mx-auto mb-1.5 h-0.5 w-5 rounded bg-[#D8D5CD]" />
                <div className="h-2.5 w-full rounded bg-[#1D4ED8]/20" />
                <div className="mt-1.5 h-2 w-4/5 rounded bg-[#E4E2DC]" />
                <div className="mt-2 h-4 w-full rounded bg-[#1D4ED8]" />
              </div>
              <div className="flex-1 rounded-lg border border-[#D8D5CD] bg-white p-2.5">
                <div className="flex items-center justify-between">
                  <div className="h-2.5 w-20 rounded bg-[#121316]/15" />
                  <div className="h-2.5 w-10 rounded bg-[#E4E2DC]" />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="h-6 rounded bg-[#F3F2EE]" />
                  <div className="h-6 rounded bg-[#F3F2EE]" />
                </div>
              </div>
            </div>
          </motion.article>

          {/* Feature 4: Live preview */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-[#E4E2DC] bg-white p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <span className="font-mono text-xs font-medium text-[#1D4ED8]">
                04. Live preview
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#121316]">
                Test real taps and inputs right beside your canvas
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B4E54] sm:text-base">
                Check off items, enter text, and verify confirmation screens in real time—so you know how your app feels before sharing it with anyone else.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] p-4">
              <div>
                <div className="text-xs font-semibold text-[#121316]">
                  Synchronized interactive preview
                </div>
                <div className="mt-0.5 text-xs text-[#6B6E75]">
                  Every canvas edit appears immediately in mobile and desktop views
                </div>
              </div>
              <span className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-medium text-[#1E40AF]">
                Live sync
              </span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
