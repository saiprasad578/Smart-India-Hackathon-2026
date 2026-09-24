# KisanConnect — Anti-Gravity Project Specification

## Purpose
KisanConnect is an agri-marketplace designed around the architecture in the supplied system architecture reference.

The system must support three farmer access paths:
- Smartphone app / PWA
- Basic-phone IVR / SMS
- FPO / field-agent assisted entry

All channels converge into shared marketplace, AI, logistics, trust/payment, and analytics infrastructure.

## Core demo flow
Farmer → Telugu voice / FPO entry → Produce listing → AI demand prediction → Buyer match → Multi-farmer allocation → Route optimization → Delivery → Farmer payout

## Launch languages
- English
- Telugu
- Hindi

Planned:
- Tamil
- Kannada
- Marathi

## Primary stack
- Frontend: React + TypeScript, Vite, Tailwind CSS, PWA, i18next, Leaflet
- Backend: Python, FastAPI, REST APIs, JWT / OTP
- AI: Python, Pandas, scikit-learn, forecasting, OR-Tools, speech/NLP
- Database: PostgreSQL, optional Redis
- External: OpenStreetMap, OSRM, government market data, weather API, SMS/IVR, voice services, payment gateway

## Important product principle
A farmer should never have to understand a complex form. The system should reduce farmer input to structured fields such as crop, quantity, availability, and location.
