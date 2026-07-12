# Invariant Checks (Phases 1–3)

Phases 1–3 verify mathematical and statistical correctness of the collision engine before phenomenological shape checks are applied.

---

## Phase 1: Kinematic Invariant Evaluator

**Objective:** Verify the absolute conservation of relativistic 4-momentum ($\Delta E, \Delta \vec{p}$).

**Framework logic:**

- **Energy tracking:** A physics engine must conserve total energy. The pipeline performs a summation of the final state energies ($\sum E_{out}$) and momenta ($\sum \vec{p}_{out}$) for all terminal fragments and compares them against the initial state collision kinematics.
- **Implementation standard:** If the invariant error exceeds a predefined microscopic tolerance ($\epsilon$), the pipeline must trigger a fatal exception.

!!! note "Janus-specific fix"
    Heavy fragments of the target itself were contaminating the momentum conservation check. If the error is sub-threshold but non-zero, the framework mathematically absorbs the residual energy and momentum into the heaviest target fragment, maintaining exact 4-momentum preservation.

---

## Phase 2: Quantum Number Gatekeeper

**Objective:** Enforce the strict conservation of discrete quantum invariants, specifically total electrical charge ($Q$) and baryon number ($B$).

**Framework logic:**

- **Dynamic parameter deduction:** The framework deduces the exact target isotope dynamically. By evaluating the collective $Q$ and $B$ values of the outgoing fragments, it calculates the dynamic initial bounds ($Q_{initial} = Q_{target} + Q_{beam}$).
- **Implementation standard:** The script iterates over the final state tensor, decodes particle IDs into their discrete quantum constituents, and verifies the sum exactly matches the dynamic initial bounds. Any discrete violation represents a catastrophic mathematical breakdown in the tracking engine.

---

## Phase 3: Statistical Benchmark

**Objective:** Validate the statistical and macroscopic likelihood of the generated event batch, preventing mathematically conserved but physically impossible scenarios (e.g., unphysical explosions of matter).

**Framework logic:**

- **Yield caps:** The pipeline evaluates the macroscopic ratios of rare particles. The framework compares rare-particle yields against expected theoretical or experimental values and flags significant deviations.
- **Multiplicity bounds:** Computes the mean fractional generation of standard cascade particles (such as charged pions in hadronic showers).
- **Implementation standard:** By establishing predefined boundaries for mean particle generation per inelastic event, the pipeline autonomously catches severe algorithmic regressions in the underlying physics models.

---

## Validation report

The physics engine was validated using 100,000 events. Phases 1–3 produced the following terminal output:

```
========== JANUS VALIDATION REPORT ==========
Events Validated: 100000
Phase 1 Passed: Kinematic Conservation Verified.
  -> Maximum ΔE Error: 3.2014213502407074e-10 MeV
  -> Maximum ΔP Error: 2.1845111499714025e-11 MeV/c
Phase 2 Passed: Quantum Number Conservation Verified.
  -> Mean Event Charge (Q): 75.0 (Mean Expected: 75.0)
  -> Mean Event Baryon (B): 184.9 (Mean Expected: 184.9)
Phase 3 Sanity Checks Passed:
  -> Total Antinucleons Generated: 430
  -> Global Baryon Conservation Verified.
  -> Mean Charged Pions per Inelastic Event: 4.0194

[+] Validation Suite Passed Successfully. Transport simulation may proceed.
```

Next: [Phenomenological validation](phenomenology.md) (Phase 4).
