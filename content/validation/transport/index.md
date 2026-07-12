# Transport Validation

This section is the canonical description of the Janus transport validation pipeline. It demonstrates that the relativistic particle integrator, lattice elements, and multi-element beam transport are physically trustworthy before optimization, deceleration, cooling, trapping, or digital-twin studies build upon them.

---

## Purpose

Janus advances charged particles through user-defined electromagnetic lattices by integrating the relativistic Lorentz force. Validation asks whether that integration — and the magnets that source the fields — reproduce known accelerator physics before the same machinery is used for design or optimization.

---

## Hierarchical philosophy

Validation progresses deliberately:

| Stage | Question |
|-------|----------|
| Single particle | Does the Boris integrator solve the Lorentz equation correctly in elementary fields? |
| Composite transport | Do validated elements remain consistent when joined? |
| Beam transport | Does an ensemble evolve as expected under linear optics? |
| Linear optics benchmarking | Does Janus agree with established first-order optics? |

Each stage assumes the previous one. Independent validation at every level is required: optimization against a broken integrator, or Twiss matching on an untested lattice stack, would only tune numerical artefacts.

---

## Why this matters for later Janus stages

A credible foundation for antimatter transport, deceleration, cooling, trapping, and ultimately a digital twin of the beamline requires that:

1. the **physics implementation** (fields + Lorentz force) is correct;
2. **composite beamlines** preserve physical invariants across element boundaries;
3. **beam observables** (envelope, emittance, Twiss) behave as accelerator physics predicts.

The pages below address those three requirements in order.

---

## Pages

| Stage | Page |
|-------|------|
| Single-particle integrator | [Integrator validation](integrator.md) |
| Composite lattices | [Composite lattice validation](composite.md) |
| Beam dynamics | [Beam dynamics validation](beam-dynamics.md) |
| Linear optics | [Linear optics benchmarking](optics.md) |
| Conservation & scope | [Summary and scope](summary.md) |
