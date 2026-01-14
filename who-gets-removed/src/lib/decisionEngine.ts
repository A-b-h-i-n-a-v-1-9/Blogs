export function resolveDecision(
  probabilities: Record<string, number>
): [string, number][] {
  return Object.entries(probabilities).sort(
    (a, b) => b[1] - a[1]
  );
}
