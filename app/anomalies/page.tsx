"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type Anomaly = {
  _id: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  count: number;
  detectedAt: string;
};

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/anomalies")
      .then((res) => res.json())
      .then((data) => {
        setAnomalies(data.anomalies || []);
        setLoading(false);
      });
  }, []);

  function severityStyle(severity: string) {
    if (severity === "HIGH") return "text-red-400 bg-red-500/10";
    if (severity === "MEDIUM") return "text-yellow-400 bg-yellow-500/10";
    return "text-green-400 bg-green-500/10";
  }

  if (loading) {
    return <p className="p-6 text-white/60">Loading anomalies...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Anomalies</h1>
        <p className="text-white/50">
          Automatically detected abnormal log spikes
        </p>
      </div>

      {/* Empty State */}
      {anomalies.length === 0 && (
  <div className="text-center text-white/60 py-20">
     No anomalies detected yet.<br />
    Logs look healthy.
  </div>
)}


      {/* Anomaly Cards */}
      <div className="space-y-4">
        {anomalies.map((a) => (
  <Link
    key={a._id}
    href={`/anomalies/${a._id}`}
    className="block rounded-lg bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition"
  >
    {/* Top Row */}
    <div className="flex items-center justify-between">
      <span
        className={`px-3 py-1 rounded text-xs font-semibold ${severityStyle(
          a.severity
        )}`}
      >
        {a.severity}
      </span>

      <span className="text-xs text-white/50">
        {formatDistanceToNow(new Date(a.detectedAt))} ago
      </span>
    </div>

    {/* Summary */}
    <p className="mt-3 text-sm font-medium text-white">
      Abnormal spike detected in similar error logs
    </p>

    {/* Meta */}
    <p className="mt-1 text-xs text-white/50">
      Spike count: <strong>{a.count}</strong>
    </p>
  </Link>
))}
      </div>
    </div>
  );
}
