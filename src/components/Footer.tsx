import { InfoModalTopic } from '../data/appforgeData';

interface FooterProps {
  onOpenInfo: (topic: InfoModalTopic) => void;
  onStartBuilding: () => void;
}

export function Footer({ onOpenInfo, onStartBuilding }: FooterProps) {
  return (
    <footer className="border-t border-[#E4E2DC] bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-[#121316]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" fill="#121316" />
                <rect x="6.5" y="6.5" width="5" height="11" rx="1.2" fill="#F7F6F2" />
                <rect x="13" y="6.5" width="4.5" height="5" rx="1.2" fill="#3B82F6" />
                <rect
                  x="13"
                  y="13"
                  width="4.5"
                  height="4.5"
                  rx="1.2"
                  fill="#F7F6F2"
                  fillOpacity="0.85"
                />
              </svg>
              <span className="font-display text-base font-semibold tracking-tight">
                AppForge
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6B6E75]">
              A mobile-friendly visual builder for creating clean interfaces and practical apps without writing code.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#121316]">Product</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#4B4E54]">
              <li>
                <a href="#product" className="transition-colors hover:text-[#121316]">
                  Visual editor
                </a>
              </li>
              <li>
                <a href="#from-idea-to-app" className="transition-colors hover:text-[#121316]">
                  From idea to app
                </a>
              </li>
              <li>
                <a href="#templates" className="transition-colors hover:text-[#121316]">
                  Templates
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-[#121316]">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#121316]">Help</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#4B4E54]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('help')}
                  className="text-left transition-colors hover:text-[#121316]"
                >
                  Getting started
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('help')}
                  className="text-left transition-colors hover:text-[#121316]"
                >
                  Common questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onStartBuilding}
                  className="text-left transition-colors hover:text-[#121316]"
                >
                  Create an app
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#121316]">
              Company & Privacy
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#4B4E54]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('company')}
                  className="text-left transition-colors hover:text-[#121316]"
                >
                  About AppForge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('privacy')}
                  className="text-left transition-colors hover:text-[#121316]"
                >
                  Privacy policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('privacy')}
                  className="text-left transition-colors hover:text-[#121316]"
                >
                  Terms of use
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#E4E2DC] pt-6 text-xs text-[#6B6E75] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AppForge. All rights reserved.</p>
          <p>Built for clear, code-free app creation.</p>
        </div>
      </div>
    </footer>
  );
}
