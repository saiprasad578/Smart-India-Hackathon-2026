import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  User, 
  RefreshCw,
  MapPin,
  Building2,
  Truck,
  Sprout,
  Briefcase,
  UserPlus,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { api } from '../../api/client';

export interface UserSession {
  user_id: string;
  phone: string;
  name: string;
  role: string;
  language: string;
  token: string;
  village?: string;
  crop?: string;
  land_size?: string;
  business_name?: string;
  vehicle_type?: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // Mode: 'quick' (Demo profiles + quick number) vs 'custom' (Enter Name, Role, Location, etc.)
  const [mode, setMode] = useState<'quick' | 'custom'>('custom');
  
  // Multi-step: phone/details -> otp -> success
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  
  // Custom Profile Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('9876543210');
  const [role, setRole] = useState<'farmer' | 'fpo' | 'buyer' | 'logistics' | 'consumer'>('farmer');
  const [village, setVillage] = useState('Shamshabad, Rangareddy');
  const [crop, setCrop] = useState('Tomato');
  const [landSize, setLandSize] = useState('2.5 Acres');
  const [businessName, setBusinessName] = useState('FreshBasket Wholesale Mandi');
  const [vehicleType, setVehicleType] = useState('Tata Ace 1.5-Ton Mini Truck');

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [smsBanner, setSmsBanner] = useState<string | null>(null);
  const [verifiedUser, setVerifiedUser] = useState<UserSession | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const demoAccounts = [
    { 
      phone: '9876543210', 
      name: 'Farmer Venkataiah', 
      village: 'Shamshabad, TS', 
      role: 'farmer' as const, 
      emoji: '🌾',
      crop: 'Tomato',
      landSize: '3 Acres'
    },
    { 
      phone: '9876543211', 
      name: 'Farmer Ramulu', 
      village: 'Chevella, TS', 
      role: 'farmer' as const, 
      emoji: '🌾',
      crop: 'Chilli',
      landSize: '2 Acres'
    },
    { 
      phone: '9876543220', 
      name: 'Agent Ramesh (FPO)', 
      village: 'Shamshabad FPO', 
      role: 'fpo' as const, 
      emoji: '🏢',
      businessName: 'Shamshabad Farmers Producer Org'
    },
    { 
      phone: '9876543230', 
      name: 'Siddharth (Buyer)', 
      village: 'Kothapet Wholesale, Hyd', 
      role: 'buyer' as const, 
      emoji: '🛒',
      businessName: 'FreshBasket Wholesale Ltd'
    },
    { 
      phone: '9876543250', 
      name: 'Ravi Kumar (Transporter)', 
      village: 'Hyderabad Logistics Hub', 
      role: 'logistics' as const, 
      emoji: '🚛',
      vehicleType: 'E-Truck 2.5-Ton'
    }
  ];

  const handleSelectDemoProfile = (acc: typeof demoAccounts[0]) => {
    setPhone(acc.phone);
    setName(acc.name);
    setRole(acc.role);
    setVillage(acc.village);
    if (acc.crop) setCrop(acc.crop);
    if (acc.landSize) setLandSize(acc.landSize);
    if (acc.businessName) setBusinessName(acc.businessName);
    if (acc.vehicleType) setVehicleType(acc.vehicleType);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    // Validate phone
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg(
        currentLang === 'te' 
          ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి' 
          : currentLang === 'hi' 
          ? 'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें' 
          : 'Please enter a valid 10-digit mobile number'
      );
      return;
    }

    // Validate name in custom mode
    const effectiveName = mode === 'custom' 
      ? (name.trim() || (currentLang === 'te' ? 'రైతు మిత్రుడు' : currentLang === 'hi' ? 'किसान मित्र' : 'Farmer Friend'))
      : (name.trim() || 'Farmer Venkataiah');

    setIsLoading(true);

    try {
      const res = await api.requestOtp(
        phone, 
        role, 
        currentLang, 
        effectiveName, 
        village, 
        crop, 
        landSize
      );
      setIsLoading(false);
      setStep('otp');
      const genOtp = res.otp || '123456';
      setSmsBanner(`📩 SMS from KISAN-CONNECT: Hello ${effectiveName}! Your login OTP is ${genOtp}. Valid for 5 mins.`);
      setOtp(genOtp);
    } catch {
      setIsLoading(false);
      setStep('otp');
      setSmsBanner(`📩 SMS from KISAN-CONNECT: Hello ${effectiveName}! Your login OTP is 123456.`);
      setOtp('123456');
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otp || otp.length < 4) {
      setErrorMsg(
        currentLang === 'te' 
          ? 'దయచేసి సరైన OTP కోడ్ నమోదు చేయండి' 
          : currentLang === 'hi' 
          ? 'कृपया सही OTP कोड दर्ज करें' 
          : 'Please enter valid OTP code'
      );
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    const effectiveName = name.trim() || (role === 'farmer' ? 'Farmer Venkataiah' : 'Kisan User');

    try {
      const res = await api.verifyOtp(phone, otp, effectiveName, village, role);
      setIsLoading(false);

      const session: UserSession = {
        user_id: res.user_id || `user-${phone.slice(-4)}`,
        phone,
        name: res.name || effectiveName,
        role: res.role || role,
        language: res.language || currentLang,
        token: res.access_token || 'mock-jwt-token',
        village: village || 'Shamshabad Village, TS',
        crop: role === 'farmer' ? crop : undefined,
        land_size: role === 'farmer' ? landSize : undefined,
        business_name: role === 'buyer' ? businessName : undefined,
        vehicle_type: role === 'logistics' ? vehicleType : undefined
      };

      setVerifiedUser(session);
      setStep('success');

      setTimeout(() => {
        onLoginSuccess(session);
        onClose();
        // Reset state
        setStep('input');
        setSmsBanner(null);
      }, 1300);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err?.message || 'Invalid OTP code');
    }
  };

  const roleOptions = [
    { 
      id: 'farmer' as const, 
      label: currentLang === 'te' ? 'రైతు (Farmer)' : currentLang === 'hi' ? 'किसान (Farmer)' : 'Farmer (Sell)',
      desc: currentLang === 'te' ? 'పంట అమ్మకం' : currentLang === 'hi' ? 'फसल बिक्री' : 'Sell produce',
      emoji: '🌾' 
    },
    { 
      id: 'fpo' as const, 
      label: currentLang === 'te' ? 'ఎఫ్.పి.ఓ (FPO)' : currentLang === 'hi' ? 'एफपीओ (FPO)' : 'FPO Agent',
      desc: currentLang === 'te' ? 'రైతుల సంఘం' : currentLang === 'hi' ? 'किसान संघ' : 'Cluster manager',
      emoji: '🏢' 
    },
    { 
      id: 'buyer' as const, 
      label: currentLang === 'te' ? 'కొనుగోలుదారు (Buyer)' : currentLang === 'hi' ? 'खरीदार (Buyer)' : 'Wholesale Buyer',
      desc: currentLang === 'te' ? 'బల్క్ కొనుగోలు' : currentLang === 'hi' ? 'थोक खरीद' : 'Bulk procurement',
      emoji: '🛒' 
    },
    { 
      id: 'logistics' as const, 
      label: currentLang === 'te' ? 'రవాణా (Transport)' : currentLang === 'hi' ? 'ट्रांसपोर्ट (Logistics)' : 'Logistics Driver',
      desc: currentLang === 'te' ? 'వాహనం / డెలివరీ' : currentLang === 'hi' ? 'वाहन / डिलीवरी' : 'Pickup & delivery',
      emoji: '🚛' 
    },
    { 
      id: 'consumer' as const, 
      label: currentLang === 'te' ? 'వినియోగదారు (Consumer)' : currentLang === 'hi' ? 'उपभोक्ता (Consumer)' : 'Consumer / Household',
      desc: currentLang === 'te' ? 'తాజా కూరగాయలు' : currentLang === 'hi' ? 'ताजी सब्जियां' : 'Fresh direct shop',
      emoji: '🥗' 
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7EE] text-[#1C2B19] rounded-3xl max-w-lg w-full border border-[#2E6B39]/20 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Animated SMS Banner Simulation */}
        {smsBanner && (
          <div className="bg-[#1C2B19] text-[#4DF07C] px-4 py-2.5 text-xs font-mono flex items-center justify-between border-b border-emerald-800 animate-in slide-in-from-top duration-300 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <MessageSquare className="w-4 h-4 text-[#D69A2D] shrink-0 animate-bounce" />
              <span className="truncate">{smsBanner}</span>
            </div>
            <button 
              onClick={() => setSmsBanner(null)} 
              className="text-gray-400 hover:text-white ml-2 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2E6B39] to-[#1C3B24] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-[#D69A2D]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl leading-tight">
                {currentLang === 'te' ? 'కిసాన్ లాగిన్ & నమోదు' : currentLang === 'hi' ? 'किसान लॉगिन व पंजीकरण' : 'Kisan Login & Registration'}
              </h2>
              <p className="text-[11px] text-white/80">
                {currentLang === 'te' ? 'సులభమైన OTP ధృవీకరణ · పాస్‌వర్డ్ అవసరం లేదు' : currentLang === 'hi' ? 'आसान OTP सत्यापन · पासवर्ड की आवश्यकता नहीं' : 'Phone + OTP Verification · Zero Passwords'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Quick-Selector Bar */}
        <div className="bg-[#EBF4ED] px-4 sm:px-5 py-2 border-b border-[#2E6B39]/15 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-bold text-[#2E6B39] uppercase tracking-wider">
            {currentLang === 'te' ? 'భాషను ఎంచుకోండి:' : currentLang === 'hi' ? 'भाषा चुनें:' : 'Select Language:'}
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'te', label: 'తెలుగు' },
              { id: 'hi', label: 'हिंदी' },
              { id: 'en', label: 'English' }
            ].map(l => (
              <button
                key={l.id}
                type="button"
                onClick={() => handleLanguageChange(l.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentLang === l.id 
                    ? 'bg-[#2E6B39] text-white shadow-xs' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector Tabs (Quick Demo vs Custom Details) */}
        {step === 'input' && (
          <div className="grid grid-cols-2 p-1.5 bg-[#F0EBE0] border-b border-gray-200 shrink-0">
            <button
              type="button"
              onClick={() => setMode('custom')}
              className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                mode === 'custom'
                  ? 'bg-white text-[#2E6B39] shadow-sm border border-[#2E6B39]/20'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-[#2E6B39]" />
              <span>
                {currentLang === 'te' ? '📝 నా వివరాలు నమోదు' : currentLang === 'hi' ? '📝 नया विवरण भरें' : '📝 Enter Custom Details'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMode('quick')}
              className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                mode === 'quick'
                  ? 'bg-white text-[#2E6B39] shadow-sm border border-[#2E6B39]/20'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#D69A2D]" />
              <span>
                {currentLang === 'te' ? '⚡ త్వరిత డెమో ఖాతాలు' : currentLang === 'hi' ? '⚡ त्वरित डेमो प्रोफाइल' : '⚡ 1-Click Demo Profiles'}
              </span>
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ================= STEP 1: INPUT DETAILS ================= */}
          {step === 'input' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              
              {/* TAB A: CUSTOM USER DETAILS FORM */}
              {mode === 'custom' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  
                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#2E6B39]" />
                      <span>{currentLang === 'te' ? 'పూర్తి పేరు *' : currentLang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={
                          currentLang === 'te' ? 'ఉదాహరణ: వెంకటేశ్వర రావు / శ్రీనివాస్' :
                          currentLang === 'hi' ? 'उदा: रमेश पटेल / राजेश कुमार' :
                          'e.g., Rajesh Kumar / Ramesh Rao'
                        }
                        className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:border-[#2E6B39] focus:ring-2 focus:ring-[#2E6B39]/20 outline-none transition"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* 2. Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#2E6B39]" />
                      <span>{currentLang === 'te' ? '10 అంకెల మొబైల్ నంబర్ *' : currentLang === 'hi' ? '10 अंकों का मोबाइल नंबर *' : '10-Digit Mobile Number *'}</span>
                    </label>
                    <div className="flex items-center rounded-xl border-2 border-gray-200 bg-white overflow-hidden focus-within:border-[#2E6B39] focus-within:ring-2 focus-within:ring-[#2E6B39]/20 transition">
                      <span className="px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full px-3 py-2.5 text-base font-mono font-bold tracking-wider text-gray-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* 3. Role Selector */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#2E6B39]" />
                        <span>{currentLang === 'te' ? 'మీ ప్రొఫైల్ / పాత్రను ఎంచుకోండి:' : currentLang === 'hi' ? 'अपनी भूमिका चुनें:' : 'Select Your Profile Role:'}</span>
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {roleOptions.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            role === r.id
                              ? 'border-[#2E6B39] bg-[#EBF4ED] ring-2 ring-[#2E6B39]/30 text-[#2E6B39] shadow-xs'
                              : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-base">{r.emoji}</span>
                            <span className="text-xs font-bold truncate">{r.label}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 line-clamp-1">{r.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Village / Town / Location */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#2E6B39]" />
                      <span>{currentLang === 'te' ? 'గ్రామం / మండలం / జిల్లా *' : currentLang === 'hi' ? 'गाँव / शहर / जिला *' : 'Village / Town / District *'}</span>
                    </label>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder={
                        currentLang === 'te' ? 'ఉదాహరణ: శంషాబాద్, రంగారెడ్డి జిల్లా' :
                        currentLang === 'hi' ? 'उदा: शमशाबाद, रंगारेड्डी जिला' :
                        'e.g., Shamshabad, Rangareddy / Chevella'
                      }
                      className="w-full px-3.5 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:border-[#2E6B39] focus:ring-2 focus:ring-[#2E6B39]/20 outline-none transition"
                    />
                  </div>

                  {/* 5. Dynamic Role-Specific Fields */}
                  {role === 'farmer' && (
                    <div className="p-3 bg-[#F4F9F5] border border-[#2E6B39]/20 rounded-2xl space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E6B39]">
                        <Sprout className="w-4 h-4" />
                        <span>{currentLang === 'te' ? 'రైతు అదనపు వివరాలు' : currentLang === 'hi' ? 'किसान अतिरिक्त विवरण' : 'Farmer Farm Details'}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            {currentLang === 'te' ? 'ప్రధాన పంట' : currentLang === 'hi' ? 'मुख्य फसल' : 'Primary Crop'}
                          </label>
                          <select
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2E6B39]"
                          >
                            <option value="Tomato">🍅 Tomato (టమాట)</option>
                            <option value="Chilli">🌶️ Chilli (మిర్చి)</option>
                            <option value="Onion">🧅 Onion (ఉల్లిపాయ)</option>
                            <option value="Potato">🥔 Potato (బంగాళాదుంప)</option>
                            <option value="Cotton">🌱 Cotton (పత్తి)</option>
                            <option value="Paddy">🌾 Paddy / Rice (వరి)</option>
                            <option value="Mango">🥭 Mango (మామిడి)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            {currentLang === 'te' ? 'భూమి విస్తీర్ణం' : currentLang === 'hi' ? 'जमीन का आकार' : 'Land Size (Acres)'}
                          </label>
                          <select
                            value={landSize}
                            onChange={(e) => setLandSize(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2E6B39]"
                          >
                            <option value="1 Acre">&lt; 1 Acre (చిన్న రైతు)</option>
                            <option value="2.5 Acres">2.5 Acres (మధ్యస్థ రైతు)</option>
                            <option value="5 Acres">5 Acres</option>
                            <option value="10+ Acres">10+ Acres (పెద్ద రైతు)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {role === 'buyer' && (
                    <div className="p-3 bg-[#F4F9F5] border border-[#2E6B39]/20 rounded-2xl space-y-2">
                      <label className="block text-xs font-bold text-gray-700">
                        {currentLang === 'te' ? 'వ్యాపార సంస్థ / మార్కెట్ దుకాణం పేరు' : currentLang === 'hi' ? 'व्यापार / दुकान का नाम' : 'Business / Enterprise Name'}
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g., FreshBasket Wholesale Mart"
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2E6B39]"
                      />
                    </div>
                  )}

                  {role === 'logistics' && (
                    <div className="p-3 bg-[#F4F9F5] border border-[#2E6B39]/20 rounded-2xl space-y-2">
                      <label className="block text-xs font-bold text-gray-700">
                        {currentLang === 'te' ? 'వాహనం రకం & సామర్థ్యం' : currentLang === 'hi' ? 'वाहन का प्रकार' : 'Vehicle Type & Capacity'}
                      </label>
                      <input
                        type="text"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        placeholder="e.g., Tata Ace 1.5-Ton / E-Truck 2.5T"
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2E6B39]"
                      />
                    </div>
                  )}

                  {role === 'fpo' && (
                    <div className="p-3 bg-[#F4F9F5] border border-[#2E6B39]/20 rounded-2xl space-y-2">
                      <label className="block text-xs font-bold text-gray-700">
                        {currentLang === 'te' ? 'ఎఫ్.పి.ఓ సహకార సంఘం పేరు' : currentLang === 'hi' ? 'एफपीओ संस्था का नाम' : 'FPO Society / Organization Name'}
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g., Shamshabad Primary Farmers Producer Co-op"
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2E6B39]"
                      />
                    </div>
                  )}

                </div>
              )}

              {/* TAB B: 1-CLICK QUICK DEMO PROFILES */}
              {mode === 'quick' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  
                  {/* Phone Input Box */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      {currentLang === 'te' ? 'మీ 10 అంకెల మొబైల్ నంబర్' : currentLang === 'hi' ? 'आपका 10 अंकों का मोबाइल नंबर' : '10-Digit Mobile Number'}
                    </label>
                    <div className="flex items-center rounded-2xl border-2 border-[#2E6B39]/30 bg-white overflow-hidden shadow-inner focus-within:border-[#2E6B39] focus-within:ring-2 focus-within:ring-[#2E6B39]/20 transition-all">
                      <span className="px-3.5 py-3 bg-gray-50 border-r border-gray-200 text-sm font-bold text-gray-600 flex items-center gap-1.5">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full px-4 py-3 text-lg font-mono font-bold tracking-wider text-gray-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* Preset Quick Profile Cards */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-600 mb-2 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#D69A2D]" />
                      <span>{currentLang === 'te' ? 'త్వరిత డెమో ఖాతాను ఎంచుకోండి (1-Click):' : currentLang === 'hi' ? 'त्वरित डेमो प्रोफाइल चुनें (1-Click):' : 'Select a Pre-configured Demo Profile (1-Click):'}</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {demoAccounts.map(acc => (
                        <button
                          key={acc.phone}
                          type="button"
                          onClick={() => handleSelectDemoProfile(acc)}
                          className={`text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                            phone === acc.phone 
                              ? 'border-[#2E6B39] bg-[#EBF4ED] ring-2 ring-[#2E6B39]/40 shadow-xs' 
                              : 'border-gray-200 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-base">{acc.emoji}</span>
                              <span className="text-xs font-bold text-gray-900">{acc.name}</span>
                            </div>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 uppercase">
                              {acc.role}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                            <span>+91 {acc.phone}</span>
                            <span className="text-emerald-700 font-sans truncate max-w-[120px]">{acc.village}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Banner encouraging custom details */}
                  <div className="p-3 bg-[#FDF8EE] rounded-xl border border-[#D69A2D]/40 flex items-center justify-between text-xs">
                    <span className="text-gray-700">
                      {currentLang === 'te' ? 'మీ సొంత పేరు మరియు గ్రామం నమోదు చేయాలా?' : currentLang === 'hi' ? 'अपना नाम और गाँव दर्ज करना चाहते हैं?' : 'Want to enter your own Name & Village?'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setMode('custom')}
                      className="font-bold text-[#2E6B39] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>{currentLang === 'te' ? 'వివరాలు నమోదు చేయండి →' : currentLang === 'hi' ? 'विवरण भरें →' : 'Enter Details →'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#2E6B39] hover:bg-[#23532c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>
                      {currentLang === 'te' 
                        ? 'OTP పంపండి (SMS)' 
                        : currentLang === 'hi' 
                        ? 'OTP भेजें (SMS)' 
                        : 'Send OTP via SMS'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ================= STEP 2: OTP VERIFICATION ================= */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in duration-200">
              
              {/* Profile Confirmation Card */}
              <div className="p-3.5 rounded-2xl bg-[#EBF4ED] border border-[#2E6B39]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2E6B39] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {(name.trim() || 'K')[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#1C2B19]">
                        {name.trim() || (role === 'farmer' ? 'Farmer Venkataiah' : 'User')}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2E6B39] text-white font-bold uppercase">
                        {role}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-600 flex items-center gap-2 mt-0.5">
                      <span className="font-mono">+91 {phone}</span>
                      <span>·</span>
                      <span className="truncate max-w-[150px]">{village || 'Shamshabad, TS'}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-[#2E6B39] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{currentLang === 'te' ? 'మార్చండి' : currentLang === 'hi' ? 'बदलें' : 'Edit'}</span>
                </button>
              </div>

              {/* OTP Input Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 text-center">
                  {currentLang === 'te' 
                    ? '6-అంకెల OTP కోడ్ నమోదు చేయండి' 
                    : currentLang === 'hi' 
                    ? '6-अंकों का OTP कोड दर्ज करें' 
                    : 'Enter 6-Digit OTP Code'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full text-center py-3.5 text-2xl font-mono font-bold tracking-widest text-[#2E6B39] bg-white border-2 border-[#2E6B39] rounded-2xl shadow-inner outline-none focus:ring-4 focus:ring-[#2E6B39]/20"
                  autoFocus
                />
                
                {/* 1-Click Fast Fill OTP Button */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[11px] text-gray-500 font-mono">
                    {currentLang === 'te' ? 'డెమో కోడ్:' : currentLang === 'hi' ? 'डेमो कोड:' : 'Demo Code:'} 123456
                  </span>
                  <button
                    type="button"
                    onClick={() => setOtp('123456')}
                    className="text-[11px] font-bold text-[#2E6B39] bg-[#EBF4ED] px-2 py-0.5 rounded border border-[#2E6B39]/30 hover:bg-[#2E6B39] hover:text-white transition cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#2E6B39] hover:bg-[#23532c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#D69A2D]" />
                    <span>
                      {currentLang === 'te' 
                        ? 'లాగిన్ పూర్తి చేయండి' 
                        : currentLang === 'hi' 
                        ? 'सत्यापित कर पोर्टल खोलें' 
                        : 'Verify & Enter Portal'}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ================= STEP 3: SUCCESS CONFIRMATION ================= */}
          {step === 'success' && verifiedUser && (
            <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#EBF4ED] text-[#2E6B39] flex items-center justify-center mx-auto border-2 border-[#2E6B39] shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1C2B19]">
                {currentLang === 'te' ? `స్వాగతం, ${verifiedUser.name}!` : currentLang === 'hi' ? `स्वागत है, ${verifiedUser.name}!` : `Welcome, ${verifiedUser.name}!`}
              </h3>
              
              <div className="inline-flex items-center gap-2 bg-[#FAF7EE] border border-[#2E6B39]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2E6B39]">
                <span>{verifiedUser.role.toUpperCase()}</span>
                <span>•</span>
                <span>{verifiedUser.village || 'Telangana Agri Zone'}</span>
              </div>

              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                {currentLang === 'te' 
                  ? 'మీ ఖాతా ధృవీకరించబడింది. సంబంధిత పోర్టల్ తెరవబడుతోంది...' 
                  : currentLang === 'hi' 
                  ? 'खाता सफलतापूर्वक सत्यापित हुआ। आपका पोर्टल खुल रहा है...' 
                  : 'Account verified successfully. Launching your personalized portal...'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
