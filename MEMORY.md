# Project Memory

Current state of the project. Update after every task.
(`DECISIONS.md` = decisions; `MEMORY.md` = where we are now.)

## Current status

Pre-build. Problem-statement breakdown complete; starter docs generated. Scope and corridor not yet frozen.

## Completed

- [x] Problem-statement analysis (pain points, feasibility, competitors, judge Q&A)
- [x] Starter documentation set created
- [ ] Corridor and crop mix frozen
- [ ] Data downloaded (CEDA/Agmarknet)
- [ ] Forecast baseline
- [ ] Repo and stack setup

## Current task

TASK-001: Pick the crop corridor and freeze scope.

## Known issues / risks

- Agmarknet API access is clunky; use CEDA downloadable CSVs as the safe route.
- No public farmer/FPO/order data; must be synthetic and labelled.
- Cold start (who joins first) has no answer yet.
- Unit economics not yet documented.
- Otipy/Ninjacart show fresh-produce logistics economics are hard; the pitch must address this.

## Next step

Choose the corridor (crop, FPO cluster, city), then download CEDA data and run a seasonal-naive forecast baseline before building UI.

## Notes for the AI

- Always design for partial fulfilment (allocations table).
- Label synthetic data; never invent savings numbers.
- Farmer UX is voice-first and regional-language first.

_Last updated: [YYYY-MM-DD]_
