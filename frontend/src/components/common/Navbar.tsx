import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, LogIn, UserCheck, LogOut } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { KisanLogo } from './KisanLogo';
import { UserSession } from '../auth/LoginModal';

interface NavbarProps {
  activeRole: string;
  setActiveRole: (role: string) => void;
  onOpenArchitecture: () => void;
  activeChannel: string;
  onChannelChange: (channelId: string) => void;
  currentUser?: UserSession | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  setActiveRole,
  onOpenArchitecture,
  activeChannel,
  onChannelChange,
  currentUser,
  onOpenLogin,
  onLogout
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const roles = [
    { id: 'farmer',    label: t('roles.farmer') },
    { id: 'consumer',  label: t('roles.consumer') },
    { id: 'fpo',       label: t('roles.fpo') },
    { id: 'buyer',     label: t('roles.buyer') },
    { id: 'logistics', label: t('roles.logistics') },
    { id: 'admin',     label: t('roles.admin') },
  ];

  return (
    <header className="bg-white border-b border-[#22301d]/15 sticky top-0 z-40 shadow-xs">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo & Slogan */}
        <div className="flex items-center gap-3">
          <KisanLogo size="md" variant="compact" />
          <div className="hidden lg:block pl-3 border-l border-gray-200">
            <p className="text-xs text-[#2e6b39] font-medium italic">
              "{t('nav.slogan')}"
            </p>
          </div>
        </div>

        {/* Right Help & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toll-Free IVR Hotline */}
          <button
            onClick={() => onChannelChange('ivr')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7EE] border border-[#D69A2D]/40 text-black hover:bg-[#F6EEDB] text-xs font-bold transition-all shadow-2xs cursor-pointer"
            title="Toll-Free Phone Call for Keypad Phones"
          >
            <Phone className="w-3.5 h-3.5 text-[#D69A2D]" />
            <span>{t('nav.hotline')}</span>
          </button>

          {/* User Auth Status / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-[#EBF4ED] border border-[#2E6B39]/30 rounded-xl px-2.5 py-1 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-[#2E6B39]" />
              <div className="hidden md:block text-left">
                <span className="font-bold text-[#1C2B19] block leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-gray-500 font-mono">{currentUser.phone}</span>
              </div>
              <button
                onClick={onLogout}
                className="ml-1 p-1 text-gray-500 hover:text-red-600 rounded-lg hover:bg-white transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2E6B39] text-white hover:bg-[#23532c] text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              title="Login with Mobile Number & OTP"
            >
              <LogIn className="w-3.5 h-3.5 text-[#D69A2D]" />
              <span>
                {currentLang === 'te' ? 'లాగిన్ (OTP)' : currentLang === 'hi' ? 'लॉगिन (OTP)' : 'Login (OTP)'}
              </span>
            </button>
          )}

          {/* Global Language Switcher */}
          <LanguageSwitcher variant="full" />
        </div>
      </div>

      {/* Role Navigation Bar (High Contrast, Large Touch Targets) */}
      <div className="bg-[#FAF8F3] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto py-1.5 scrollbar-none">
          {roles.map((r) => {
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#2E6B39] text-white font-bold shadow-sm scale-[1.02]'
                    : 'text-gray-700 hover:bg-gray-200/80 font-semibold'
                }`}
              >
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
