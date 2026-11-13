import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onStartBuilding: () => void;
}

export function HeroSection({ onStartBuilding }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-10 pb-8 sm:pt-14 sm:pb-10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1
            className="font-display text-[clamp(2.35rem,4.5vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-[#121316]"
            style={{ textWrap: 'balance' }}
          >
            Turn an idea into a polished app,{' '}
            <span className="italic font-medium text-[#1D4ED8]">
              without writing code.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#4B4E54] sm:text-[17px]">
            Design mobile-ready app screens visually, organize your layout with reusable blocks, and preview every tap before you share.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={onStartBuilding}
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-[#1D4ED8] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-[#1E40AF] active:scale-[0.98]"
            >
              <span>Start building free</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href="#product-tour"
              className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap px-2 py-2 text-sm font-medium text-[#2E3035] underline decoration-[#C9C5BC] underline-offset-4 transition-colors duration-150 hover:text-[#121316] hover:decoration-[#121316]"
            >
              <span>Explore the builder</span>
              <ArrowDownRight className="h-4 w-4 text-[#4B4E54]" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
