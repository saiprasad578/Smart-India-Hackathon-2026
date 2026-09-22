# Development Rules

These rules apply to every AI-assisted change in this project.

## General

- Read `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md` and `TASKS.md` before coding.
- Inspect existing code first; reuse before creating.
- Keep functions small; do not modify unrelated files.
- Make a plan before large changes and wait for approval.
- One task at a time: Understand → Plan → Implement → Test → Review → Commit.

## Architecture

- Backend: Python (FastAPI). Frontend: React PWA (TypeScript).
- UI components contain no business logic or direct database access.
- Database access lives in `backend/app/services/` or `repositories/`.
- Business rules (allocation, escrow state machine, price checks) live in `backend/app/domain/` and are unit-tested.
- Do not change accepted decisions in `docs/DECISIONS.md` without asking.

## Data model rules (non-negotiable)

- **Never assume one farmer per order.** Orders are fulfilled through `allocations` (per farmer/listing). Partial fulfilment and split payouts must always work.
- Store money as **integer paise**, never floats.
- Store quantity as **integer grams** or decimal kg with fixed precision; be consistent.
- Every escrow/payment/dispute change is a state transition recorded in an append-only log.
- Schema changes go through migrations (Alembic). No manual DB edits.

## Honesty rules (the demo must survive scrutiny)

- **Label all synthetic data** (farmers, FPOs, buyers, orders) in the UI and in code (`is_synthetic = true`).
- Forecasting runs on **real** price data. Report error against a seasonal-naive baseline.
- Every displayed saving, price breakup or "% improvement" must trace to documented assumptions. **No invented numbers.**
- Simulated logistics and test-mode payments must be visibly marked as simulated.

## UX rules

- Follow `docs/DESIGN.md`. Farmer screens: large touch targets, icons + voice, minimal text, regional language first.
- Provide loading, error, empty and offline-friendly states.
- Every farmer-facing string goes through i18n. No hardcoded English.

## Security

- Never expose secrets in client code or Git. Only `.env.example` is committed.
- Validate all input on the server. Authorization is checked server-side on every protected resource.
- Follow `docs/SECURITY.md`.

## Testing

- Add tests for domain logic (allocation, escrow, price band check, dispute rules).
- Run lint, type checks and relevant tests after every task.
- Fix failing tests before moving on.

## Git

- Small commits with clear messages (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`).
- Feature branches; do not commit directly to `main`.

## After every task, report

1. Files changed
2. What was implemented
3. Tests executed
4. Remaining issues

Then update `TASKS.md` and `docs/MEMORY.md`.
