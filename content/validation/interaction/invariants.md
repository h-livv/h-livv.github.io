## Phases 1-3 — `validate.py`

Reads **`validation.root`** only. Fails hard if kinematic or quantum conservation is violated beyond tolerance.

### Phase 1: Kinematic invariants

Compares total outgoing energy and momentum to the recorded initial state. If \(|\Delta E|\) or \(|\Delta p|\) exceeds `--epsilon` (default 2 MeV), the suite aborts.

> **Janus note:** Heavy target fragments can leave a sub-threshold residual. The engine absorbs that residual into the heaviest target fragment so 4-momentum is preserved exactly for the check.

### Phase 2: Quantum numbers

Checks event-by-event conservation of charge \(Q\) and baryon number \(B\), including dynamic target isotope deduction from the fragment set.

### Phase 3: Statistical sanity

Reports macroscopic counters for human inspection — it does **not** compare yields to theoretical caps or fail on multiplicity bounds:

- Total antinucleons generated
- Global baryon conservation check
- Mean charged pions per inelastic event

---

**Next page:** [Phenomenological Validation](phenomenology.md)