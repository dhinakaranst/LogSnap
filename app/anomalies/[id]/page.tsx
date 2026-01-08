"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import LogCard from "@/components/LogCard";
import { AnomalyDetailResponse, LogItem } from "@/lib/types";

export default function AnomalyDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<AnomalyDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/anomalies/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="p-6 text-white/60">Loading anomaly details...</p>;
  }

  if (!data?.success) {
  return (
    <div className="p-6 text-red-400">
      Failed to load anomaly details.<br />
      Please try again later.
    </div>
  );
}

  const { anomaly, cluster, logs } = data;
 
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* ================= HEADER CARD ================= */}
      <div className="rounded-lg bg-white/5 border border-white/10 p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            {cluster.normalizedMessage}
          </h1>

          <span
            className={`px-3 py-1 rounded text-xs font-semibold ${
              anomaly.severity === "HIGH"
                ? "bg-red-500/20 text-red-400"
                : anomaly.severity === "MEDIUM"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {anomaly.severity}
          </span>
        </div>

        <p className="mt-1 text-xs text-white/50">
          Detected{" "}
          {formatDistanceToNow(new Date(anomaly.detectedAt))} ago
        </p>
      </div>

      {/* ================= WHAT HAPPENED ================= */}
      <div className="rounded bg-white/5 p-4 border border-white/10">
        <h2 className="font-semibold mb-2">What happened</h2>

        <p className="text-white/80">
          {cluster.normalizedMessage}
        </p>

        <div className="mt-3 text-sm text-white/60 space-y-1">
          <p>Spike count: {anomaly.count}</p>
          <p>
            Window start:{" "}
            {new Date(anomaly.windowStart).toLocaleString()}
          </p>
        </div>
      </div>

      {/* ================= WHY FLAGGED ================= */}
      <div className="rounded bg-white/5 p-4 border border-white/10">
        <h2 className="font-semibold mb-2">Why this was flagged</h2>

        <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
          <li>{anomaly.reason}</li>
          <li>Error frequency exceeded the threshold</li>
          <li>Spike detected in a short time window</li>
        </ul>
      </div>

      {/* AI Explanation */}
<div className="rounded bg-white/5 p-4 border border-white/10">
  <h2 className="font-semibold mb-2">AI Explanation</h2>

  {anomaly.aiExplanation ? (
    <p className="text-white/80 leading-relaxed">
      {anomaly.aiExplanation}
    </p>
  ) : (
    <p className="text-white/50">
      Generating explanation...
    </p>
  )}
</div>


      {/* ================= RECENT LOGS ================= */}
      <div>
        <h2 className="font-semibold mb-3">Recent logs</h2>

        {logs.length === 0 && (
          <p className="text-sm text-white/50">
            No recent logs found for this anomaly.
          </p>
        )}

        {logs.map((log: LogItem) => (
          <LogCard
            key={log._id}
            hash={log.hash}
            level={log.level}
            source={log.source}
            message={log.message}
            timestamp={log.timestamp}
          />
        ))}
      </div>
    </div>
  );
}
