import React, { useState, useRef, useEffect } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { Language } from '../../types';
import { INDIAN_LANGUAGES, LanguageMeta } from '../../i18n/translations';
import { Globe, Check, ChevronDown, Search } from 'lucide-react';

export const LanguageDropdown: React.FC = () => {
  const { currentLanguage, setCurrentLanguage } = useCareBridge();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeMeta = INDIAN_LANGUAGES.find(l => l.code === currentLanguage) || INDIAN_LANGUAGES[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredLanguages = INDIAN_LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLanguage = (code: Language) => {
    setCurrentLanguage(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button: Posh, clean, non-garish */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-white/90 hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-soft transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change interface & instruction language"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-stone-900">{activeMeta.nativeName}</span>
          <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">({activeMeta.name})</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-white border border-stone-200 shadow-modal z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
          role="menu"
        >
          {/* Header & Quick Search */}
          <div className="p-3 bg-[#FAF8F5] border-b border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Select Indian Language
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                11 Languages
              </span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language or state..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                autoFocus
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-64 overflow-y-auto py-1 divide-y divide-stone-100">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang: LanguageMeta) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition hover:bg-stone-50 ${
                      isSelected ? 'bg-emerald-50/70 text-emerald-950 font-semibold' : 'text-stone-700'
                    }`}
                    role="menuitem"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-stone-900 leading-none">
                          {lang.nativeName}
                        </span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          {lang.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {lang.region}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-stone-400">
                No matching languages found
              </div>
            )}
          </div>

          {/* Footer guidance */}
          <div className="p-2.5 bg-[#FAF8F5] border-t border-stone-200 text-center">
            <p className="text-[10px] text-stone-500">
              National Cancer Grid • Plain-language patient instructions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
