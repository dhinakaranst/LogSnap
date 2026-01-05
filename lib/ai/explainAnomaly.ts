import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// ✅ MUST be top-level export
export async function generateAnomalyExplanation({
  severity,
  spikeCount,
  message,
}: {
  severity: string;
  spikeCount: number;
  message: string;
}) {
  try {
    const prompt = `
Explain this log anomaly in simple English (2–3 sentences).
Do not mention AI.

Severity: ${severity}
Spike count: ${spikeCount}
Log message pattern: "${message}"
`;

    const response = await groq.chat.completions.create({
      model: "groq/compound",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_completion_tokens: 120,
    });

    return response.choices[0]?.message?.content ?? null;
  } catch (err) {
    console.error("Groq explanation failed:", err);
    return null;
  }
}
