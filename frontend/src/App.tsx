import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/common/HeroSection';
import { FloatingLanguageSwitcher } from './components/common/LanguageSwitcher';

import { ArchitectureDiagramModal } from './components/common/ArchitectureDiagramModal';
import { FarmerPortal } from './components/farmer/FarmerPortal';
import { FPOPortal } from './components/fpo/FPOPortal';
import { BuyerPortal } from './components/buyer/BuyerPortal';
import { ConsumerPortal } from './components/consumer/ConsumerPortal';
import { LogisticsPortal } from './components/logistics/LogisticsPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { TrustTimelineModal } from './components/trust/TrustTimelineModal';
import { LoginModal, UserSession } from './components/auth/LoginModal';
import './i18n/i18n';

export function App() {
  const { t, i18n } = useTranslation();
  const [activeRole, setActiveRole] = useState<string>('farmer');
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [isTrustTimelineOpen, setIsTrustTimelineOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  // Active access-channel tab — drives real navigation
  const [activeChannel, setActiveChannel] = useState<string>('app');
  // When IVR tab is clicked we signal FarmerPortal to open the IVR modal
  const [triggerIvr, setTriggerIvr] = useState<number>(0);
  const [triggerVoice, setTriggerVoice] = useState<number>(0);
  // Default to false for a clean, user-friendly, instant-access dashboard
  const [showHero, setShowHero] = useState<boolean>(false);

  const handleLoginSuccess = (session: UserSession) => {
    setCurrentUser(session);
    if (session.role) {
      setActiveRole(session.role);
    }
    if (session.language && session.language !== i18n.language) {
      i18n.changeLanguage(session.language);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSelectStep = (step: number) => {
    setDemoStep(step);
    if (step === 1) setActiveRole('farmer');
    else if (step === 2 || step === 3) setActiveRole('admin');
    else if (step === 4) setActiveRole('logistics');
    else if (step === 5) setActiveRole('buyer');
    else if (step === 6) {
      setActiveRole('buyer');
      setIsTrustTimelineOpen(true);
    } else if (step === 7) {
      setActiveRole('farmer');
      setIsTrustTimelineOpen(true);
    }
  };

  /** Called by Navbar when user clicks a channel tab */
  const handleChannelChange = (channelId: string) => {
    setActiveChannel(channelId);
    if (channelId === 'app') {
      // Default farmer view
      setActiveRole('farmer');
    } else if (channelId === 'ivr') {
      // Switch to farmer role + open IVR modal
      setActiveRole('farmer');
      setTriggerIvr(prev => prev + 1); // increment to signal open
    } else if (channelId === 'fpo_ch') {
      // Switch directly to FPO portal
      setActiveRole('fpo');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1C2B19] flex flex-col font-sans pb-16 sm:pb-0">
      {/* Top Navbar */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        activeChannel={activeChannel}
        onChannelChange={handleChannelChange}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Brand Hero Section (Collapsible) */}
      {showHero && (
        <HeroSection
          onStartFarmer={() => {
            setActiveRole('farmer');
            setShowHero(false);
          }}
          onExploreMarket={() => {
            setActiveRole('consumer');
            setShowHero(false);
          }}
          onRoleSelect={(role) => {
            setActiveRole(role);
            setShowHero(false);
          }}
        />
      )}

      {/* Compact Informational Bar with Toggle */}
      <div className="bg-[#0b2414] text-white text-xs py-2 px-4 sm:px-6 flex items-center justify-between border-t border-b border-emerald-900/50 shadow-xs">
        <span className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse shrink-0" />
          <span className="font-semibold text-emerald-300 shrink-0">KisanConnect Live:</span>
          <span className="text-white/80 hidden md:inline italic truncate">
            "{t('info_bar')}"
          </span>
        </span>
        <button
          onClick={() => setShowHero(!showHero)}
          className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white transition font-medium cursor-pointer shrink-0 ml-2"
        >
          {showHero ? t('hide_banner') : t('about_btn')}
        </button>
      </div>

      {/* Main Workspace */}
      <main className="max-w-7xl w-full mx-auto px-4 py-5 flex-1">
        {activeRole === 'farmer' && (
          <FarmerPortal
            onOpenTrustTimeline={() => setIsTrustTimelineOpen(true)}
            triggerIvr={triggerIvr}
            triggerVoice={triggerVoice}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}

        {activeRole === 'fpo' && (
          <FPOPortal />
        )}

        {activeRole === 'buyer' && (
          <BuyerPortal onOpenTrustTimeline={() => setIsTrustTimelineOpen(true)} />
        )}

        {activeRole === 'consumer' && (
          <ConsumerPortal />
        )}

        {activeRole === 'logistics' && (
          <LogisticsPortal />
        )}

        {activeRole === 'admin' && (
          <AdminPortal />
        )}
      </main>

      {/* Floating Language Switcher — always visible on every screen */}
      <FloatingLanguageSwitcher />

      {/* Floating Voice Action Button (FAB) */}
      <div className="fixed bottom-20 sm:bottom-6 right-5 z-40">
        <button
          onClick={() => {
            setActiveRole('farmer');
            setTriggerVoice(prev => prev + 1);
          }}
          title={t('farmer.voice_title')}
          className="px-5 py-3.5 rounded-full bg-[#2E6B39] hover:bg-[#23532c] text-white shadow-xl hover:shadow-2xl flex items-center gap-2.5 font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 border-2 border-white/40 cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Mic className="w-5 h-5 text-white" />
          <span>{t('farmer.voice_btn')}</span>
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl px-2 py-1.5 flex items-center justify-around text-[10px] font-medium text-gray-600">
        <button
          onClick={() => setActiveRole('farmer')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors ${
            activeRole === 'farmer' ? 'text-[#2E6B39] font-bold bg-[#EBF4ED]' : ''
          }`}
        >
          <span className="text-base">🌾</span>
          <span>{t('nav.farmer_nav')}</span>
        </button>
        <button
          onClick={() => setActiveRole('consumer')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors ${
            activeRole === 'consumer' ? 'text-[#2E6B39] font-bold bg-[#EBF4ED]' : ''
          }`}
        >
          <span className="text-base">🥗</span>
          <span>{t('nav.shop_nav')}</span>
        </button>
        <button
          onClick={() => setActiveRole('fpo')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors ${
            activeRole === 'fpo' ? 'text-[#2E6B39] font-bold bg-[#EBF4ED]' : ''
          }`}
        >
          <span className="text-base">🏢</span>
          <span>{t('nav.fpo_nav')}</span>
        </button>
        <button
          onClick={() => setActiveRole('buyer')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors ${
            activeRole === 'buyer' ? 'text-[#2E6B39] font-bold bg-[#EBF4ED]' : ''
          }`}
        >
          <span className="text-base">🛒</span>
          <span>{t('nav.buyer_nav')}</span>
        </button>
        <button
          onClick={() => setActiveRole('logistics')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors ${
            activeRole === 'logistics' ? 'text-[#2E6B39] font-bold bg-[#EBF4ED]' : ''
          }`}
        >
          <span className="text-base">🚛</span>
          <span>{t('nav.logistics_nav')}</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-xs text-gray-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-serif font-bold text-[#2E6B39] text-sm">{t('app_name')}</span>
            <span className="mx-2">·</span>
            <span>{t('footer.tagline')}</span>
            <span className="mx-2">·</span>
            <span className="italic font-medium text-emerald-900">"{t('footer.slogan')}"</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsArchitectureOpen(true)}
              className="text-[#33477A] hover:underline font-medium"
            >
              {t('footer.view_arch')}
            </button>
            <span>·</span>
            <span>{t('footer.hackathon')}</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ArchitectureDiagramModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
        onJumpToStep={handleSelectStep}
      />

      <TrustTimelineModal
        isOpen={isTrustTimelineOpen}
        onClose={() => setIsTrustTimelineOpen(false)}
        onPayoutCompleted={() => {
          setActiveRole('farmer');
          setDemoStep(7);
        }}
      />

      {/* Farmer & User Phone + OTP Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
