import React, { useState } from 'react';
import { 
  ShoppingCart, 
  UserCheck, 
  BarChart3, 
  Share2, 
  Truck, 
  Store, 
  CreditCard, 
  Smile, 
  ChevronRight,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface HowItWorksProps {
  currentLang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: UserCheck,
      color: '#16A34A',
      bgColor: '#DCFCE7',
      details: "Farmers or FPO village agents submit crop details (Nashik Red Onion, Grade A, 500kg). Options include smartphone app, regional voice input, toll-free IVR, or local village resource center."
    },
    {
      num: 2,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: BarChart3,
      color: '#2563EB',
      bgColor: '#DBEAFE',
      details: "Our ML engine analyses 5-year historical Mandi prices (Agmarknet) and regional arrival volumes to forecast 7-day demand spreads and flag any unrealistic ask prices against the modal price band."
    },
    {
      num: 3,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: Share2,
      color: '#7C3AED',
      bgColor: '#EDE9FE',
      details: "Core differentiator: Partial Fulfilment. If a bulk buyer needs 2,000 kg, our matching algorithm splits and aggregates allocations across 5 verified local farmers (400kg each) ensuring 100% supply certainty."
    },
    {
      num: 4,
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: Truck,
      color: '#D97706',
      bgColor: '#FEF3C7',
      details: "Vehicle Routing Problem (VRP) solver calculates the optimal pickup sequence across clustered farms, reducing empty return trips and cutting logistics cost by 32% per kg."
    },
    {
      num: 5,
      title: t.howItWorks.step5Title,
      desc: t.howItWorks.step5Desc,
      icon: Store,
      color: '#0D9488',
      bgColor: '#CCFBF1',
      details: "Buyers and consumers track real-time dispatch with live geo-coordinates and harvest timestamps, giving full farm-to-table traceability."
    },
    {
      num: 6,
      title: t.howItWorks.step6Title,
      desc: t.howItWorks.step6Desc,
      icon: CreditCard,
      color: '#E11D48',
      bgColor: '#FFE4E6',
      details: "Payment is held in Escrow at order placement. Upon delivery OTP confirmation and quick photo grade check, split payments are automatically transferred into each farmer's bank account."
    },
    {
      num: 7,
      title: t.howItWorks.step7Title,
      desc: t.howItWorks.step7Desc,
      icon: Smile,
      color: '#16A34A',
      bgColor: '#DCFCE7',
      details: "Fair-price transparency: Farmers gain +28% higher net earnings, consumers save 18% over retail, and supply chain post-harvest waste drops below 4%."
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="section-title-wrap">
        <ShoppingCart className="section-title-icon" size={24} />
        <h2 className="section-heading">{t.howItWorks.title}</h2>
      </div>

      <div className="how-it-works-layout">
        {/* Main 7-step pipeline */}
        <div className="steps-flow-container">
          <div className="steps-cards-row">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <React.Fragment key={step.num}>
                  <div 
                    className={`step-card ${activeStep === step.num ? 'step-active' : ''}`}
                    onClick={() => setActiveStep(activeStep === step.num ? null : step.num)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="step-card-header">
                      <div className="step-badge" style={{ backgroundColor: step.color }}>
                        {step.num}
                      </div>
                      <div className="step-icon-circle" style={{ backgroundColor: step.bgColor, color: step.color }}>
                        <IconComp size={22} />
                      </div>
                    </div>
                    
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc-text">
                      {step.desc.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </p>
                    
                    <div className="step-inspect-pill">
                      <Info size={12} />
                      <span>Details</span>
                    </div>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="step-connector-arrow">
                      <ChevronRight size={20} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Expanded Step Inspector Details */}
          {activeStep !== null && (
            <div className="step-details-banner animate-fade-in">
              <div className="details-header">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-primary" />
                  <strong>Step {activeStep}: {steps[activeStep - 1].title}</strong>
                </div>
                <button onClick={() => setActiveStep(null)} className="details-close">
                  <X size={16} />
                </button>
              </div>
              <p className="details-body">
                {steps[activeStep - 1].details}
              </p>
            </div>
          )}
        </div>

        {/* Right Stats Card */}
        <div className="stats-showcase-card">
          <div className="stats-hero-banner">
            <img 
              src="/farm_landscape.jpg" 
              alt="Lush green Indian farmland" 
              className="stats-banner-img"
            />
            <div className="stats-overlay-tag">
              <span>{t.howItWorks.statsBadge}</span>
            </div>
          </div>

          <div className="stats-grid-2x2">
            <div className="stat-metric-cell">
              <span className="stat-number text-primary">1000+</span>
              <span className="stat-label">{t.howItWorks.statFarmers}</span>
            </div>
            <div className="stat-metric-cell">
              <span className="stat-number text-blue">50+</span>
              <span className="stat-label">{t.howItWorks.statBuyers}</span>
            </div>
            <div className="stat-metric-cell">
              <span className="stat-number text-teal">20+</span>
              <span className="stat-label">{t.howItWorks.statVehicles}</span>
            </div>
            <div className="stat-metric-cell">
              <span className="stat-number text-amber">5+</span>
              <span className="stat-label">{t.howItWorks.statDistricts}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
