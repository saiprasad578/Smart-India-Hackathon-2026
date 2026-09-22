import React from 'react';
import { Sprout, ShieldAlert } from 'lucide-react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer className="footer-wrapper">
      <div className="footer-top-row">
        <div className="footer-brand-lockup">
          <div className="footer-sprout-badge">
            <Sprout size={24} className="text-primary" />
          </div>
          <span className="footer-brand-name">KisanConnect</span>
        </div>

        <div className="footer-divider-pipe">|</div>

        <div className="footer-pillars">
          <span>{t.footer.values}</span>
        </div>

        <div className="footer-tagline-quote">
          <span>“{t.footer.slogan}”</span>
        </div>
      </div>

      <div className="footer-bottom-row">
        <div className="synthetic-badge">
          <ShieldAlert size={14} />
          <span>{t.footer.syntheticNotice}</span>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} KisanConnect · Designed for Smart India Hackathon
        </div>
      </div>
    </footer>
  );
};
