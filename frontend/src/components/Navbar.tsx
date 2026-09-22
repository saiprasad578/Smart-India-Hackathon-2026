import React, { useState } from 'react';
import { Sprout, PhoneCall, Globe, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';
import type { Language } from '../i18n/translations';
import { LANGUAGES, translations } from '../i18n/translations';

interface NavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenIVR: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  activeNav: string;
  onNavClick: (item: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  onOpenIVR,
  onOpenAuth,
  activeNav,
  onNavClick
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => onNavClick('home')}>
          <div className="logo-icon-wrap">
            <Sprout className="logo-sprout-icon" size={28} />
          </div>
          <div className="brand-text">
            <div className="brand-name">
              Kisan<span className="brand-accent">Connect</span>
            </div>
            <div className="brand-tagline">{t.tagline}</div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop">
          {[
            { id: 'home', label: t.nav.home },
            { id: 'market', label: t.nav.market },
            { id: 'farmers', label: t.nav.forFarmers },
            { id: 'buyers', label: t.nav.forBuyers },
            { id: 'logistics', label: t.nav.logistics },
            { id: 'support', label: t.nav.support },
            { id: 'about', label: t.nav.about }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`nav-link-btn ${activeNav === item.id ? 'active' : ''}`}
            >
              {item.label}
              {activeNav === item.id && <span className="active-pill" />}
            </button>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="nav-actions">
          {/* Language Selector Dropdown */}
          <div className="lang-selector-relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="lang-selector-btn"
              title="Select Language"
            >
              <Globe size={18} className="text-primary" />
              <span className="lang-code-label">{currentLangObj.label}</span>
              <ChevronDown size={14} className={`chevron-icon ${langDropdownOpen ? 'rotate' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="lang-menu-dropdown animate-fade-in">
                <div className="lang-menu-header">Select Language / భాష</div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`lang-menu-item ${currentLang === lang.code ? 'selected' : ''}`}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <div className="lang-name-col">
                      <span className="lang-native">{lang.nativeLabel}</span>
                      <span className="lang-en">({lang.label})</span>
                    </div>
                    {currentLang === lang.code && <ShieldCheck size={16} className="text-primary ml-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toll-free IVR Support Button */}
          <button
            onClick={onOpenIVR}
            className="ivr-helpline-badge"
            title="Click to open interactive IVR dialer"
          >
            <div className="phone-pulse-icon">
              <PhoneCall size={16} />
            </div>
            <div className="ivr-text-stack">
              <span className="ivr-phone-number">1800 123 4567</span>
              <span className="ivr-subtext">(IVR / Call Support)</span>
            </div>
          </button>

          {/* Auth Buttons */}
          <div className="auth-buttons-group">
            <button
              onClick={() => onOpenAuth('login')}
              className="btn-login-outline"
            >
              {t.nav.login}
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="btn-signup-primary"
            >
              {t.nav.signup}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer animate-fade-in">
          <div className="mobile-links-grid">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'market', label: t.nav.market },
              { id: 'farmers', label: t.nav.forFarmers },
              { id: 'buyers', label: t.nav.forBuyers },
              { id: 'logistics', label: t.nav.logistics },
              { id: 'support', label: t.nav.support },
              { id: 'about', label: t.nav.about }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`mobile-link-item ${activeNav === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mobile-drawer-footer">
            <button onClick={() => { onOpenIVR(); setMobileMenuOpen(false); }} className="mobile-ivr-btn">
              <PhoneCall size={18} /> Call 1800 123 4567
            </button>
            <div className="mobile-auth-row">
              <button onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }} className="btn-login-outline w-full">
                {t.nav.login}
              </button>
              <button onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }} className="btn-signup-primary w-full">
                {t.nav.signup}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
