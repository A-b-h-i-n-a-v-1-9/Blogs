export function resolveDecision(probabilities) {
  return Object.entries(probabilities).sort(
    (a, b) => b[1] - a[1]
  );
}
