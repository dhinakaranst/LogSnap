"use client";

import { use, useEffect, useState } from "react";

export default function AnomalyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/anomalies/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white/60">
        Loading anomaly details…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black p-6 text-red-500">
        Failed to load anomaly
      </div>
    );
  }

  const { anomaly, cluster, logs } = data;

  return (
    <div className="min-h-screen bg-black p-6 space-y-8 text-white">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Anomaly Details</h1>
        <p className="text-white/60">
          Detected at {new Date(anomaly.detectedAt).toLocaleString()}
        </p>
      </div>

      {/* SEVERITY */}
      <div>
        <span
          className={`inline-block rounded px-3 py-1 text-sm font-semibold ${
            anomaly.severity === "HIGH"
              ? "bg-red-500/20 text-red-400"
              : anomaly.severity === "MEDIUM"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {anomaly.severity} severity
        </span>
      </div>

      {/* PROBLEM */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="mb-2 font-semibold">Problem</h2>
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

      {/* WHY FLAGGED */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="mb-2 font-semibold">Why this was flagged</h2>
        <p className="text-white/80">{anomaly.reason}</p>
      </div>

      {/* RECENT LOGS */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="mb-4 font-semibold">Recent logs</h2>

        <div className="space-y-3">
          {logs.map((log: any) => (
            <div
              key={log._id}
              className="rounded bg-black/40 p-3"
            >
              <p
                className={`text-sm font-semibold ${
                  log.level === "ERROR"
                    ? "text-red-400"
                    : log.level === "WARN"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {log.level} · {log.source}
              </p>

              <p className="mt-1 text-white/90">{log.message}</p>

              <p className="mt-1 text-xs text-white/40">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
