# Interaction Validation

High-energy physics Monte Carlo transport engines such as Geant4 simulate complex stochastic interactions that are inherently difficult to benchmark. To ensure downstream data integrity, a simulation pipeline requires a strict, autonomous, and physically rigorous validation architecture.

This section outlines a generalized four-phase validation framework designed to evaluate any physics engine. The framework systematically verifies fundamental mathematical invariants, discrete quantum bounds, macroscopic statistical limits, and realistic distributions before allowing data to proceed.

---

## Framework overview

| Phase | Focus | Page |
|-------|-------|------|
| Architecture | Decouple validation from the transport engine via dual data streams | [Extraction architecture](architecture.md) |
| 1–3 | Kinematic conservation, quantum numbers, statistical sanity checks | [Invariant checks](invariants.md) |
| 4 | Macroscopic observable shapes and distributions | [Phenomenological validation](phenomenology.md) |

---

## Pages

- [Extraction architecture](architecture.md) — terminal and birth state nodes
- [Invariant checks](invariants.md) — phases 1–3 and validation report
- [Phenomenological validation](phenomenology.md) — phase 4 plots and observables

By using this framework to validate the high-energy physics engine of Janus, we establish confidence that it is physically valid, reliable, and ready for further use in downstream applications — the transport pipeline and optimization studies.
