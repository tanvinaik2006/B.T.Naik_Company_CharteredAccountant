'use client';

import { useState } from 'react';
import { FAQ } from '@/data/faqs';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

interface Props {
  faqs: FAQ[];
  categories: string[];
}

export default function FAQAccordion({ faqs, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasNumber = (str: string) => /\d/.test(str);

  const formatText = (text: string) => {
    // Basic formatting helper to scan for compliance numbers (e.g. section numbers)
    // and style them using num-ledger
    if (hasNumber(text)) {
      // Split text on digits to wrap them, or just apply it to the whole sentence if it's data-dense.
      // For general body text, applying font-mono to only individual words containing digits is cleaner.
      return text.split(' ').map((word, idx) => {
        if (hasNumber(word)) {
          return <span key={idx} className="num-ledger font-medium">{word} </span>;
        }
        return word + ' ';
      });
    }
    return text;
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-10 max-w-lg mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-text-muted text-xs" />
        </div>
        <input
          type="text"
          aria-label="Search FAQs"
          placeholder="Search for a topic (e.g., GST, ITR, ROC)..."
          className="block w-full pl-9 pr-3 py-2.5 border border-border-gray rounded-[3px] text-xs bg-white placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-navy-primary focus:border-navy-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Accordion Categories */}
      {categories.map((category) => {
        const categoryFaqs = filteredFaqs.filter((f) => f.category === category);
        if (categoryFaqs.length === 0) return null;

        return (
          <div key={category} className="mb-10 last:mb-0">
            <h3 className="text-lg font-serif font-semibold text-navy-ink mb-4 border-b border-border-gray pb-2">
              {category}
            </h3>
            <div className="space-y-3">
              {categoryFaqs.map((faq) => (
                <div key={faq.id} className="border border-border-gray rounded-[3px] bg-bg-secondary overflow-hidden transition-colors">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={openItems.has(faq.id)}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-1 focus:ring-navy-primary hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-xs font-semibold text-navy-ink leading-relaxed">
                      {formatText(faq.question)}
                    </span>
                    <FaChevronDown
                      className={`text-text-muted text-xs transform transition-transform duration-200 flex-shrink-0 ml-4 ${
                        openItems.has(faq.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItems.has(faq.id) && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      className="p-4 border-t border-border-gray bg-white transition-opacity duration-200"
                    >
                      <p className="text-xs text-text-body leading-relaxed">
                        {formatText(faq.answer)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {filteredFaqs.length === 0 && (
        <div className="text-center py-12 text-xs text-text-muted">
          No matching FAQs found for &quot;{searchQuery}&quot;. Please try a different term.
        </div>
      )}
    </div>
  );
}
