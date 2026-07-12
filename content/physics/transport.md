# Transport Physics

The transport section propagates particles through a sequence of magnetic elements using the relativistic Boris integrator.

Each element modifies the beam phase space according to its magnetic field structure. Composite lattices (FODO cells, minimal ACOL-inspired collector lines) are assembled from the same elements and validated at the ensemble level (envelope, emittance, Twiss).

---

## Numerical integrator

### Physical purpose

Advance relativistic charged particles under the Lorentz force in static magnetic lattices.

### Governing equations

$$
\frac{d\vec{p}}{dt}=q(\vec{E}+\vec{v}\times\vec{B}),\qquad \vec{p}=\gamma m\vec{v}
$$

with $\vec{E}=0$ in the present magnetic transport studies. Positions and velocities are updated with a staggered leapfrog Boris scheme.

### Assumptions

* Classical relativistic point particles.
* External fields only (no space charge in the current solver).

### Simplifications

* No synchrotron radiation reaction.
* No stochastic scattering during transport.

---

## Magnetic horn

### Physical purpose

The magnetic horn collects charged secondaries emerging from the target.

Low-angle particles are focused toward the transport axis.

The horn greatly increases capture efficiency.

### Governing equations

The horn field is approximated as

$$
B_\phi(r) = \frac{\mu_0 I}{2\pi r}
$$

where:

* $I$ = horn current
* $r$ = radial distance from axis

Particle motion follows

$$
\frac{d\vec p}{dt} = q(\vec v\times\vec B)
$$

### Assumptions

* Cylindrical symmetry.
* Steady-state current.
* Idealized conductor geometry.

### Simplifications

* No skin effects.
* No current pulse dynamics.
* No conductor heating.
* No field-map interpolation.

---

## Drift zone

### Physical purpose

A drift region allows particles to propagate without active magnetic focusing.

Momentum-dependent divergence naturally develops.

### Governing equations

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
\vec x(t) = \vec x_0+\vec v t
$$

### Assumptions

* Perfect vacuum.
* No residual magnetic field.

### Simplifications

* No scattering.
* No energy loss.
* No gas interactions.

---

## Dipole magnet

### Physical purpose

Dipoles provide momentum selection.

Particles with different momentum follow different trajectories.

This allows antiproton filtering.

### Governing equations

Radius of curvature:

$$
R = \frac{p}{qB}
$$

Equivalent accelerator form:

$$
p[\text{GeV}/c] = 0.2998\, B[\text{T}]\, R[\text{m}]
$$

### Assumptions

* Uniform magnetic field.
* Hard-edge boundaries.

### Simplifications

* No fringe fields.
* No field errors.
* No hysteresis.

---

## Quadrupole magnet

### Physical purpose

Quadrupoles focus the beam in one plane while defocusing it in the orthogonal plane.

They provide transverse beam control.

### Governing equations

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
k = \frac{qG}{p}
$$

Beam envelope evolution is approximately

$$
x'' + kx = 0
$$

for the focusing plane (Janus field convention $B=(Gy,Gx,0)$ implies the complementary hyperbolic motion in the other plane).

### Assumptions

* Linear magnetic field.
* Hard-edge magnet boundaries.

### Simplifications

* No higher-order multipoles.
* No alignment errors.
* No fringe fields.

---

## Beam optics diagnostics

### Physical purpose

For multi-element lattices, validation shifts from single orbits to ensemble beam quality and first-order optics.

### Observables

From the tracked particle cloud, Janus computes RMS envelopes $(\sigma_x,\sigma_y)$, geometric emittances, Courant–Snyder Twiss parameters $(\beta,\alpha,\gamma)$, momentum spread $\Delta p/p$, transmission, and acceptance losses.

Emittance conservation in linear magnetic optics follows from Liouville's theorem in the transverse plane: trajectories rearrange while phase-space area is preserved.

### Linear comparison

A modular optics backend provides thick-lens Drift/Quadrupole transfer matrices (and Twiss/envelope propagation). Tracked transfer matrices, envelopes, and Twiss functions are compared against this backend.

For validation results, see [Transport validation](../validation/transport/index.md).

Next: [Future extensions](future.md).
