import React from 'react';
import { 
  Tractor, 
  Users, 
  Store, 
  ShoppingBag, 
  Truck, 
  Phone, 
  MessageSquare, 
  Mic, 
  MapPin, 
  Sprout
} from 'lucide-react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface RoleSelectorProps {
  currentLang: Language;
  onSelectRole: (role: 'farmer' | 'fpo' | 'buyer' | 'consumer' | 'logistics') => void;
  onOpenIVR: () => void;
  onOpenSMS: () => void;
  onOpenVoice: () => void;
  onOpenCenter: () => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentLang,
  onSelectRole,
  onOpenIVR,
  onOpenSMS,
  onOpenVoice,
  onOpenCenter
}) => {
  const t = translations[currentLang];

  return (
    <section className="roles-section">
      <div className="section-title-wrap">
        <Sprout className="section-title-icon" size={24} />
        <h2 className="section-heading">{t.roles.title}</h2>
      </div>

      <div className="roles-layout-grid">
        {/* The 5 Role Cards */}
        <div className="role-cards-container">
          {/* Card 1: Farmer */}
          <div className="role-card role-card-farmer">
            <div className="role-illustration-box bg-farmer-accent">
              <Tractor size={42} className="role-icon text-farmer" />
              <div className="avatar-chip">🌾 Farmer</div>
            </div>
            <div className="role-card-body">
              <h3 className="role-title">{t.roles.farmerTitle}</h3>
              <p className="role-desc">{t.roles.farmerDesc}</p>
            </div>
            <button 
              onClick={() => onSelectRole('farmer')} 
              className="role-action-btn btn-farmer"
            >
              <span>{t.roles.farmerBtn}</span>
            </button>
          </div>

          {/* Card 2: FPO / Agent */}
          <div className="role-card role-card-fpo">
            <div className="role-illustration-box bg-fpo-accent">
              <Users size={42} className="role-icon text-fpo" />
              <div className="avatar-chip">👥 FPO Cluster</div>
            </div>
            <div className="role-card-body">
              <h3 className="role-title">{t.roles.fpoTitle}</h3>
              <p className="role-desc">{t.roles.fpoDesc}</p>
            </div>
            <button 
              onClick={() => onSelectRole('fpo')} 
              className="role-action-btn btn-fpo"
            >
              <span>{t.roles.fpoBtn}</span>
            </button>
          </div>

          {/* Card 3: Buyer */}
          <div className="role-card role-card-buyer">
            <div className="role-illustration-box bg-buyer-accent">
              <Store size={42} className="role-icon text-buyer" />
              <div className="avatar-chip">🏢 Bulk Buyer</div>
            </div>
            <div className="role-card-body">
              <h3 className="role-title">{t.roles.buyerTitle}</h3>
              <p className="role-desc">{t.roles.buyerDesc}</p>
            </div>
            <button 
              onClick={() => onSelectRole('buyer')} 
              className="role-action-btn btn-buyer"
            >
              <span>{t.roles.buyerBtn}</span>
            </button>
          </div>

          {/* Card 4: Consumer */}
          <div className="role-card role-card-consumer">
            <div className="role-illustration-box bg-consumer-accent">
              <ShoppingBag size={42} className="role-icon text-consumer" />
              <div className="avatar-chip">🥗 Consumer</div>
            </div>
            <div className="role-card-body">
              <h3 className="role-title">{t.roles.consumerTitle}</h3>
              <p className="role-desc">{t.roles.consumerDesc}</p>
            </div>
            <button 
              onClick={() => onSelectRole('consumer')} 
              className="role-action-btn btn-consumer"
            >
              <span>{t.roles.consumerBtn}</span>
            </button>
          </div>

          {/* Card 5: Logistics Partner */}
          <div className="role-card role-card-logistics">
            <div className="role-illustration-box bg-logistics-accent">
              <Truck size={42} className="role-icon text-logistics" />
              <div className="avatar-chip">🚚 Transport</div>
            </div>
            <div className="role-card-body">
              <h3 className="role-title">{t.roles.logisticsTitle}</h3>
              <p className="role-desc">{t.roles.logisticsDesc}</p>
            </div>
            <button 
              onClick={() => onSelectRole('logistics')} 
              className="role-action-btn btn-logistics"
            >
              <span>{t.roles.logisticsBtn}</span>
            </button>
          </div>
        </div>

        {/* Right Card: Not Comfortable with Apps? */}
        <div className="simple-options-sidebar">
          <div className="sidebar-header">
            <h3 className="sidebar-title">{t.simpleOptions.title}</h3>
            <p className="sidebar-subtitle">{t.simpleOptions.subtitle}</p>
          </div>

          <div className="simple-options-grid">
            {/* Option 1: Give a Call */}
            <div className="simple-opt-card">
              <div className="opt-icon-circle icon-call">
                <Phone size={20} />
              </div>
              <div className="opt-info">
                <h4 className="opt-name">{t.simpleOptions.callTitle}</h4>
                <p className="opt-text">{t.simpleOptions.callDesc}</p>
              </div>
              <button onClick={onOpenIVR} className="opt-action-pill pill-call">
                {t.simpleOptions.callBtn}
              </button>
            </div>

            {/* Option 2: Send SMS */}
            <div className="simple-opt-card">
              <div className="opt-icon-circle icon-sms">
                <MessageSquare size={20} />
              </div>
              <div className="opt-info">
                <h4 className="opt-name">{t.simpleOptions.smsTitle}</h4>
                <p className="opt-text">{t.simpleOptions.smsDesc}</p>
              </div>
              <button onClick={onOpenSMS} className="opt-action-pill pill-sms">
                {t.simpleOptions.smsBtn}
              </button>
            </div>

            {/* Option 3: Use Voice (IVR) */}
            <div className="simple-opt-card">
              <div className="opt-icon-circle icon-voice">
                <Mic size={20} />
              </div>
              <div className="opt-info">
                <h4 className="opt-name">{t.simpleOptions.voiceTitle}</h4>
                <p className="opt-text">{t.simpleOptions.voiceDesc}</p>
              </div>
              <button onClick={onOpenVoice} className="opt-action-pill pill-voice">
                {t.simpleOptions.voiceBtn}
              </button>
            </div>

            {/* Option 4: Visit Nearest Center */}
            <div className="simple-opt-card">
              <div className="opt-icon-circle icon-center">
                <MapPin size={20} />
              </div>
              <div className="opt-info">
                <h4 className="opt-name">{t.simpleOptions.centerTitle}</h4>
                <p className="opt-text">{t.simpleOptions.centerDesc}</p>
              </div>
              <button onClick={onOpenCenter} className="opt-action-pill pill-center">
                {t.simpleOptions.centerBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
