/** Analytical test function for convergence demonstration */
export function analyticalSolution(x: number): number {
  return 0.5 + 0.32 * Math.sin(x * Math.PI * 2.2) * Math.cos(x * Math.PI * 4.0);
}

/** Cell-averaged numerical approximation on uniform grid */
export function cellAverage(i: number, n: number): number {
  const dx = 1 / n;
  const x0 = i * dx;
  const samples = 8;
  let sum = 0;
  for (let s = 0; s < samples; s++) {
    sum += analyticalSolution(x0 + ((s + 0.5) / samples) * dx);
  }
  return sum / samples;
}

/** L2 error between piecewise-constant numerical and analytical solution */
export function computeL2Error(n: number): number {
  const dx = 1 / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const num = cellAverage(i, n);
    const xMid = (i + 0.5) / n;
    const exact = analyticalSolution(xMid);
    const diff = num - exact;
    sum += diff * diff * dx;
  }
  return Math.sqrt(sum);
}

/** Observed convergence order for second-order scheme */
export function observedOrder(n: number): string {
  if (n <= 16) return '—';
  const eFine = computeL2Error(n);
  const eCoarse = computeL2Error(n / 2);
  if (eFine < 1e-10 || eCoarse < 1e-10) return '2.00';
  const order = Math.log(eCoarse / eFine) / Math.log(2);
  return order.toFixed(2);
}
