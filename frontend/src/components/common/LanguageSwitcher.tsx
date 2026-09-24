import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  {
    code: 'te',
    label: 'తెలుగు',
    sublabel: 'Telugu',
    flag: '🇮🇳',
    color: '#2E6B39',
    greeting: 'నమస్కారం!'
  },
  {
    code: 'hi',
    label: 'हिंदी',
    sublabel: 'Hindi',
    flag: '🇮🇳',
    color: '#D69A2D',
    greeting: 'नमस्ते!'
  },
  {
    code: 'en',
    label: 'English',
    sublabel: 'English',
    flag: '🌐',
    color: '#33477A',
    greeting: 'Welcome!'
  }
];

interface LanguageSwitcherProps {
  /** If 'compact', shows only flag+code. If 'full', shows full dropdown panel. */
  variant?: 'compact' | 'full';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'full' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[2];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    // Persist choice so next time user opens the app it remembers
    localStorage.setItem('kisan_lang', code);
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-300 shadow-xs hover:border-[#2E6B39] text-xs font-semibold transition-all cursor-pointer"
          title="Change Language / భాష మార్చండి / भाषा बदलें"
        >
          <Globe className="w-3.5 h-3.5 text-[#2E6B39]" />
          <span className="text-[#1C2B19]">{currentLang.flag} {currentLang.label}</span>
          <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden min-w-[200px]">
              <div className="px-4 py-2.5 bg-[#F8F5EE] border-b border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">
                  Select Language / భాష ఎంచుకోండి
                </p>
              </div>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                    i18n.language === lang.code ? 'bg-[#EBF4ED]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <div>
                      <span className="font-bold text-sm text-[#1C2B19] block">{lang.label}</span>
                      <span className="text-[11px] text-gray-500">{lang.greeting}</span>
                    </div>
                  </div>
                  {i18n.language === lang.code && (
                    <Check className="w-4 h-4 text-[#2E6B39] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Full variant — 3 big pill buttons
  return (
    <div className="flex items-center gap-1 bg-[#F8F5EE] border border-gray-200 rounded-2xl p-1 shadow-xs">
      {LANGUAGES.map(lang => {
        const isActive = i18n.language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            title={lang.sublabel}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white shadow-sm text-[#1C2B19] scale-[1.04] border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            <span>{lang.flag}</span>
            <span style={{ color: isActive ? lang.color : undefined }}>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/**
 * FloatingLanguageSwitcher
 * A persistent floating button pinned to the bottom-left corner.
 * Always visible on every page so any user can switch at any time.
 */
export const FloatingLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[2];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('kisan_lang', code);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-5 z-50">
      {/* Language Options Panel (opens above button) */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full mb-3 left-0 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-52">
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#2E6B39] to-[#1C3B24] text-white">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold">భాష మార్చండి (Language)</span>
              </div>
            </div>
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors cursor-pointer border-b border-gray-100 last:border-0 ${
                  i18n.language === lang.code
                    ? 'bg-[#EBF4ED]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <span className="font-bold text-sm text-[#1C2B19] block">{lang.label}</span>
                    <span className="text-[11px] text-gray-500 italic">{lang.greeting}</span>
                  </div>
                </div>
                {i18n.language === lang.code && (
                  <Check className="w-4 h-4 text-[#2E6B39] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-[#2E6B39] shadow-xl hover:shadow-2xl text-xs font-bold text-[#1C2B19] transition-all active:scale-95 cursor-pointer"
        title="Change Language"
      >
        <Globe className="w-4 h-4 text-[#2E6B39]" />
        <span className="text-base">{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};
