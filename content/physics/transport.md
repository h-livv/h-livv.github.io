# 2. Transport

Beamline transport is delegated to **Xsuite**. Janus owns only:

* Geant4 ROOT → NPZ seed extraction (`transport/io.py`) — load only; no experiment cuts
* Conversion of seed arrays into `xpart.Particles` (`transport/xsuite.py`)
* Packaging of transported NPZ output for optimization
* Experiment scripts under `experiments/transport/` that define every scientific parameter

Beamlines are constructed in Python with native Xsuite elements (`xt.Drift`, `xt.Quadrupole`, `xt.Bend`, …). Particle coordinates use the Xsuite convention: transverse positions `x`, `y` [m]; normalized momenta `px`, `py`; longitudinal phase `zeta` (set to 0 at injection); momentum deviation `delta`. Reference mass uses `xt.PROTON_MASS_EV` for both proton and antiproton ensembles.

The physical models below describe the accelerator elements relevant to antimatter collection. Their tracking maps are provided by Xsuite, not by Janus. Horn and higher-order correctors remain conceptual until wired through Xsuite field-map elements.

# Magnetic Horn

## Physical Purpose

The magnetic horn collects charged secondaries emerging from the target.

Low-angle particles are focused toward the transport axis.

The horn greatly increases capture efficiency.

## Governing Equations

The horn field is approximated as

$$
B_\phi(r)
=

\frac{\mu_0 I}{2\pi r}
$$

where:

* $I$ = horn current
* $r$ = radial distance from axis

Particle motion follows

$$
\frac{d\vec p}{dt}
=

q(\vec v\times\vec B)
$$

## Assumptions

* Cylindrical symmetry.
* Steady-state current.
* Idealized conductor geometry.

## Simplifications

* No skin effects.
* No current pulse dynamics.
* No conductor heating.
* No field-map interpolation.

# Drift Zone

## Physical Purpose

A drift region allows particles to propagate without active magnetic focusing.

Momentum-dependent divergence naturally develops.

## Governing Equations

No external force:

$$
\frac{d\vec p}{dt}=0
$$

Therefore

$$
\vec p = \text{constant}
$$

and

$$
\vec x(t)
=

\vec x_0+\vec v t
$$

## Assumptions

* Perfect vacuum.
* No residual magnetic field.

## Simplifications

* No scattering.
* No energy loss.
* No gas interactions.

# Dipole Magnet

## Physical Purpose

Dipoles provide momentum selection.

Particles with different momentum follow different trajectories.

This allows antiproton filtering.

## Governing Equations

Radius of curvature:

$$
R
=

\frac{p}{qB}
$$

Equivalent accelerator form:

$$
p[\text{GeV}/c]
=

0.2998, B[\text{T}], R[\text{m}]
$$

## Assumptions

* Uniform magnetic field.
* Hard-edge boundaries.

## Simplifications

* No fringe fields.
* No field errors.
* No hysteresis.

# Quadrupole Magnet

## Physical Purpose

Quadrupoles focus the beam in one plane while defocusing it in the orthogonal plane.

They provide transverse beam control.

## Governing Equations

Field model:

$$
B_x = G y
$$

$$
B_y = G x
$$

where

$$
G=\frac{\partial B}{\partial x}
$$

is the gradient.

The focusing strength is

$$
k
=

\frac{qG}{p}
$$

Beam envelope evolution is approximately

$$
x'' + kx = 0
$$

for the focusing plane.

## Assumptions

* Linear magnetic field.
* Small transverse displacement.

## Simplifications

* No higher-order multipoles.
* No alignment errors.
* No fringe fields.

---

**Next page:** [Future Extensions](future.md)