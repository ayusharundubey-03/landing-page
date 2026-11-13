import { motion } from 'motion/react';

const IDEA_TO_APP_STEPS = [
  {
    number: '01.',
    title: 'Choose a starting point',
    description:
      'Begin with a ready-made layout like a client booking portal or checklist, or start from a clean blank screen.',
  },
  {
    number: '02.',
    title: 'Customize visually',
    description:
      'Add or reorder blocks from the component panel, rewrite any label, and choose an accent color that fits.',
  },
  {
    number: '03.',
    title: 'Preview your app',
    description:
      'Switch between mobile and desktop previews to test every tap and form field before sharing your link.',
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="from-idea-to-app"
      className="scroll-mt-16 border-t border-[#E4E2DC] bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-[#1D4ED8]">From idea to app</p>
          <h2
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#121316] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Three straightforward steps from first draft to live screen.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-[#E4E2DC] border-y border-[#E4E2DC] md:grid-cols-3 md:divide-x md:divide-y-0">
          {IDEA_TO_APP_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-8 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <span className="font-mono text-xs font-medium text-[#1D4ED8]">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#121316]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#4B4E54] sm:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
