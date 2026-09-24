import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, ShieldCheck, ArrowRight, CheckCircle2, Users, Package, MapPin, Sparkles } from 'lucide-react';
import { api, ListingItem, OrderItem } from '../../api/client';

interface BuyerPortalProps {
  onOpenTrustTimeline: () => void;
}

export const BuyerPortal: React.FC<BuyerPortalProps> = ({ onOpenTrustTimeline }) => {
  const { t } = useTranslation();
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderCreatedNotice, setOrderCreatedNotice] = useState(false);

  const loadData = async () => {
    const l = await api.getListings();
    setListings(l);
    const o = await api.getOrders();
    setOrders(o);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate1000kgOrder = async () => {
    setIsOrdering(true);
    const newOrder = await api.createOrder({
      buyer_id: "buyer-001",
      items: [{ crop: "tomato", quantity: 1000, unit: "kg" }],
      delivery_address: "Kothapet Fruit & Vegetable Wholesale Market, Hyderabad",
      delivery_lat: 17.3688,
      delivery_lng: 78.5398
    });

    // Run multi-farmer allocation
    await api.allocateOrder(newOrder.id);
    setIsOrdering(false);
    setOrderCreatedNotice(true);
    await loadData();

    setTimeout(() => {
      setOrderCreatedNotice(false);
    }, 2500);
  };

  const activeOrder = orders[0];

  return (
    <div className="space-y-6">
      {/* Buyer Greeting & Direct Bulk Procurement Action */}
      <div className="bg-gradient-to-r from-[#B5502F] to-[#7A2A12] text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold font-serif">FreshBasket Wholesale Procurements</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D69A2D] text-black font-semibold">Bulk Institutional Buyer</span>
          </div>
          <p className="text-xs text-white/80">Procurement Manager: Siddharth · Delivery Hub: Kothapet Mandi, Hyderabad</p>

          <div className="flex items-center gap-4 mt-4 text-xs font-mono">
            <div>
              <span className="text-white/60 block text-[10px]">Active Order Quantity</span>
              <span className="text-base font-bold text-white">1,000 kg</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">Escrow Funds Secured</span>
              <span className="text-base font-bold text-[#EBF4ED]">₹25,600.00</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">Contributing Farmers</span>
              <span className="text-base font-bold text-[#D69A2D]">3 Local Growers</span>
            </div>
          </div>
        </div>

        {/* 1-Click Multi-Farmer Bulk Order Creation */}
        <button
          onClick={handleCreate1000kgOrder}
          disabled={isOrdering}
          className="px-5 py-3 rounded-xl bg-white text-[#B5502F] hover:bg-gray-100 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0 active:scale-95"
        >
          <ShoppingCart className="w-4 h-4 text-[#B5502F]" />
          <span>{isOrdering ? 'Allocating Across Farmers...' : t('buyer.order_1000kg')}</span>
        </button>
      </div>

      {orderCreatedNotice && (
        <div className="p-3 bg-[#2E6B39] text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            1,000 kg order placed! KisanConnect matched & allocated across Farmer A (300kg), Farmer B (400kg), and Farmer C (300kg).
          </span>
          <button onClick={onOpenTrustTimeline} className="underline text-xs hover:text-gray-200">
            View Trust Timeline & OTP
          </button>
        </div>
      )}

      {/* Multi-Farmer Allocation Architecture Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2E6B39]" />
              <h3 className="font-serif text-base font-bold text-[#1C2B19]">{t('buyer.multi_allocation_title')}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF4ED] text-[#2E6B39] font-bold">Architecture Highlight</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{t('buyer.multi_allocation_sub')}</p>
          </div>

          <button
            onClick={onOpenTrustTimeline}
            className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#EBF4ED] border border-gray-300 text-[#2E6B39] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Track Trust Checkpoints</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Allocation Tree Diagram */}
        <div className="bg-[#FAF8F3] p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#B5502F]" />
              <span className="text-xs font-bold text-[#1C2B19]">Consolidated Buyer Order: 1,000 kg Tomatoes</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#2E6B39]">Escrow Locked: ₹25,600</span>
          </div>

          {/* 3 Contributing Farmers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-xl border-2 border-[#2E6B39] shadow-xs">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-[#2E6B39]">Farmer A (Venkataiah)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBF4ED] text-[#2E6B39] font-bold">300 kg</span>
              </div>
              <div className="text-[11px] text-gray-500">📍 Shamshabad Village</div>
              <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-gray-100 text-xs">
                <span className="text-gray-500">Agreed Rate: ₹26/kg</span>
                <span className="font-bold text-[#1C2B19]">₹7,800 Payout</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border-2 border-[#D69A2D] shadow-xs">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-[#D69A2D]">Farmer B (Ramulu)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FBF4E6] text-[#D69A2D] font-bold">400 kg</span>
              </div>
              <div className="text-[11px] text-gray-500">📍 Chevella Hamlet</div>
              <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-gray-100 text-xs">
                <span className="text-gray-500">Agreed Rate: ₹25/kg</span>
                <span className="font-bold text-[#1C2B19]">₹10,000 Payout</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border-2 border-[#33477A] shadow-xs">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-[#33477A]">Farmer C (Lakshmi)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EEF2FC] text-[#33477A] font-bold">300 kg</span>
              </div>
              <div className="text-[11px] text-gray-500">📍 Maheshwaram Farm</div>
              <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-gray-100 text-xs">
                <span className="text-gray-500">Agreed Rate: ₹26/kg</span>
                <span className="font-bold text-[#1C2B19]">₹7,800 Payout</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-200">
            <span>Delivery Destination: <b>Kothapet Wholesale Market, Hyderabad</b></span>
            <span className="text-[#2E6B39] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Quality Inspection Certified (Grade A)
            </span>
          </div>
        </div>
      </div>

      {/* Available Farmgate Listings */}
      <div className="space-y-3">
        <h3 className="font-serif text-base font-bold text-[#1C2B19]">Direct Farmgate Produce Lots Available</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {listings.map((l) => (
            <div key={l.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#2E6B39] capitalize px-2 py-0.5 rounded-md bg-[#EBF4ED]">{l.crop}</span>
                <span className="text-[10px] text-gray-500">{l.quality_grade}</span>
              </div>
              <div className="text-base font-bold text-[#1C2B19] mt-1">{l.quantity} {l.unit}</div>
              <div className="text-xs text-gray-600">Farmer: {l.farmer_name || l.farmer_id}</div>
              <div className="text-[11px] text-gray-500">📍 {l.location_name}</div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-500">Mandi Modal: ₹26/kg</span>
                <span className="font-bold text-[#2E6B39]">₹{l.price_per_kg}/kg</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
