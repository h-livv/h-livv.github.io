# Core Physics

Particle transport and interactions in Janus are governed by relativistic conservation laws and the Lorentz force. These relations underpin both the Geant4 interaction stage and the deterministic magnetic transport solver.

---

## Relativistic energy

$$
E^2 = (pc)^2 + (mc^2)^2
$$

where:

* $E$ = total energy
* $p$ = momentum
* $m$ = rest mass
* $c$ = speed of light

---

## Momentum conservation

$$
\sum \vec{p}_{\text{initial}} = \sum \vec{p}_{\text{final}}
$$

---

## Energy conservation

$$
\sum E_{\text{initial}} = \sum E_{\text{final}}
$$

---

## Lorentz force

Charged particles moving through electromagnetic fields obey

$$
\frac{d\vec{p}}{dt} = q(\vec{E}+\vec{v}\times\vec{B})
$$

For the current Janus transport system,

$$
\vec{E}=0
$$

so transport is governed entirely by magnetic fields.

These conservation laws are enforced event-by-event in the [interaction stage](interaction.md) and monitored continuously during [transport](transport.md).
