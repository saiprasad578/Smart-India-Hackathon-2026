# Prompt Templates

## 1. Project kickoff (no code yet)

```text
Read these files before making any changes:

docs/PRD.md
docs/ARCHITECTURE.md
docs/DESIGN.md
docs/DECISIONS.md
docs/SECURITY.md
RULES.md
TASKS.md

Do not modify anything yet.

1. Summarize the product and the chosen differentiators.
2. Summarize the architecture, especially the allocation-first data model.
3. Note the honesty rules (synthetic data labelling, no invented numbers).
4. Identify missing information or conflicts between the documents.
5. Explain your plan for TASK-[number].

Do not write code yet.
```

## 2. Structured feature prompt

```text
CONTEXT
We are building a farmer-to-consumer marketplace. Read docs/PRD.md, docs/ARCHITECTURE.md and RULES.md.

TASK
[One small, specific task]

FILES
- backend/app/domain/
- backend/app/services/
- frontend/src/features/[feature]/

CONSTRAINTS
- Follow the allocation-first data model; never assume one farmer per order.
- Money in integer paise.
- Label synthetic data.
- Do not modify unrelated files.
- Validate input server-side.

ACCEPTANCE CRITERIA
- [Criterion 1]
- [Criterion 2]

TESTING
Add tests, run lint, type checks and relevant tests.

Report: files changed, what was implemented, tests run, remaining issues.
```

## 3. Allocation and escrow prompt

```text
Read docs/ARCHITECTURE.md (data model and escrow state machine).

Implement the allocation service so that one order line can be fulfilled by multiple listings/farmers with partial fulfilment, and create per-farmer payouts.

Write unit tests for: a 2,000 kg order against 1,400 kg total supply across five farmers, split payouts summing exactly to the escrowed amount (integer paise), and a short-delivery dispute.

Do not change unrelated files.
```

## 4. Forecasting prompt

```text
Using the real mandi price CSVs in data/raw/, build:
1. A seasonal-naive baseline
2. A candidate model (SARIMAX or Prophet)
3. Walk-forward validation

Report error metrics for both, with the improvement over baseline, prediction intervals, and any data quality problems found. Do not hide poor results.
```

## 5. Code review prompt

```text
Review the implementation against docs/PRD.md, docs/ARCHITECTURE.md, docs/DESIGN.md, docs/SECURITY.md, docs/TEST_PLAN.md and RULES.md.

Check: correctness, allocation-first data model, escrow state transitions, security/authorization, fraud controls, honesty rules, accessibility, responsive design, duplication.

Do not modify anything yet. Report all issues first.
```

## 6. Debugging prompt

```text
ERROR
[paste error]

EXPECTED BEHAVIOR
[what should happen]

ACTUAL BEHAVIOR
[what happens]

STEPS TO REPRODUCE
1. ...

Do not modify code yet. Find the root cause and explain what fails, why, which file, the smallest fix, and how to test it.
```
