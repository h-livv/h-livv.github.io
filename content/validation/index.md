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

The [transport validation pipeline](transport/index.md) progresses from single-particle physics to full beamline behaviour:

1. [Introduction](transport/index.md) — purpose and hierarchical philosophy
2. [Single-particle integrator](transport/integrator.md) — drift, dipole, quadrupole, magnetic horn
3. [Composite lattices](transport/composite.md) — element handoffs and interface continuity
4. [Beam dynamics](transport/beam-dynamics.md) — FODO ensemble diagnostics
5. [Linear optics benchmarking](transport/optics.md) — transfer matrices, envelopes, Twiss parameters
6. [Summary and scope](transport/summary.md) — conservation table, limitations, conclusions
