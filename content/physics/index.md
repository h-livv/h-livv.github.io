# Physics

This section describes the physical models implemented within Janus, together with their governing equations, assumptions, simplifications, and validation philosophy.

```text
Proton Beam
    ↓
Target Collision
    ↓
Secondary Particle Production
    ↓
Magnetic Collection
    ↓
Momentum Selection
    ↓
Beam Transport
    ↓
(Deceleration)
    ↓
(Cooling)
    ↓
(Trapping)
```

---

## Current scope

Janus currently models:

* Target production (Geant4)
* Magnetic horn collection
* Drift transport
* Dipole momentum selection
* Quadrupole focusing
* Composite / FODO / minimal ACOL-inspired beamlines
* Ensemble beam diagnostics and first-order optics comparison

---

## Pages

| Topic | Page |
|-------|------|
| Conservation laws and Lorentz force | [Core physics](core.md) |
| Target collision and secondary production | [Interaction physics](interaction.md) |
| Integrator, magnets, and beam optics | [Transport physics](transport.md) |
| Sextupoles, cooling, trapping, and beyond | [Future extensions](future.md) |

---

## Philosophy

Janus deliberately favors validated physical fidelity over maximum physical completeness.

Rather than implementing every known accelerator effect, the framework adopts a hierarchical approach in which each physical subsystem is independently benchmarked against analytical solutions, conservation laws, or established beam optics before integration into larger studies.

For validation results, see the [Validation](../validation/index.md) section.
