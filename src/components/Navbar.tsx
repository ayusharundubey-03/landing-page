import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onOpenSignIn: () => void;
  onOpenStartBuilding: () => void;
}

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar({ onOpenSignIn }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E4E2DC] bg-[#F7F6F2]/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: AppForge Logo */}
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[#121316] transition-opacity duration-150 hover:opacity-80"
          aria-label="AppForge home"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
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
          <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">
            AppForge
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-[#4B4E54] underline-offset-4 transition-colors duration-150 hover:text-[#121316] hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Sign in Action */}
        <div className="hidden shrink-0 items-center md:flex">
          <button
            type="button"
            onClick={onOpenSignIn}
            className="shrink-0 whitespace-nowrap rounded-lg border border-[#D8D5CD] bg-white px-4 py-1.5 text-sm font-medium text-[#121316] transition-colors duration-150 hover:border-[#B8B4AA] hover:bg-[#FAF9F6]"
          >
            Sign in
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#121316] transition-colors hover:bg-[#ECEAE3] md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[#E4E2DC] bg-[#F7F6F2] px-4 py-4 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#2E3035] transition-colors hover:bg-[#ECEAE3]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 border-t border-[#E4E2DC] pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenSignIn();
              }}
              className="flex min-h-[44px] w-full items-center justify-center rounded-lg border border-[#D8D5CD] bg-white px-4 text-sm font-medium text-[#121316] transition-colors hover:bg-[#FAF9F6]"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
