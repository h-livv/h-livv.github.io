# Future Extensions

The following physics and lattice elements are planned but not yet part of the validated Janus core.

---

## Sextupole magnet

### Physical purpose

Sextupoles correct chromatic aberrations.

Particles of different momentum experience different focusing strengths; sextupoles compensate for this effect.

### Governing equations

Field expansion:

$$
B_x = Sxy
$$

$$
B_y = \frac{S}{2}(x^2-y^2)
$$

where

$$
S = \frac{\partial^2 B}{\partial x^2}
$$

is the sextupole strength.

### Assumptions

* Ideal sextupole field.
* Small beam offsets.

### Simplifications

* No magnet imperfections.
* No saturation effects.

---

## Planned lattice elements

* Sextupoles and higher multipoles
* Solenoids (placeholder case only)

---

## Planned pipeline features

* Stochastic cooling
* Electron cooling
* Deceleration stages
* Trap injection
* Penning traps
* Antihydrogen formation
* Storage and confinement

These extensions will build on the validated interaction and transport foundation described in the preceding pages. See also the project [Roadmap](../roadmap.md).
