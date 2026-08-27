/** 1500 -> "1,500" */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

/** 1500 -> "1,500 kcal" */
export function formatKcal(value: number): string {
  return `${formatNumber(value)} kcal`;
}

/** 0.644 -> 64 */
export function toPercent(ratio: number): number {
  return Math.round(ratio * 100);
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
