'use client';

import Link from 'next/link';
import { services } from '@/data/services';
import { FaFileInvoiceDollar, FaBuilding, FaBalanceScale, FaGlobe } from 'react-icons/fa';
import { FaCalculator, FaFileSignature, FaChartLine, FaUsers } from 'react-icons/fa6';
import { ElementType } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Icon mapping helper
const getIconForService = (slug: string): ElementType => {
  switch (slug) {
    case 'auditing-and-assurance': return FaBalanceScale;
    case 'direct-tax': return FaFileInvoiceDollar;
    case 'indirect-tax-gst': return FaCalculator;
    case 'company-law-roc': return FaBuilding;
    case 'international-taxation': return FaGlobe;
    case 'nri-taxation': return FaUsers;
    case 'valuation-services': return FaChartLine;
    case 'accounts-outsourcing': return FaFileSignature;
    default: return FaBuilding;
  }
};

export default function Home() {
  return (
    <div className="flex flex-col route-transition">
      {/* 1. Header line draws left-to-right (150ms) */}
      <div className="draw-line w-full" />

      {/* Hero Section */}
      <section className="bg-navy-primary text-white py-24 lg:py-36 border-b border-navy-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* 2. Logo/firm name fades up (200ms, slightly delayed) */}
          <div className="fade-up-logo text-xs uppercase tracking-widest font-semibold text-slate-300 mb-4">
            B.T. Naik & Company
          </div>

          {/* 3. Hero heading reveals line-by-line with staggered upward slide */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight mb-8 text-neon-pastel">
            <span className="block line-reveal line-reveal-1">Trustworthy Counsel.</span>
            <span className="block line-reveal line-reveal-2 mt-2">Precise Audit.</span>
          </h1>

          <p className="line-reveal line-reveal-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Auditing, taxation, and compliance services for businesses and individuals across Maharashtra.
          </p>

          {/* 4. Supporting content fades in last */}
          <div className="fade-in-last flex justify-center space-x-4">
            <Link 
              href="/services/auditing-and-assurance" 
              className="bg-white text-navy-primary px-6 py-3 rounded-[3px] text-sm font-semibold hover:bg-slate-100 transition-colors btn-press border border-white"
            >
              Our Services
            </Link>
            <Link 
              href="/contact" 
              className="border border-white/30 text-white px-6 py-3 rounded-[3px] text-sm font-semibold hover:bg-white/10 transition-colors btn-press"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-serif text-navy-ink mb-6">Firm Overview</h2>
            <p className="text-base text-text-body max-w-3xl mx-auto leading-relaxed">
              B.T. Naik & Company assists organizations and individuals with auditing, direct and indirect taxation, corporate compliance, and advisory services. Our practice is grounded in professional ethics and regulatory precision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-bg-secondary border-t border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl font-serif text-navy-ink">Areas of Practice</h2>
            <p className="text-text-muted mt-2 text-sm">Services tailored to regulatory requirements</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = getIconForService(service.slug);
              return (
                <ScrollReveal key={service.slug} delay={index * 60}>
                  <div className="card-ledger p-6 h-full flex flex-col">
                    <div className="text-navy-primary mb-5 w-10 h-10 border border-border-gray rounded-[3px] flex items-center justify-center bg-white">
                      <Icon className="text-lg" />
                    </div>
                    <h3 className="text-lg font-serif text-navy-ink mb-3">{service.title}</h3>
                    <p className="text-text-body text-xs leading-relaxed mb-6 flex-grow">{service.shortDescription}</p>
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="text-xs font-semibold text-navy-primary hover:text-navy-ink flex items-center mt-auto link-draw self-start"
                    >
                      Read more <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
