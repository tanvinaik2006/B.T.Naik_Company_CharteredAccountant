'use client';

import { useState } from 'react';
import { resources } from '@/data/resources';
import { FaFilePdf, FaFileWord, FaFileExcel, FaDownload, FaSearch } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (format: string) => {
    switch (format) {
      case 'PDF': return <FaFilePdf className="text-red-700 w-6 h-6" />;
      case 'DOCX': return <FaFileWord className="text-blue-700 w-6 h-6" />;
      case 'XLSX': return <FaFileExcel className="text-green-700 w-6 h-6" />;
      default: return <FaFilePdf className="text-slate-600 w-6 h-6" />;
    }
  };

  return (
    <div className="bg-bg-secondary min-h-screen py-16 route-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <ScrollReveal>
            <h1 className="text-4xl font-serif font-semibold text-navy-ink">Downloadable Resources</h1>
            <p className="mt-4 max-w-2xl text-base text-text-muted mx-auto">
              Access forms, checklists, and reference materials.
            </p>
          </ScrollReveal>
        </div>

        {/* Filters */}
        <ScrollReveal>
          <div className="bg-white rounded-[3px] border border-border-gray p-6 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-text-muted text-xs" />
              </div>
              <input
                type="text"
                aria-label="Search resources"
                placeholder="Search resources..."
                className="block w-full pl-9 pr-3 py-2 border border-border-gray rounded-[3px] text-xs bg-white placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-navy-primary focus:border-navy-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap justify-center md:justify-end w-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-[3px] text-xs font-semibold transition-colors btn-press ${
                    selectedCategory === category 
                      ? 'bg-navy-primary text-white border border-navy-primary' 
                      : 'bg-bg-secondary text-text-body border border-border-gray hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

          </div>
        </ScrollReveal>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <ScrollReveal key={resource.id} delay={index * 60}>
              <div className="card-ledger p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  {getIcon(resource.format)}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-semibold bg-bg-secondary border border-border-gray text-navy-ink uppercase tracking-wider">
                    {resource.category}
                  </span>
                </div>
                <h3 className="text-lg font-serif text-navy-ink mb-2">{resource.title}</h3>
                <p className="text-xs leading-relaxed text-text-body mb-6 flex-grow">{resource.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-gray">
                  <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider num-ledger">
                    {resource.format} • {resource.sizeMB} MB
                  </span>
                  <a 
                    href={resource.url} 
                    className="inline-flex items-center text-xs font-semibold text-navy-primary hover:text-navy-ink transition-colors link-draw btn-press"
                  >
                    <FaDownload className="mr-1" /> Download
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[3px] border border-border-gray text-xs text-text-muted">
            No resources found matching your search.
          </div>
        )}

      </div>
    </div>
  );
}
