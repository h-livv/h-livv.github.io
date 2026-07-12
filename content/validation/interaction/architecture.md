# Extraction Architecture

To decouple validation logic from the inner workings of the transport engine, the architecture relies on an absolute separation of tracking points into two independent data streams:

1. **Terminal State Node (The "Validation" Node):**
   Captures the system exclusively at the terminal boundaries of an interaction (e.g., immediately post-collision). It records the absolute pre-collision initial state and the final fragmented asymptotic state. This node must be dynamically aware, capturing instantaneous properties like sampled isotope variations and specific beam parameters per event.

2. **Birth State Node (The "Seed" Node):**
   A global tracking hook that captures the fundamental birth parameters ($t=0$ position, momentum, energy, and PID) of every secondary particle generated anywhere in the target geometry, enabling spatial and kinematic distribution analyses.

This separation allows each validation phase to consume the appropriate data stream without depending on engine internals.
