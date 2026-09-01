'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

import { useState, useEffect } from 'react';


export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkColorClass = isScrolled 
    ? 'text-slate-300 hover:text-white' 
    : 'text-text-body hover:text-navy-primary';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ease-ledger border-b ${
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
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-6">
            <Link href="/about" className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors link-draw`}>
              About Us
            </Link>
            <div className="relative group">
              <button className={`${linkColorClass} px-1 py-2 text-sm font-medium transition-colors inline-flex items-center`}>
                Services
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={`absolute left-0 mt-2 w-56 rounded-[3px] border border-border-gray bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-ledger`}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link href="/services/auditing-and-assurance" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">Auditing & Assurance</Link>
                  <Link href="/services/direct-tax" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">Direct Tax</Link>
                  <Link href="/services/indirect-tax-gst" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">Indirect Tax (GST)</Link>
                  <Link href="/services/company-law-roc" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">Company Law</Link>
                  <Link href="/services/international-taxation" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">International Taxation</Link>
                  <Link href="/services/nri-taxation" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">NRI Taxation</Link>
                  <Link href="/services/valuation-services" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">Valuation</Link>
                  <Link href="/services/accounts-outsourcing" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary transition-colors">Accounts Outsourcing</Link>
                </div>
              </div>
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
              <Link href="/portal/dashboard" className={`ml-4 inline-flex items-center justify-center px-4 py-2 border rounded-[3px] text-sm font-medium transition-all duration-200 btn-press ${isScrolled ? 'border-white text-navy-primary bg-white hover:bg-slate-100' : 'border-navy-primary text-white bg-navy-primary hover:bg-navy-ink'}`}>Dashboard</Link>
            ) : (
              <Link href="/portal/login" className={`ml-4 inline-flex items-center justify-center px-4 py-2 border rounded-[3px] text-sm font-medium transition-all duration-200 btn-press ${isScrolled ? 'border-white text-navy-primary bg-white hover:bg-slate-100' : 'border-navy-primary text-white bg-navy-primary hover:bg-navy-ink'}`}>Client Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
function setIsScrolled(arg0: boolean) {
  throw new Error('Function not implemented.');
}

