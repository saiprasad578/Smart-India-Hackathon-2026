import React, { useState, useEffect } from 'react';
import { UserCheck, Scale, Award, ShieldCheck, CheckCircle2, Plus, Truck, AlertCircle } from 'lucide-react';
import { api, ListingItem } from '../../api/client';

export const FPOPortal: React.FC = () => {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null);
  const [measuredWeight, setMeasuredWeight] = useState<number>(300);
  const [qualityGrade, setQualityGrade] = useState<string>("Grade A");
  const [inspectorNotes, setInspectorNotes] = useState<string>("Optimal ripeness, zero transit bruising, moisture 12%");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  // Assisted listing form state for farmers with no phone
  const [isAssistedModalOpen, setIsAssistedModalOpen] = useState(false);
  const [farmerName, setFarmerName] = useState("Farmer Lakshmi");
  const [village, setVillage] = useState("Maheshwaram Farm");
  const [crop, setCrop] = useState("tomato");
  const [quantity, setQuantity] = useState(300);

  const loadListings = async () => {
    const data = await api.getListings();
    setListings(data);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleOpenVerify = (listing: ListingItem) => {
    setSelectedListing(listing);
    setMeasuredWeight(listing.quantity);
  };

  const submitVerification = async () => {
    if (!selectedListing) return;
    setIsVerifying(true);
    try {
      await fetch("/api/v1/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing_id: selectedListing.id,
          collection_point_id: "CP-SHAMSHABAD-01",
          measured_weight: measuredWeight,
          quality_grade: qualityGrade,
          verified_by: "Agent Ramesh (FPO Officer)",
          notes: inspectorNotes
        })
      });
    } catch (e) {
      console.warn("Offline verification fallback", e);
    }
    setIsVerifying(false);
    setVerifiedSuccess(true);
    setTimeout(() => {
      setVerifiedSuccess(false);
      setSelectedListing(null);
      loadListings();
    }, 1200);
  };

  const submitAssistedListing = async () => {
    await api.createListing({
      farmer_id: "farmer-003",
      crop,
      quantity,
      unit: "kg",
      price_per_kg: 26.0,
      available_from: "Tomorrow",
      location: {
        lat: 17.135,
        lng: 78.43,
        name: village
      },
      source_channel: "fpo_agent"
    });
    setIsAssistedModalOpen(false);
    loadListings();
  };

  return (
    <div className="space-y-6">
      {/* FPO Officer Greeting */}
      <div className="bg-gradient-to-r from-[#33477A] to-[#1C2740] text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold font-serif">Shamshabad FPO Central Hub</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D69A2D] text-black font-semibold">Active Collection Point</span>
          </div>
          <p className="text-xs text-white/80">Officer: Agent Ramesh · Cluster #01 (Telangana) · Serving 140+ Smallholder Farmers</p>

          <div className="flex items-center gap-4 mt-4 text-xs font-mono">
            <div>
              <span className="text-white/60 block text-[10px]">Today's Aggregated Produce</span>
              <span className="text-base font-bold text-white">1,000 kg</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">Quality Verified Lots</span>
              <span className="text-base font-bold text-[#D69A2D]">100% Grade A</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">Pooled Fleet Dispatch</span>
              <span className="text-base font-bold text-[#EBF4ED]">E-Truck TS-07-AGRI-1088</span>
            </div>
          </div>
        </div>

        {/* Assisted Farmer Onboarding Button */}
        <button
          onClick={() => setIsAssistedModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-white text-[#33477A] hover:bg-gray-100 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
        >
          <UserCheck className="w-4 h-4 text-[#33477A]" />
          <span>Assisted Farmer Entry (No Phone)</span>
        </button>
      </div>

      {/* Produce Intake & Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#1C2B19]">Farmer Produce Intake & Verification Queue</h3>
            <span className="text-xs text-gray-500">Tap lot to verify physical weight & quality</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {listings.map((l) => (
              <div key={l.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs hover:border-[#33477A]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#33477A] capitalize px-2 py-0.5 rounded-md bg-[#EEF2FC]">
                      {l.crop} Lot
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                      {l.source_channel}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <span className="text-lg font-bold text-[#1C2B19]">{l.farmer_name || l.farmer_id}</span>
                      <span className="text-xs text-gray-500 block">📍 {l.location_name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-[#2E6B39]">{l.quantity} {l.unit}</span>
                      <span className="text-[10px] text-gray-500 block">₹{l.price_per_kg}/kg</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#2E6B39] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Physical Lot Verified
                  </span>
                  <button
                    onClick={() => handleOpenVerify(l)}
                    className="px-3 py-1.5 rounded-lg bg-[#33477A] hover:bg-[#25355e] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Weight & Grade</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Point Consolidation Status */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#1C2B19] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2E6B39]" />
              <span>Collection Point Consolidation</span>
            </h4>

            <p className="text-xs text-gray-600">
              Rather than 3 separate trips, produce from Farmer A, B, and C is consolidated here at the Shamshabad hub for single-truck delivery.
            </p>

            <div className="p-3 bg-[#FAF8F3] rounded-xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Farmer Venkataiah:</span>
                <span className="font-bold text-[#1C2B19]">300 kg (Loaded)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Farmer Ramulu:</span>
                <span className="font-bold text-[#1C2B19]">400 kg (Loaded)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Farmer Lakshmi:</span>
                <span className="font-bold text-[#1C2B19]">300 kg (Loaded)</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center font-bold text-[#2E6B39] text-sm">
                <span>Total Pooled Batch:</span>
                <span>1,000 kg</span>
              </div>
            </div>

            <div className="p-2.5 bg-[#EBF4ED] border border-[#2E6B39]/20 rounded-xl text-xs text-[#2E6B39] flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Inspection certificate issued. Safe for bulk buyer dispatch.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Produce Verification Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7EE] text-[#1C2B19] rounded-2xl max-w-md w-full border border-gray-300 shadow-2xl overflow-hidden p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#33477A] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#33477A]" />
              <span>Record Digital Weight & Quality</span>
            </h3>

            <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs space-y-1">
              <div className="font-semibold text-gray-800">{selectedListing.farmer_name || selectedListing.farmer_id}</div>
              <div className="text-gray-500">📍 {selectedListing.location_name} · Crop: {selectedListing.crop}</div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Measured Scale Weight (kg):</label>
              <input
                type="number"
                value={measuredWeight}
                onChange={(e) => setMeasuredWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 font-bold text-sm text-[#1C2B19]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Quality Grade:</label>
              <div className="grid grid-cols-3 gap-2">
                {['Grade A', 'Grade B', 'Grade C'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setQualityGrade(g)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      qualityGrade === g
                        ? 'bg-[#2E6B39] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Inspector Notes:</label>
              <input
                type="text"
                value={inspectorNotes}
                onChange={(e) => setInspectorNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-[#1C2B19]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedListing(null)}
                className="w-1/2 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitVerification}
                disabled={isVerifying}
                className="w-1/2 py-2.5 rounded-xl bg-[#33477A] hover:bg-[#25355e] text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                {isVerifying ? 'Saving...' : 'Certify & Verify'}
              </button>
            </div>

            {verifiedSuccess && (
              <div className="p-2.5 bg-[#2E6B39] text-white rounded-xl text-xs text-center font-semibold">
                ✓ Weight and Grade Certified!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assisted Farmer Listing Modal (for farmers without phones) */}
      {isAssistedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7EE] text-[#1C2B19] rounded-2xl max-w-md w-full border border-gray-300 shadow-2xl overflow-hidden p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#33477A] flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#33477A]" />
              <span>FPO Assisted Produce Entry</span>
            </h3>
            <p className="text-xs text-gray-500">
              For farmers without basic phones or smartphones visiting the village collection centre.
            </p>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Farmer Name:</label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Village / Hamlet:</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Crop:</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs"
                >
                  <option value="tomato">Tomato</option>
                  <option value="onion">Onion</option>
                  <option value="potato">Potato</option>
                  <option value="chilli">Chilli</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Quantity (kg):</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAssistedModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitAssistedListing}
                className="w-1/2 py-2.5 rounded-xl bg-[#2E6B39] hover:bg-[#23532c] text-white text-xs font-bold transition-colors shadow-sm"
              >
                Create Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
