'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [servicesOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const linkColorClass = isScrolled
    ? 'text-slate-300 hover:text-white'
    : 'text-text-body hover:text-navy-primary';

  const authBtnClass = isScrolled
    ? 'border-white text-navy-primary bg-white hover:bg-slate-100'
    : 'border-navy-primary text-white bg-navy-primary hover:bg-navy-ink';

  const services = [
    { href: '/services/auditing-and-assurance', label: 'Auditing & Assurance' },
    { href: '/services/direct-tax', label: 'Direct Tax' },
    { href: '/services/indirect-tax-gst', label: 'Indirect Tax (GST)' },
    { href: '/services/company-law-roc', label: 'Company Law' },
    { href: '/services/international-taxation', label: 'International Taxation' },
    { href: '/services/nri-taxation', label: 'NRI Taxation' },
    { href: '/services/valuation-services', label: 'Valuation' },
    { href: '/services/accounts-outsourcing', label: 'Accounts Outsourcing' },
  ];

  return (
    <nav aria-label="Main navigation" className={`sticky top-0 z-50 transition-all duration-200 ease-ledger border-b ${
      isScrolled
        ? 'bg-navy-primary text-white border-navy-primary'
        : 'bg-white text-text-body border-border-gray'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className={`text-xl font-bold font-serif transition-colors duration-200 ${isScrolled ? 'text-white' : 'text-navy-ink'}`}>
                B.T. Naik & Company
              </span>
              <span className={`ml-2 text-[10px] font-semibold uppercase tracking-widest hidden md:block transition-colors duration-200 ${isScrolled ? 'text-slate-300' : 'text-text-muted'}`}>
                Chartered Accountants
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-6">
            <Link href="/about" className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors link-draw`}>
              About Us
            </Link>

            {/* Services dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                onKeyDown={(e) => { if (e.key === 'Escape') setServicesOpen(false); }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors inline-flex items-center`}
              >
                Services
                <svg className={`ml-1 h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-[3px] border border-border-gray bg-white shadow-lg">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors"
                        role="menuitem"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/resources" className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors link-draw`}>
              Resources
            </Link>
            <Link href="/rate-charts" className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors link-draw`}>
              Rate Charts
            </Link>
            <Link href="/faq" className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors link-draw`}>
              FAQ
            </Link>
            <Link href="/contact" className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors link-draw`}>
              Contact
            </Link>
            {user ? (
              <Link href="/portal/dashboard" className={`ml-4 inline-flex items-center justify-center px-4 py-2 border rounded-[3px] text-sm font-medium transition-all duration-200 btn-press ${authBtnClass}`}>Dashboard</Link>
            ) : (
              <Link href="/portal/login" className={`ml-4 inline-flex items-center justify-center px-4 py-2 border rounded-[3px] text-sm font-medium transition-all duration-200 btn-press ${authBtnClass}`}>Client Login</Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex items-center justify-center p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border-gray bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-text-body hover:text-navy-primary">About Us</Link>
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                className="flex items-center justify-between w-full py-2 text-sm font-medium text-text-body hover:text-navy-primary"
              >
                Services
                <svg className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 space-y-2 mt-1">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} onClick={() => { setMobileOpen(false); setServicesOpen(false); }} className="block py-1.5 text-sm text-text-muted hover:text-navy-primary">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/resources" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-text-body hover:text-navy-primary">Resources</Link>
            <Link href="/rate-charts" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-text-body hover:text-navy-primary">Rate Charts</Link>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-text-body hover:text-navy-primary">FAQ</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-text-body hover:text-navy-primary">Contact</Link>
            <div className="pt-2 border-t border-border-gray">
              {user ? (
                <Link href="/portal/dashboard" onClick={() => setMobileOpen(false)} className="block text-center py-2.5 text-sm font-semibold border border-navy-primary rounded-[3px] text-white bg-navy-primary">Dashboard</Link>
              ) : (
                <Link href="/portal/login" onClick={() => setMobileOpen(false)} className="block text-center py-2.5 text-sm font-semibold border border-navy-primary rounded-[3px] text-white bg-navy-primary">Client Login</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
