import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Layers, 
  Smartphone, 
  Database, 
  Globe2, 
  CloudSun, 
  ShieldCheck, 
  Check, 
  Code2, 
  Cloud, 
  Map, 
  Coins, 
  Workflow, 
  TrendingUp,
  Boxes
} from 'lucide-react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface SystemArchitectureProps {
  currentLang: Language;
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [lowDataMode, setLowDataMode] = useState<boolean>(false);
  const [offlineSyncActive, setOfflineSyncActive] = useState<boolean>(false);

  return (
    <section className="architecture-section">
      <div className="section-title-wrap">
        <Server className="section-title-icon" size={24} />
        <h2 className="section-heading">{t.architecture.title}</h2>
      </div>

      <div className="architecture-container-grid">
        {/* Left Column: Users & Access Channels */}
        <div className="arch-col-users">
          <div className="arch-col-header">
            <h3 className="arch-col-title">{t.architecture.usersTitle}</h3>
          </div>

          <div className="arch-users-stack">
            {/* Farmers (Rural) */}
            <div className="user-channel-card user-farmer">
              <div className="user-icon-row">
                <span className="user-emoji">👨‍🌾</span>
                <span className="user-role-label">Farmers (Rural)</span>
              </div>
              <p className="user-channels-text">
                Mobile App | Voice Call | SMS | FPO / Village Center
              </p>
            </div>

            {/* FPO / Agents */}
            <div className="user-channel-card user-fpo">
              <div className="user-icon-row">
                <span className="user-emoji">👥</span>
                <span className="user-role-label">FPO / Agents</span>
              </div>
              <p className="user-channels-text">
                Web Portal | Mobile App | Bulk Listings
              </p>
            </div>

            {/* Buyers */}
            <div className="user-channel-card user-buyer">
              <div className="user-icon-row">
                <span className="user-emoji">🏢</span>
                <span className="user-role-label">Buyers</span>
              </div>
              <p className="user-channels-text">
                Web Portal | Mobile App | Order Management
              </p>
            </div>

            {/* Consumers */}
            <div className="user-channel-card user-consumer">
              <div className="user-icon-row">
                <span className="user-emoji">🥗</span>
                <span className="user-role-label">Consumers</span>
              </div>
              <p className="user-channels-text">
                Web / Mobile App | Fresh Produce
              </p>
            </div>

            {/* Logistics Partners */}
            <div className="user-channel-card user-logistics">
              <div className="user-icon-row">
                <span className="user-emoji">🚚</span>
                <span className="user-role-label">Logistics Partners</span>
              </div>
              <p className="user-channels-text">
                Mobile App | Route Updates
              </p>
            </div>

            {/* Government / Admin */}
            <div className="user-channel-card user-admin">
              <div className="user-icon-row">
                <span className="user-emoji">🏛️</span>
                <span className="user-role-label">Government / Admin</span>
              </div>
              <p className="user-channels-text">
                Dashboard | Price Reports | Impact
              </p>
            </div>
          </div>
        </div>

        {/* Center: KisanConnect Platform (Cloud) */}
        <div className="arch-col-platform">
          <div className="platform-box-header">
            <Cloud size={20} className="text-primary" />
            <h3 className="platform-box-title">{t.architecture.platformTitle}</h3>
          </div>

          <div className="platform-layers-container">
            {/* Layer 1: Presentation Layer */}
            <div 
              className={`platform-layer-strip layer-presentation ${selectedLayer === 'presentation' ? 'selected' : ''}`}
              onClick={() => setSelectedLayer(selectedLayer === 'presentation' ? null : 'presentation')}
            >
              <div className="layer-title-bar">
                <Layers size={16} />
                <span>{t.architecture.presentationLayer}</span>
              </div>
              <div className="layer-badges-grid">
                <span className="arch-micro-badge">Farmer App</span>
                <span className="arch-micro-badge">FPO Portal</span>
                <span className="arch-micro-badge">Buyer Portal</span>
                <span className="arch-micro-badge">Consumer App</span>
                <span className="arch-micro-badge">Logistics Portal</span>
                <span className="arch-micro-badge">Admin Dashboard</span>
                <span className="arch-micro-badge badge-highlight">IVR / SMS / Voice</span>
              </div>
            </div>

            {/* Layer 2: Application Layer (Business Logic & Services) */}
            <div 
              className={`platform-layer-strip layer-application ${selectedLayer === 'application' ? 'selected' : ''}`}
              onClick={() => setSelectedLayer(selectedLayer === 'application' ? null : 'application')}
            >
              <div className="layer-title-bar">
                <Workflow size={16} />
                <span>{t.architecture.applicationLayer}</span>
              </div>
              <div className="layer-badges-grid">
                <span className="arch-micro-badge">User Management</span>
                <span className="arch-micro-badge">Marketplace Service</span>
                <span className="arch-micro-badge">Demand Forecasting</span>
                <span className="arch-micro-badge">Matching Engine</span>
                <span className="arch-micro-badge">Route Optimization</span>
                <span className="arch-micro-badge">Payment & Settlement</span>
                <span className="arch-micro-badge">Notification Service</span>
              </div>
            </div>

            {/* Layer 3: AI & Analytics Layer */}
            <div 
              className={`platform-layer-strip layer-ai ${selectedLayer === 'ai' ? 'selected' : ''}`}
              onClick={() => setSelectedLayer(selectedLayer === 'ai' ? null : 'ai')}
            >
              <div className="layer-title-bar">
                <Cpu size={16} />
                <span>{t.architecture.aiLayer}</span>
              </div>
              <div className="layer-badges-grid grid-ai-4">
                <div className="ai-sub-pill">
                  <TrendingUp size={14} className="text-primary" />
                  <div>
                    <strong>Demand Forecasting</strong>
                    <span>ML + Time Series</span>
                  </div>
                </div>
                <div className="ai-sub-pill">
                  <Coins size={14} className="text-blue" />
                  <div>
                    <strong>Price Prediction</strong>
                    <span>Mandi + Market Data</span>
                  </div>
                </div>
                <div className="ai-sub-pill">
                  <Boxes size={14} className="text-purple" />
                  <div>
                    <strong>Farmer-Buyer Matching</strong>
                    <span>Scoring Algorithm</span>
                  </div>
                </div>
                <div className="ai-sub-pill">
                  <CloudSun size={14} className="text-amber" />
                  <div>
                    <strong>Risk & Advisory</strong>
                    <span>Weather, Price, Supply</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 4: Integration Layer */}
            <div 
              className={`platform-layer-strip layer-integration ${selectedLayer === 'integration' ? 'selected' : ''}`}
              onClick={() => setSelectedLayer(selectedLayer === 'integration' ? null : 'integration')}
            >
              <div className="layer-title-bar">
                <Globe2 size={16} />
                <span>{t.architecture.integrationLayer}</span>
              </div>
              <div className="layer-badges-grid">
                <span className="arch-micro-badge">e-NAM (Market Data)</span>
                <span className="arch-micro-badge">Govt Open Data (Mandi Prices)</span>
                <span className="arch-micro-badge">Google Maps / OSRM</span>
                <span className="arch-micro-badge">Payment Gateway (UPI / Escrow)</span>
                <span className="arch-micro-badge">SMS / Voice APIs (IVR)</span>
                <span className="arch-micro-badge">Weather API</span>
                <span className="arch-micro-badge">Warehouse & Cold Chain</span>
              </div>
            </div>

            {/* Layer 5: Data Layer */}
            <div 
              className={`platform-layer-strip layer-data ${selectedLayer === 'data' ? 'selected' : ''}`}
              onClick={() => setSelectedLayer(selectedLayer === 'data' ? null : 'data')}
            >
              <div className="layer-title-bar">
                <Database size={16} />
                <span>{t.architecture.dataLayer}</span>
              </div>
              <div className="data-pills-row">
                <span className="data-dot">• Farmer Data</span>
                <span className="data-dot">• Crop & Yield Data</span>
                <span className="data-dot">• Mandi Prices (Govt Dataset)</span>
                <span className="data-dot">• Historical Orders</span>
                <span className="data-dot">• Synthetic Demand Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Technology Stack & Rural Inclusion */}
        <div className="arch-col-tech">
          {/* Tech Stack Box */}
          <div className="tech-stack-card">
            <h4 className="tech-stack-title">
              <Code2 size={16} className="text-primary" />
              <span>{t.architecture.techStackTitle}</span>
            </h4>

            <div className="tech-items-stack">
              <div className="tech-item-row">
                <div className="tech-label-col">
                  <Smartphone size={15} />
                  <span>Frontend</span>
                </div>
                <div className="tech-val-badge">React / Next.js / PWA</div>
              </div>

              <div className="tech-item-row">
                <div className="tech-label-col">
                  <Server size={15} />
                  <span>Backend</span>
                </div>
                <div className="tech-val-badge">FastAPI (Python)</div>
              </div>

              <div className="tech-item-row">
                <div className="tech-label-col">
                  <Database size={15} />
                  <span>Database</span>
                </div>
                <div className="tech-val-badge">PostgreSQL / Alembic</div>
              </div>

              <div className="tech-item-row">
                <div className="tech-label-col">
                  <Cpu size={15} />
                  <span>AI/ML</span>
                </div>
                <div className="tech-val-badge">Python / Scikit-learn / Prophet</div>
              </div>

              <div className="tech-item-row">
                <div className="tech-label-col">
                  <Map size={15} />
                  <span>Maps & Routing</span>
                </div>
                <div className="tech-val-badge">Google Maps API / OSRM</div>
              </div>

              <div className="tech-item-row">
                <div className="tech-label-col">
                  <Cloud size={15} />
                  <span>Cloud</span>
                </div>
                <div className="tech-val-badge">AWS / Firebase</div>
              </div>
            </div>
          </div>

          {/* Rural Inclusion Features Card */}
          <div className="inclusion-card">
            <h4 className="inclusion-title">
              <ShieldCheck size={16} className="text-primary" />
              <span>{t.architecture.inclusionTitle}</span>
            </h4>

            <ul className="inclusion-checklist">
              <li className="inclusion-item">
                <Check size={16} className="check-icon" />
                <span>Multi-lingual (Telugu, Hindi, Tamil, Kannada, Marathi + more)</span>
              </li>
              <li className="inclusion-item">
                <Check size={16} className="check-icon" />
                <span>Voice & IVR support (24x7 toll-free)</span>
              </li>
              <li className="inclusion-item">
                <Check size={16} className="check-icon" />
                <span>Works on basic phones (SMS/Call fallback)</span>
              </li>
              <li className="inclusion-item">
                <Check size={16} className="check-icon" />
                <span>FPO / Village center assisted mode</span>
              </li>
              <li className="inclusion-item">
                <Check size={16} className="check-icon" />
                <span>Simple, icon-based low-literacy UI</span>
              </li>

              {/* Interactive Low data mode toggle */}
              <li 
                className="inclusion-item interactive-toggle"
                onClick={() => setLowDataMode(!lowDataMode)}
              >
                <div className={`checkbox-indicator ${lowDataMode ? 'checked' : ''}`}>
                  {lowDataMode && <Check size={12} />}
                </div>
                <div className="toggle-label-wrap">
                  <span className="font-semibold">Low data mode</span>
                  <span className="text-xs text-muted">
                    {lowDataMode ? 'Active: Compressed assets & SVGs' : 'Click to simulate 2G network optimization'}
                  </span>
                </div>
              </li>

              {/* Interactive Offline sync toggle */}
              <li 
                className="inclusion-item interactive-toggle"
                onClick={() => setOfflineSyncActive(!offlineSyncActive)}
              >
                <div className={`checkbox-indicator ${offlineSyncActive ? 'checked' : ''}`}>
                  {offlineSyncActive && <Check size={12} />}
                </div>
                <div className="toggle-label-wrap">
                  <span className="font-semibold">Offline data entry & sync</span>
                  <span className="text-xs text-muted">
                    {offlineSyncActive ? 'Sync Queue: 3 local drafts ready for push' : 'Click to test offline IndexedDB mode'}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
