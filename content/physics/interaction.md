# 1. Target Collision

## Physical Purpose

A high-energy proton beam strikes a dense target.

The collision produces secondary particles through hadronic interactions:

* pions
* kaons
* protons
* antiprotons
* antineutrons
* hyperons
* other secondaries

The target stage provides the initial phase-space distribution consumed by transport experiments (`xtrack.Line`). With the default collision `record_mode` of `"Hit"`, transport seeds are Target→Chamber boundary states; `"Birth"` records \(t=0\) production kinematics instead.

## Governing Equations

The interaction physics is handled directly by Geant4.

Conservation laws are enforced event-by-event:

### Energy

$$
\sum E_{\text{initial}}
=

\sum E_{\text{final}}
$$

### Momentum

$$
\sum \vec p_{\text{initial}}
=

\sum \vec p_{\text{final}}
$$

### Charge

$$
\sum q_{\text{initial}}
=

\sum q_{\text{final}}
$$

### Baryon Number

$$
\sum B_{\text{initial}}
=

\sum B_{\text{final}}
$$

## Assumptions

* Geant4 is treated as the source of truth.
* Nuclear interaction models are not reimplemented.
* Particle production cross sections are inherited from Geant4 physics lists.
* Material effects are handled by Geant4.

## Simplifications

* Janus only consumes the generated particle distributions.
* No custom collision model is used.
* Detector response is not simulated.

---

**Next page:** [Transport](transport.md)