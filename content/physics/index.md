# Janus Physics Model

## Overview

Janus is a stochastic simulation framework for modeling the production, transport, and optimization of antiproton beams.

The framework is divided into distinct physical stages corresponding to the real-world antimatter production pipeline:

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

This document describes the physical models currently implemented within Janus, together with their governing equations, assumptions, and simplifications.

---

---

**Next page:** [Core Physics](core.md)