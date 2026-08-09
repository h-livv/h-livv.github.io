# Roadmap

Janus is being developed as a **validation-driven computational framework for studying antimatter production, transport, conditioning, and storage**.

Development proceeds incrementally: each physical subsystem is implemented, benchmarked, and validated independently before being incorporated into larger computational studies. This establishes reliable foundations for subsequent sensitivity analysis, surrogate modelling, and optimization.

---

# Current Status

The current system provides a computational foundation for studying antiproton production and deterministic beam transport.

Implemented capabilities include:

* Geant4-based antiproton production
* Deterministic charged-particle transport
* Relativistic Boris particle integration
* Magnetic horn, drift, dipole, and quadrupole elements
* Hierarchical transport validation
* Beam diagnostics
* First-order optics benchmarking

The production and transport components form the initial validated physics pipeline on which subsequent studies will be built.

---

# Stage 1 — Transport Physics

The next phase expands the transport model toward increasingly realistic beamline configurations.

Planned additions include:

* Solenoids
* Sextupole magnets
* Higher-order magnetic elements
* Field-map support
* Material interactions during transport
* Beamline aperture modelling
* Extended beam and optics diagnostics

Each addition will be validated independently before being incorporated into end-to-end transport studies.

---

# Stage 2 — Beam Conditioning

With the transport framework established, Janus will begin modelling the processes involved in preparing antiprotons for confinement and storage.

Planned research directions include:

* Momentum deceleration
* Electron cooling
* Stochastic cooling
* Beam matching
* Trap injection
* Phase-space evolution during conditioning

The objective is to understand how conditioning processes modify the beam and how their parameters influence downstream storage performance.

---

# Stage 3 — Storage Physics

The transport and conditioning framework will eventually be extended to antimatter confinement and storage.

Planned research directions include:

* Penning trap modelling
* Magnetic confinement
* Storage lifetime studies
* Antiproton accumulation
* Antihydrogen formation
* Loss mechanisms and confinement stability

As with the earlier stages, storage components will be developed and validated as independent physical models before being coupled to the larger pipeline.

---

# Cross-Cutting — Analysis & Optimization

Analysis and optimization form a **cross-cutting layer across the Janus pipeline**, rather than a single final development stage.

Once individual physical components are sufficiently validated, Janus can be used to investigate how their parameters influence system behaviour.

Research directions include:

* Parameter sweeps
* Sensitivity analysis
* Uncertainty analysis
* Parameter-space exploration
* Surrogate modelling
* Production-yield optimization
* Beam transport optimization
* Beam optics optimization
* Magnetic element optimization
* End-to-end optimization
* Multi-objective design studies

Different optimization methods may be appropriate for different physical models. Janus therefore does not assume a single optimization strategy; gradient-based, derivative-free, surrogate-assisted, and other numerical approaches can be investigated according to the structure and computational cost of the underlying problem.

This layer turns the simulation pipeline from a collection of physical models into an experimental framework for studying **which parameters matter, why they matter, and how the system can be improved**.

---

# Stage 4 — Integrated Pipeline

As the individual physical subsystems mature, they will be progressively coupled into larger end-to-end studies.

The objective is to connect:

**Production → Transport → Conditioning → Storage**

while preserving the validation boundaries established at each stage.

Integrated studies will investigate how local physical choices propagate through the complete pipeline and where system-level bottlenecks, sensitivities, and trade-offs emerge.

---

# Stage 5 — Computational Studies

With a sufficiently complete and validated pipeline, Janus can support increasingly ambitious computational experiments.

Potential directions include:

* End-to-end antimatter production studies
* Beamline and storage-system design studies
* System-level sensitivity analysis
* Multi-objective optimization
* Surrogate-assisted simulation
* Uncertainty propagation
* Digital-twin development
* Comparative studies of antimatter system architectures

These are research directions rather than fixed product requirements; the framework is intended to evolve according to the physical questions that emerge from earlier stages.

---

# Long-Term Vision

The long-term vision of Janus is a **modular, validation-driven computational framework for investigating antimatter systems across multiple physical scales**.

Rather than treating production, transport, conditioning, and storage as isolated simulation problems, Janus aims to provide a common computational environment in which individual physical models can be:

**implemented → validated → analysed → coupled → optimized**

This creates a progression from reliable subsystem models toward increasingly comprehensive computational experiments.

The ultimate goal is not a single prescribed simulation or optimization algorithm, but a framework in which **physical models, numerical methods, analysis techniques, and optimization strategies can be combined to investigate complex antimatter systems systematically**.

---