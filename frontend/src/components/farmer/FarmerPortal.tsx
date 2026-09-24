import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, PhoneCall, IndianRupee, MapPin, ShieldCheck } from 'lucide-react';
import { api, ListingItem, OrderItem } from '../../api/client';
import { VoiceListingModal } from './VoiceListingModal';
import { IVRSimulator } from './IVRSimulator';
import { UserSession } from '../auth/LoginModal';

interface FarmerPortalProps {
  onOpenTrustTimeline: () => void;
  triggerIvr?: number;
  triggerVoice?: number;
  currentUser?: UserSession | null;
  onOpenLogin?: () => void;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({ 
  onOpenTrustTimeline, 
  triggerIvr, 
  triggerVoice,
  currentUser,
  onOpenLogin 
}) => {
  const { t } = useTranslation();
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isIvrOpen, setIsIvrOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string>('tomato');

  useEffect(() => {
    if (triggerIvr && triggerIvr > 0) setIsIvrOpen(true);
  }, [triggerIvr]);

  useEffect(() => {
    if (triggerVoice && triggerVoice > 0) setIsVoiceModalOpen(true);
  }, [triggerVoice]);

  const loadData = async () => {
    const list = await api.getListings();
    setListings(list);
    const ord = await api.getOrders();
    setOrders(ord);
  };

  useEffect(() => {
    loadData();
  }, []);

  const quickCrops = [
    { id: 'tomato', name: `🍅 ${t('farmer.crop')} (Tomato)`, emoji: '🍅', mandiPrice: 26, trend: '+₹2.5' },
    { id: 'onion',  name: `🧅 ${t('farmer.crop')} (Onion)`,  emoji: '🧅', mandiPrice: 34, trend: '+₹1.0' },
    { id: 'potato', name: `🥔 ${t('farmer.crop')} (Potato)`, emoji: '🥔', mandiPrice: 20, trend: t('farmer.stable') },
    { id: 'chilli', name: `🌶️ ${t('farmer.crop')} (Chilli)`, emoji: '🌶️', mandiPrice: 65, trend: '+₹4.0' },
  ];

  // Localised crop display names
  const cropNames: Record<string, string> = {
    tomato: t('language') === 'te' ? 'టమాటాలు' : t('language') === 'hi' ? 'टमाटर' : 'Tomatoes',
    onion:  t('language') === 'te' ? 'ఉల్లిపాయలు' : t('language') === 'hi' ? 'प्याज़' : 'Onions',
    potato: t('language') === 'te' ? 'బంగాళాదుంప' : t('language') === 'hi' ? 'आलू' : 'Potatoes',
    chilli: t('language') === 'te' ? 'పచ్చిమిర్చి' : t('language') === 'hi' ? 'हरी मिर्च' : 'Green Chilli',
  };

  const handleQuickCropSell = (cropId: string) => {
    setSelectedCrop(cropId);
    setIsVoiceModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Farmer Profile & Earnings Overview */}
      <div className="bg-gradient-to-r from-[#2E6B39] to-[#1C3B24] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl font-bold font-serif">
              {currentUser ? currentUser.name : t('farmer.name')}
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D69A2D] text-black font-bold">
              {t('farmer.verified')}
            </span>
          </div>
          <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#D69A2D]" />
            <span>{currentUser ? `${currentUser.phone} · ${currentUser.village || 'Shamshabad Village, TS'}` : t('farmer.location')}</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
            <div>
              <span className="text-white/70 block text-[11px]">{t('farmer.total_sold')}</span>
              <span className="text-lg font-bold text-white">1,200 {t('farmer.qty_kg')}</span>
            </div>
            <div>
              <span className="text-white/70 block text-[11px]">{t('farmer.received_payment')}</span>
              <span className="text-lg font-bold text-[#D69A2D]">₹31,200</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-white/70 block text-[11px]">{t('farmer.pending_payment')}</span>
              <span className="text-lg font-bold text-[#EBF4ED]">₹7,800</span>
            </div>
          </div>
        </div>

        {/* 2 Big Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="px-5 py-3.5 rounded-2xl bg-white hover:bg-gray-100 text-[#2E6B39] font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="w-5 h-5 text-[#2E6B39]" />
            <span>{t('farmer.voice_btn')}</span>
          </button>

          <button
            onClick={() => setIsIvrOpen(true)}
            className="px-5 py-3.5 rounded-2xl bg-[#D69A2D] hover:bg-[#c08620] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t('farmer.ivr_btn_label')}</span>
          </button>
        </div>
      </div>

      {/* 2. 1-Tap Quick Sell Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-[#1C2B19] flex items-center gap-2">
            <span>{t('farmer.select_crop')}</span>
            <span className="text-[10px] bg-[#EBF4ED] text-[#2E6B39] px-2 py-0.5 rounded-md font-bold">
              {t('farmer.live_mandi')}
            </span>
          </h3>
          <span className="text-xs text-gray-500 hidden sm:inline">{t('farmer.tap_or_speak')}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickCrops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => handleQuickCropSell(crop.id)}
              className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#2E6B39] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-98"
            >
              <div>
                <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">
                  {crop.emoji}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C2B19] leading-tight">
                  {cropNames[crop.id]}
                </h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-base font-bold text-[#2E6B39]">₹{crop.mandiPrice}</span>
                  <span className="text-[10px] text-gray-500">{t('farmer.per_kg')}</span>
                  <span className="text-[10px] text-emerald-600 font-bold ml-auto">{crop.trend}</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-[#2E6B39] font-bold">
                <span>{t('farmer.sell_label')}</span>
                <Mic className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. My Active Produce Lots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-[#1C2B19]">
              {t('farmer.active_lots')}
            </h3>
            <span className="text-xs text-gray-500">{listings.length} {t('farmer.lots_available')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {listings.map((l) => (
              <div key={l.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs hover:border-[#2E6B39]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#2E6B39] capitalize px-2.5 py-0.5 rounded-full bg-[#EBF4ED] flex items-center gap-1">
                      <span>{l.crop === 'tomato' ? '🍅' : l.crop === 'onion' ? '🧅' : '🥔'}</span>
                      <span className="capitalize">{cropNames[l.crop] || l.crop}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {t('farmer.active_status')}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-2">
                    <div>
                      <span className="text-2xl font-bold font-serif text-[#1C2B19]">{l.quantity} {l.unit}</span>
                      <span className="text-xs text-gray-500 block">{t('farmer.ready')}: {l.available_from}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#2E6B39]">₹{l.price_per_kg}{t('farmer.per_kg')}</span>
                      <span className="text-xs text-gray-600 block font-semibold">
                        {t('farmer.total_label')}: ₹{(l.quantity * l.price_per_kg).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2E6B39]" />
                    <span>{l.location_name}</span>
                  </span>
                  <span className="font-semibold text-[#2E6B39] bg-[#EBF4ED] px-2 py-0.5 rounded text-[11px]">
                    {l.quality_grade || 'Grade A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Bank Account & Direct Payout Trust Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-4">
            <h3 className="font-serif font-bold text-sm text-[#1C2B19] flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#2E6B39]" />
              <span>{t('farmer.payouts_title')}</span>
            </h3>

            <div className="p-3.5 bg-[#EBF4ED] rounded-xl border border-[#2E6B39]/20 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#2E6B39]">
                <span>{t('farmer.pending_delivery')}</span>
                <span className="text-sm">₹7,800.00</span>
              </div>
              <p className="text-[11px] text-gray-600">{t('farmer.pending_desc')}</p>
              <div className="pt-2 border-t border-[#2E6B39]/15 flex items-center justify-between text-[10px] text-[#2E6B39] font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('farmer.escrow_lock')}</span>
                </span>
                <span>{t('farmer.sbi_account')}</span>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1 text-xs text-gray-600">
              <div className="flex items-center justify-between font-bold text-gray-900">
                <span>{t('farmer.last_received')}</span>
                <span className="text-[#2E6B39]">₹15,600.00</span>
              </div>
              <p className="text-[10px] text-gray-500">{t('farmer.utr_label')}</p>
              <p className="text-[10px] text-gray-400">22 Sep 2026, 04:30 PM</p>
            </div>

            <div className="p-3 bg-[#FAF7EE] rounded-xl border border-[#D69A2D]/30 text-xs space-y-1">
              <span className="font-bold text-[#1C2B19] flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#D69A2D]" />
                <span>{t('farmer.need_help')}</span>
              </span>
              <p className="text-[11px] text-gray-600">{t('farmer.help_desc')}</p>
              <div className="font-mono font-bold text-sm text-[#2E6B39]">📞 1800-KISAN-HELP</div>
            </div>
          </div>
        </div>
      </div>

      <VoiceListingModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onListingCreated={loadData}
        initialCrop={selectedCrop}
      />

      <IVRSimulator
        isOpen={isIvrOpen}
        onClose={() => setIsIvrOpen(false)}
        onListingCreated={loadData}
      />
    </div>
  );
};
