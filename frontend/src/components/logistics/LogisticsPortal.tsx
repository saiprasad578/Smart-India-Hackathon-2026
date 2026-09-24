import React, { useEffect, useRef, useState } from 'react';
import { Truck, Navigation, MapPin, Gauge, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { api, RouteOptimization, RouteStop } from '../../api/client';
import L from 'leaflet';

export const LogisticsPortal: React.FC = () => {
  const [routeData, setRouteData] = useState<RouteOptimization | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const loadRoute = async () => {
      const data = await api.getRoute();
      setRouteData(data);
    };
    loadRoute();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !routeData) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([17.28, 78.43], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const latlngs: L.LatLngTuple[] = [];

    // Add markers for stops
    routeData.stops.forEach((stop: RouteStop) => {
      latlngs.push([stop.lat, stop.lng]);

      const markerColor =
        stop.type === 'collection_point' ? '#33477A' : stop.type === 'delivery' ? '#B5502F' : '#2E6B39';

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${markerColor}; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">${stop.stop_number}</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      L.marker([stop.lat, stop.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>Stop ${stop.stop_number}: ${stop.location_name}</b><br/>Type: ${stop.type}<br/>Quantity: ${stop.quantity_kg} kg<br/>ETA: ${stop.estimated_arrival}`);
    });

    // Draw routing line
    if (latlngs.length > 1) {
      const polyline = L.polyline(latlngs, {
        color: '#2E6B39',
        weight: 4,
        opacity: 0.8,
        dashArray: '8, 8'
      }).addTo(map);

      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
    }
  }, [routeData]);

  return (
    <div className="space-y-6">
      {/* Fleet Header */}
      <div className="bg-gradient-to-r from-[#1B2917] to-[#2E6B39] text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold font-serif">KisanConnect Pooled Logistics & Route Engine</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D69A2D] text-black font-semibold">OR-Tools Powered</span>
          </div>
          <p className="text-xs text-white/80">Vehicle: TS-07-AGRI-1088 (E-Truck 2.5T) · Route: Shamshabad AgriHub $\to$ Kothapet Wholesale Market</p>

          <div className="flex items-center gap-4 mt-4 text-xs font-mono">
            <div>
              <span className="text-white/60 block text-[10px]">Pooled Capacity</span>
              <span className="text-base font-bold text-white">1,000 / 1,500 kg (67%)</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">Mileage Optimization</span>
              <span className="text-base font-bold text-[#D69A2D]">42.4 km (54% Saved)</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">CO2 Reduction</span>
              <span className="text-base font-bold text-[#EBF4ED]">28.4 kg Saved</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-3.5 rounded-xl border border-white/20 shrink-0 text-xs text-white space-y-1">
          <div className="font-bold flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#D69A2D]" /> Cold Chain Buffer Active</div>
          <div className="text-[11px] text-white/80">Temperature: 14°C (Optimal for Tomatoes)</div>
          <div className="text-[11px] text-white/80">GPS Tracking: Live OSRM Sync</div>
        </div>
      </div>

      {/* Map & Stop Sequencing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Leaflet Map */}
        <div className="lg:col-span-8 bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#2E6B39]" />
              <h3 className="font-serif text-sm font-bold text-[#1C2B19]">Pooled Vehicle Route Map (OpenStreetMap)</h3>
            </div>
            <span className="text-xs text-gray-500">5 Sequenced Stops</span>
          </div>

          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200" ref={mapContainerRef}></div>
        </div>

        {/* Sequenced Route Stops */}
        <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-sm font-bold text-[#1C2B19] mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#2E6B39]" />
              <span>OR-Tools Route Sequence</span>
            </h4>

            <div className="space-y-2 text-xs">
              {routeData?.stops.map((s) => (
                <div key={s.stop_number} className="p-2.5 rounded-xl bg-[#FAF8F3] border border-gray-200 flex items-start gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0 mt-0.5 ${
                    s.type === 'collection_point' ? 'bg-[#33477A]' : s.type === 'delivery' ? 'bg-[#B5502F]' : 'bg-[#2E6B39]'
                  }`}>
                    {s.stop_number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#1C2B19] truncate">{s.location_name}</div>
                    <div className="text-[10px] text-gray-500 flex items-center justify-between mt-0.5">
                      <span>{s.quantity_kg} kg ({s.type})</span>
                      <span className="font-mono text-[#2E6B39] font-medium">{s.estimated_arrival}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#EBF4ED] border border-[#2E6B39]/20 rounded-xl text-[11px] text-[#2E6B39] space-y-1">
            <span className="font-bold block">Vehicle Capacity Meter: 1,000 / 1,500 kg</span>
            <div className="w-full bg-white h-2 rounded-full overflow-hidden">
              <div className="bg-[#2E6B39] h-full w-[67%] rounded-full"></div>
            </div>
            <span className="text-[10px] text-gray-600 block pt-0.5">No empty return legs. Shared collection points cut village transport costs by 45%.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
