import { motion } from 'motion/react';

export function SocialProofSection() {
  return (
    <section
      aria-label="Creator statement"
      className="border-y border-[#E5E7EB] bg-white py-14 sm:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <blockquote className="font-display text-xl font-medium leading-snug tracking-tight text-[#111318] sm:text-2xl">
          “Most everyday tools—like booking portals, checklists, and event guides—should take an afternoon to put together, not months of engineering.”
        </blockquote>
        <p className="mt-4 text-sm text-[#6B7280]">
          Why we built AppForge — a calmer way for creators and small teams to build practical apps
        </p>
      </motion.div>
    </section>
  );
}
