# Transport Validation

**Current status:** Transport tracking is performed by **Xsuite**. Janus validates only its integration boundaries, metrics, studies, provenance, and automatic diagnostics — not Xsuite element physics.

## What Janus tests

1. NPZ seed loading (`transport/io.py`)
2. Conversion into `xpart.Particles` (`transport/xsuite.py`)
3. Pipeline NPZ + metrics + provenance + analysis product generation
4. Smoke tracking through a minimal `xtrack.Line`
5. Structured metrics from in-memory `TransportResult` and NPZ adapter
6. Study parameter generators and CSV export
7. Per-run provenance fingerprinting

## Validation boundary

Janus does **not** re-validate:

- Geant4 hadronic physics
- Xsuite element physics or tracking maps

Janus **does** validate:

- Unit and coordinate conversions at the Geant4 → Xsuite boundary
- NPZ seed and transported NPZ schemas
- Metrics definitions and alive-particle masking
- Provenance determinism for canonical parameters
- Study aggregation without external Geant4 files