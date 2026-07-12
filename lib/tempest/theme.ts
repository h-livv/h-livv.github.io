export const TEMPEST = {
  cyan: '#06b6d4',
  teal: '#14b8a6',
  green: '#22c55e',
  bg: '#000000',
  card: '#0a0a0a',
  border: 'rgba(255,255,255,0.06)',
} as const;

export const EQUATIONS = [
  'Linear Advection',
  'Diffusion',
  'Wave Equation',
  'Shallow Water Equations',
  'Rossby Wave Equation',
] as const;

export const SPATIAL_METHODS = [
  'Upwind',
  'Central Difference',
  'Lax–Friedrichs',
  'Lax–Wendroff',
] as const;

export const TIME_INTEGRATORS = [
  'Explicit Euler',
  'RK4',
  'Leapfrog',
] as const;

export const ARCHITECTURE_NODES = [
  { name: 'Grid', desc: 'Structured computational domain' },
  { name: 'Field', desc: 'Scalar and vector state arrays' },
  { name: 'Equation', desc: 'PDE conservation laws' },
  { name: 'Solver', desc: 'Spatial flux discretization' },
  { name: 'Diagnostics', desc: 'Mass, energy, and stability' },
  { name: 'Validation', desc: 'Analytical convergence studies' },
  { name: 'Visualization', desc: 'Field exports and contours' },
  { name: 'Machine Learning', desc: 'Fourier Neural Operators' },
] as const;
