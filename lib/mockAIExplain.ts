export function mockAIExplain(context: any) {
  return {
    summary: `A ${context.severity} severity issue occurred where "${context.problem}" happened ${context.spike.count} times in a short time window.`,
    possibleCause:
      "This is likely caused by repeated failures in a dependent service such as the database or network layer.",
    suggestedAction:
      "Check database connectivity, recent deployments, and system load. Consider adding retries or circuit breakers.",
    confidence: 0.75,
  };
}
