# Fundamental Physics

Particle transport and interactions are governed by:

## Relativistic Energy

$$
E^2 = (pc)^2 + (mc^2)^2
$$

where:

* $E$ = total energy
* $p$ = momentum
* $m$ = rest mass
* $c$ = speed of light

## Momentum Conservation

$$
\sum \vec{p}_{\text{initial}}
=

\sum \vec{p}_{\text{final}}
$$

## Energy Conservation

$$
\sum E_{\text{initial}}
=

\sum E_{\text{final}}
$$

## Lorentz Force

Charged particles moving through electromagnetic fields obey

$$
\frac{d\vec{p}}{dt}
=

q(\vec{E}+\vec{v}\times\vec{B})
$$

For Janus beamline transport, particle advancement is performed by **Xsuite** (`xtrack`/`xpart`). Janus converts Geant4 seed phase space into Xsuite coordinates; callers build `xtrack.Line` objects with native Xsuite elements. Electromagnetic field models inside supported elements are those provided by Xsuite.

In the current configuration,

$$
\vec{E}=0
$$

so transport is governed by magnetic elements (drift, quadrupole, bend). Magnetic horn elements are not yet wired through an Xsuite field-map adapter.

---

**Next page:** [Target Collision](interaction.md)