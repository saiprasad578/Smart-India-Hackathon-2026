import { useState } from 'react';
import './App.css';
import type { Language } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoleSelector } from './components/RoleSelector';
import { HowItWorks } from './components/HowItWorks';
import { SystemArchitecture } from './components/SystemArchitecture';
import { Footer } from './components/Footer';

// Modals
import { FarmerModal } from './components/modals/FarmerModal';
import { FPOModal } from './components/modals/FPOModal';
import { BuyerModal } from './components/modals/BuyerModal';
import { ConsumerModal } from './components/modals/ConsumerModal';
import { LogisticsModal } from './components/modals/LogisticsModal';
import { IVRModal } from './components/modals/IVRModal';
import { SMSModal } from './components/modals/SMSModal';
import { CenterModal } from './components/modals/CenterModal';
import { AuthModal } from './components/modals/AuthModal';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeNav, setActiveNav] = useState<string>('home');

  // Modal visibility states
  const [isFarmerOpen, setIsFarmerOpen] = useState(false);
  const [isFPOOpen, setIsFPOOpen] = useState(false);
  const [isBuyerOpen, setIsBuyerOpen] = useState(false);
  const [isConsumerOpen, setIsConsumerOpen] = useState(false);
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(false);
  const [isIVROpen, setIsIVROpen] = useState(false);
  const [isSMSOpen, setIsSMSOpen] = useState(false);
  const [isCenterOpen, setIsCenterOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login'
  });

  const handleRoleSelect = (role: 'farmer' | 'fpo' | 'buyer' | 'consumer' | 'logistics') => {
    if (role === 'farmer') setIsFarmerOpen(true);
    if (role === 'fpo') setIsFPOOpen(true);
    if (role === 'buyer') setIsBuyerOpen(true);
    if (role === 'consumer') setIsConsumerOpen(true);
    if (role === 'logistics') setIsLogisticsOpen(true);
  };

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (id === 'farmers') setIsFarmerOpen(true);
    else if (id === 'buyers') setIsBuyerOpen(true);
    else if (id === 'logistics') setIsLogisticsOpen(true);
    else if (id === 'market') setIsBuyerOpen(true);
    else if (id === 'support') setIsIVROpen(true);
    else if (id === 'about') {
      const el = document.querySelector('.architecture-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenIVR={() => setIsIVROpen(true)}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />

      {/* Main Content Sections */}
      <main className="main-content">
        {/* Hero Section */}
        <HeroSection
          currentLang={currentLang}
          onOpenFarmer={() => setIsFarmerOpen(true)}
          onOpenIVR={() => setIsIVROpen(true)}
          onOpenFPO={() => setIsFPOOpen(true)}
          onOpenVoice={() => setIsIVROpen(true)}
        />

        {/* Choose Your Role & Simple Options */}
        <RoleSelector
          currentLang={currentLang}
          onSelectRole={handleRoleSelect}
          onOpenIVR={() => setIsIVROpen(true)}
          onOpenSMS={() => setIsSMSOpen(true)}
          onOpenVoice={() => setIsIVROpen(true)}
          onOpenCenter={() => setIsCenterOpen(true)}
        />

        {/* How It Works End-to-End Flow & Stats */}
        <HowItWorks currentLang={currentLang} />

        {/* Cloud Platform System Architecture */}
        <SystemArchitecture currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Interactive Modals */}
      <FarmerModal
        isOpen={isFarmerOpen}
        onClose={() => setIsFarmerOpen(false)}
      />

      <FPOModal
        isOpen={isFPOOpen}
        onClose={() => setIsFPOOpen(false)}
      />

      <BuyerModal
        isOpen={isBuyerOpen}
        onClose={() => setIsBuyerOpen(false)}
      />

      <ConsumerModal
        isOpen={isConsumerOpen}
        onClose={() => setIsConsumerOpen(false)}
      />

      <LogisticsModal
        isOpen={isLogisticsOpen}
        onClose={() => setIsLogisticsOpen(false)}
      />

      <IVRModal
        isOpen={isIVROpen}
        onClose={() => setIsIVROpen(false)}
      />

      <SMSModal
        isOpen={isSMSOpen}
        onClose={() => setIsSMSOpen(false)}
      />

      <CenterModal
        isOpen={isCenterOpen}
        onClose={() => setIsCenterOpen(false)}
      />

      <AuthModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ open: false, mode: 'login' })}
        initialMode={authModal.mode}
      />
    </div>
  );
}

export default App;
