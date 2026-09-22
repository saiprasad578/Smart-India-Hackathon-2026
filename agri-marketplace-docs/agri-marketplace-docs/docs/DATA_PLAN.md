# Data Plan

## Sources

| Data need | Source | Access |
| --- | --- | --- |
| Mandi prices and arrivals | Agmarknet / data.gov.in | Public, with friction (API may need to be requested) |
| Historical prices | CEDA Agmarknet portal | Public, downloadable |
| Weather | IMD or Open-Meteo | Free |
| Roads/routing | OpenStreetMap + OSRM | Free |
| Farmers, FPOs, buyers, orders | None public | **Synthetic** |

CEDA hosts historical series (344 commodities, 650+ districts, 54M+ price points over 21 years as of end-2021). Raw files are downloadable, which is the safest route if live APIs fail.

## Plan (do before the build window)

1. Download a CEDA/Agmarknet CSV for **one crop and 5–10 mandis**.
2. Clean and load into `mandi_prices`.
3. Run a seasonal-naive baseline, then the candidate model; record error.
4. Generate synthetic farmers, FPOs, buyers and orders **seeded from the real price history**.
5. Label synthetic data clearly in code (`is_synthetic`) and in the UI.

## If ideal data isn't available

- Keep the forecasting module on **real** price data even if everything else is simulated.
- Never hide fakery; judges respect honesty.

## Data quality checks

- Missing dates and markets
- Unit consistency (quintal vs kg)
- Outliers vs seasonal pattern
- Market naming inconsistencies

## Synthetic data policy

- Distributions and prices come from real history; quantities and identities are simulated.
- Document generation assumptions in `data/seed/README.md`.
- Never present synthetic results as real-world measured impact.
