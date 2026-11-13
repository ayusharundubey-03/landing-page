import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PRICING_PLANS } from '../data/appforgeData';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  return (
    <section
      id="pricing"
      className="scroll-mt-16 border-t border-[#E4E2DC] bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <p className="text-sm font-medium text-[#1D4ED8]">Pricing</p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#121316] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Start free, upgrade only when you publish on your own domain.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Billing interval"
            className="flex w-fit items-center gap-1 rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] p-1"
          >
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              aria-pressed={billing === 'monthly'}
              className={`min-h-[36px] whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                billing === 'monthly'
                  ? 'bg-white text-[#121316] shadow-xs'
                  : 'text-[#4B4E54] hover:text-[#121316]'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling('annual')}
              aria-pressed={billing === 'annual'}
              className={`min-h-[36px] whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                billing === 'annual'
                  ? 'bg-white text-[#121316] shadow-xs'
                  : 'text-[#4B4E54] hover:text-[#121316]'
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRICING_PLANS.map((plan, idx) => {
            const price =
              billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col justify-between rounded-xl border p-6 sm:p-8 ${
                  plan.featured
                    ? 'border-[#1D4ED8]/40 bg-[#F8FAFF]'
                    : 'border-[#E4E2DC] bg-[#FAF9F6]'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-[#121316]">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 font-display">
                      <span className="text-3xl font-semibold tabular-nums text-[#121316]">
                        {price}
                      </span>
                      <span className="text-xs text-[#6B6E75]">/ month</span>
                    </div>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#4B4E54]">
                    {plan.summary}
                  </p>
                  <p className="mt-1 text-xs text-[#6B6E75]">
                    {plan.cadenceNote}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-[#E4E2DC] pt-5">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-[#2E3035]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.id)}
                  className={`mt-8 min-h-[44px] w-full whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                    plan.featured
                      ? 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                      : 'border border-[#D8D5CD] bg-white text-[#121316] hover:bg-[#F7F6F2]'
                  }`}
                >
                  {plan.ctaLabel}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
