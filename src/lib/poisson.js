const factCache = [1];
function factorial(n) {
  if (n < 0) return 0;
  if (factCache[n] !== undefined) return factCache[n];
  for (let i = factCache.length; i <= n; i++) {
    factCache[i] = factCache[i - 1] * i;
  }
  return factCache[n];
}

export function poissonPMF(k, lambda) {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  if (k < 0) return 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

export function buildScoreMatrix(homeLambda, awayLambda, maxGoals = 6) {
  const matrix = [];
  for (let h = 0; h <= maxGoals; h++) {
    matrix[h] = [];
    for (let a = 0; a <= maxGoals; a++) {
      matrix[h][a] = poissonPMF(h, homeLambda) * poissonPMF(a, awayLambda);
    }
  }
  return matrix;
}

export function getGoalDistribution(lambda, maxGoals = 8) {
  return Array.from({ length: maxGoals + 1 }, (_, k) => ({
    goals: k,
    prob: poissonPMF(k, lambda),
    pct: Math.round(poissonPMF(k, lambda) * 1000) / 10,
  }));
}

export function expectedGoals(lambda) {
  return lambda;
}
