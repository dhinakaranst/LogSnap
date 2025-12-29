import Anomaly from "@/model/Anomaly";
import LogCluster from "@/model/LogCluster";
import Log from "@/model/Log";

export async function buildAnomalyContext(anomalyId: string) {
  // 1️⃣ Fetch anomaly
  const anomaly = await Anomaly.findById(anomalyId).lean();
  if (!anomaly) {
    throw new Error("Anomaly not found");
  }

  // 2️⃣ Fetch cluster
  const cluster = await LogCluster.findOne({
    hash: anomaly.clusterHash,
  }).lean();

  // 3️⃣ Fetch representative logs (not all)
  const logs = await Log.find({
    hash: anomaly.clusterHash,
  })
    .sort({ timestamp: -1 })
    .limit(5)
    .lean();

  // 4️⃣ Build clean context
  return {
    problem: cluster?.normalizedMessage,
    severity: anomaly.severity,
    spike: {
      count: anomaly.count,
      windowStart: anomaly.windowStart,
      baseline: anomaly.baseline,
    },
    explanationHint: `Error frequency spiked above normal baseline`,
    examples: logs.map((log) => ({
      message: log.message,
      timestamp: log.timestamp,
      source: log.source,
    })),
  };
}
