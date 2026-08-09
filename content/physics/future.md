# Sextupole Magnet

## Physical Purpose

Sextupoles correct chromatic aberrations.

Particles of different momentum experience different focusing strengths; sextupoles compensate for this effect.

## Governing Equations

Field expansion:

$$
B_x
=

Sxy
$$

$$
B_y
=

\frac{S}{2}(x^2-y^2)
$$

where

$$
S
=

\frac{\partial^2 B}{\partial x^2}
$$

is the sextupole strength.

## Assumptions

* Ideal sextupole field.
* Small beam offsets.

## Simplifications

* No magnet imperfections.
* No saturation effects.

# Current Scope

**Implemented today**

* Target production (Geant4: `engines/geant4/` + `interactions/`)
* Collision-stage validation (`interactions/validation/`)
* NPZ seed extraction from Geant4 ROOT output (`transport/io.py`)
* Xsuite-backed drift, quadrupole, and bend transport via Python experiment scripts
* Automatic post-transport diagnostics (`transport/analysis/`)

**Not yet implemented**

* Magnetic horn as an Xsuite field-map element
* Cooling, deceleration, trapping, and global optimization

For how to define and run a transport study, see [transport guide](guides/transport_guide.md).

# Philosophy

Janus is not intended to reproduce every microscopic accelerator effect.

Instead, it seeks to capture the dominant beam-physics mechanisms that determine antimatter yield, transport efficiency, momentum selection, and beamline optimization while remaining computationally tractable for large-scale parameter studies and optimization workflows.