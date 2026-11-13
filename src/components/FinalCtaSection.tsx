import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalCtaSectionProps {
  onStartBuilding: () => void;
}

export function FinalCtaSection({ onStartBuilding }: FinalCtaSectionProps) {
  return (
    <section className="border-t border-[#E4E2DC] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#DFDDD6] bg-white px-6 py-12 text-center sm:px-12 sm:py-16"
        >
          <h2
            className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight text-[#121316] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Put your app idea on screen today.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#4B4E54]">
            Choose a starting layout, arrange the interface blocks visually, and preview how your app feels on mobile and desktop.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartBuilding}
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-[#1D4ED8] px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-[#1E40AF] active:scale-[0.98]"
            >
              <span>Start building free</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href="#templates"
              className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-lg border border-[#D8D5CD] bg-[#FAF9F6] px-5 py-3 text-sm font-medium text-[#121316] transition-colors hover:bg-[#F2F1EC]"
            >
              Browse templates
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
