# Validation

Janus validates each stage of the antimatter pipeline independently before those stages are composed into end-to-end or digital-twin studies. Two complementary validation tracks establish that foundation:

| Track | Question |
|-------|----------|
| [**Interaction**](interaction/index.md) | Does the Geant4-based collision engine conserve invariants and produce physically realistic event distributions? |
| [**Transport**](transport/index.md) | Does the relativistic particle integrator and lattice transport reproduce known accelerator physics? |

Each track follows a deliberate hierarchy: fundamental checks first, then composite behaviour, then ensemble or phenomenological benchmarks. Later design work — optimization, deceleration, cooling, trapping — assumes these results.

---

## Interaction validation

Monte Carlo collision engines are stochastic and difficult to benchmark directly. The [interaction validation framework](interaction/index.md) uses a four-phase pipeline:

1. [Extraction architecture](interaction/architecture.md) — decouple validation logic from the transport engine
2. [Invariant checks](interaction/invariants.md) — kinematic conservation, quantum numbers, statistical bounds
3. [Phenomenological validation](interaction/phenomenology.md) — jet structure, multiplicity, spectra, spatial profiles

---

## Transport validation

The [transport validation pipeline](transport/index.md) establishes the correctness of Janus integration boundaries and metrics without re-validating the core tracking engine:

1. [Transport Boundaries & Diagnostics](transport/index.md) — NPZ schemas, metrics, provenance, and coordinate boundaries
