export type LogItem = {
  _id: string;
  hash: string;
  level: string;
  source: string;
  message: string;
  timestamp: string;
};

export type AnomalyItem = {
  _id: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  count: number;
  baseline: number;
  reason: string;
  detectedAt: string;
  windowStart: string;
  aiExplanation?: string;
  clusterHash: string;
};

export type ClusterItem = {
  hash: string;
  normalizedMessage: string;
  firstSeen: string;
  lastSeen: string;
  count: number;
};

export type AnomalyDetailResponse = {
  success: boolean;
  anomaly: AnomalyItem;
  cluster: ClusterItem;
  logs: LogItem[];
};
