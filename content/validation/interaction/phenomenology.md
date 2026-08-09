## Phase 4 — `physical_validation.py`

Reads **both** `validation.root` and `simulation.root`. Produces diagnostic plots for visual review — there is **no** automated pass/fail against exponential fits or distribution templates.

Outputs go to:

```text
interactions/validation/validation_outputs/<run_name>/
├── phase4_pT_vs_pL.png
├── phase4_multiplicity.png
├── phase4_energy_spectra.png
└── phase4_vertex_z.png
```

| Plot | What it shows |
|------|----------------|
| \(p_T\) vs \(p_L\) | Charged-pion transverse vs longitudinal momentum (2D density) |
| Multiplicity | Charged-pion multiplicity per inelastic event |
| Energy spectra | Kinetic-energy spectra (e.g. neutrons) |
| Vertex \(z\) | Histogram of seed \(z\) positions from `Seeds` |

Illustrative snapshots (from an earlier 100k-event study) are also kept under `docs/assets/collision_val/` for the README / docs gallery; live runs write the `phase4_*.png` names above.

---

## Relation to transport

After Phases 1–3 pass (and Phase 4 looks sensible), define and run a transport experiment:

Transport reads **`simulation.root` / `Seeds`** only (via `transport/io.py`). Momentum and species selection are experiment parameters — see [transport guide](../guides/transport_guide.md).