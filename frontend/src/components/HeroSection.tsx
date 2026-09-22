import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Leaf, 
  RefreshCw, 
  Smartphone, 
  PhoneForwarded, 
  Building2, 
  Mic, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface HeroSectionProps {
  currentLang: Language;
  onOpenFarmer: () => void;
  onOpenIVR: () => void;
  onOpenFPO: () => void;
  onOpenVoice: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onOpenFarmer,
  onOpenIVR,
  onOpenFPO,
  onOpenVoice
}) => {
  const t = translations[currentLang];

  return (
    <section className="hero-section">
      <div className="hero-grid">
        {/* Left Hero Main Banner */}
        <div className="hero-main-card">
          <div className="hero-header-area">
            <h1 className="hero-headline">
              <span className="text-gradient-primary">Empowering Farmers</span>
              <br />
              <span className="text-secondary-title">Connecting Markets</span>
            </h1>
            <p className="hero-description">
              {t.hero.subtitle}
            </p>

            {/* 4 Feature Badges */}
            <div className="hero-badges-row">
              <div className="hero-badge badge-farmer">
                <TrendingUp size={16} className="badge-icon" />
                <span>{t.hero.badge1}</span>
              </div>
              <div className="hero-badge badge-consumer">
                <ShoppingBag size={16} className="badge-icon" />
                <span>{t.hero.badge2}</span>
              </div>
              <div className="hero-badge badge-freshness">
                <Leaf size={16} className="badge-icon" />
                <span>{t.hero.badge3}</span>
              </div>
              <div className="hero-badge badge-sustainability">
                <RefreshCw size={16} className="badge-icon" />
                <span>{t.hero.badge4}</span>
              </div>
            </div>
          </div>

          {/* Hero Farmer Photo Frame */}
          <div className="hero-photo-wrapper" onClick={onOpenFarmer} title="Click to test Farmer Voice Listing">
            <img
              src="/farmer_hero.jpg"
              alt="Indian farmer with digital tablet in lush green agricultural field"
              className="hero-farmer-img"
            />
            <div className="hero-photo-overlay-gradient"></div>
            
            {/* Floating Tag */}
            <div className="photo-floating-pill animate-float">
              <span className="live-pulse-dot"></span>
              <Sparkles size={16} className="text-accent" />
              <span className="font-semibold">{t.hero.simpleAccess}</span>
            </div>

            {/* Tap instruction */}
            <div className="photo-action-hint">
              <span>🌾 Tap to try Farmer Voice Demo</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Right Hero Accessible Channels Card */}
        <div className="hero-channels-card">
          <div className="channels-card-header">
            <h3 className="channels-title">{t.hero.waysToUseTitle}</h3>
            <span className="channels-subtitle">{t.hero.waysToUseSubtitle}</span>
          </div>

          <div className="channels-list">
            {/* Channel 1: Mobile App */}
            <div 
              className="channel-item channel-mobile"
              onClick={onOpenFarmer}
              role="button"
              tabIndex={0}
            >
              <div className="channel-icon-box box-mobile">
                <Smartphone size={24} />
              </div>
              <div className="channel-info">
                <h4 className="channel-name">{t.hero.appTitle}</h4>
                <p className="channel-specs">
                  <span className="font-medium text-slate-800">(For Smartphone Users)</span>
                  <br />Simple UI · Local Language · Voice Support
                </p>
              </div>
              <ArrowRight size={16} className="channel-arrow" />
            </div>

            {/* Channel 2: Feature Phone / IVR */}
            <div 
              className="channel-item channel-ivr"
              onClick={onOpenIVR}
              role="button"
              tabIndex={0}
            >
              <div className="channel-icon-box box-ivr">
                <PhoneForwarded size={24} />
              </div>
              <div className="channel-info">
                <h4 className="channel-name">{t.hero.ivrTitle}</h4>
                <p className="channel-specs">
                  <span className="font-medium text-slate-800">(For Basic Phones)</span>
                  <br />Call & Sell · Check Prices · Listen in Local Language
                </p>
              </div>
              <ArrowRight size={16} className="channel-arrow" />
            </div>

            {/* Channel 3: FPO / Village Center */}
            <div 
              className="channel-item channel-fpo"
              onClick={onOpenFPO}
              role="button"
              tabIndex={0}
            >
              <div className="channel-icon-box box-fpo">
                <Building2 size={24} />
              </div>
              <div className="channel-info">
                <h4 className="channel-name">{t.hero.fpoTitle}</h4>
                <p className="channel-specs">
                  <span className="font-medium text-slate-800">(For No Phone / Low Literacy)</span>
                  <br />Assisted by Trained Staff · Bulk Registration
                </p>
              </div>
              <ArrowRight size={16} className="channel-arrow" />
            </div>

            {/* Channel 4: Voice / Chat */}
            <div 
              className="channel-item channel-voice"
              onClick={onOpenVoice}
              role="button"
              tabIndex={0}
            >
              <div className="channel-icon-box box-voice">
                <Mic size={24} />
              </div>
              <div className="channel-info">
                <h4 className="channel-name">{t.hero.voiceTitle}</h4>
                <p className="channel-specs">
                  <span className="font-medium text-slate-800">(Multilingual)</span>
                  <br />Speak in Your Language · Get Instant Help
                </p>
              </div>
              <ArrowRight size={16} className="channel-arrow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
