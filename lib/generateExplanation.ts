import Explanation from "@/model/Explanation";
import { buildAnomalyContext } from "@/lib/buildAnomalyContext";
import { mockAIExplain } from "@/lib/mockAIExplain";

export async function generateExplanation(anomalyId: string) {
  // prevent duplicate explanations
  const existing = await Explanation.findOne({ anomalyId }).lean();
  if (existing) {
    return existing;
  }

  const context = await buildAnomalyContext(anomalyId);

  // later this will be real AI
  const aiResult = mockAIExplain(context);

  const explanation = await Explanation.create({
    anomalyId,
    summary: aiResult.summary,
    possibleCause: aiResult.possibleCause,
    suggestedAction: aiResult.suggestedAction,
    confidence: aiResult.confidence,
  });

  return explanation;
}
