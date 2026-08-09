## Two data streams

Geant4 writes two ROOT files per run (staged under `temp/`, then packaged into `data/interactions/<run_name>/`):

| File | Tree | Role |
|------|------|------|
| `validation.root` | `Validation` | Per-event initial / outgoing kinematics for conservation checks |
| `simulation.root` | `Seeds` | Secondary kinematics for transport (and Phase 4 spatial plots) |

### Seed recording mode

`interactions/config.json` → `output.record_mode`:

| Mode | Meaning |
|------|---------|
| `"Hit"` (**default**) | Record kinematics when a particle crosses Target → Chamber |
| `"Birth"` | Record \(t=0\) birth kinematics of secondaries |

Transport and Phase 4 both read `Seeds`. With the default Hit mode, those are chamber-entry states, not necessarily production vertices.

---

---

**Next page:** [Invariant Checks](invariants.md)