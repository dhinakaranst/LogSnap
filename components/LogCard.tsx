"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LogCardProps = {
  level: string;
  source: string;
  message: string;
  timestamp: string;
  hash: string; // ✅ NEW
};

export default function LogCard({
  level,
  source,
  message,
  timestamp,
  hash,
}: LogCardProps) {
  const [anomaly, setAnomaly] = useState<any>(null);

  // 🔍 Check if this log belongs to an anomaly
  useEffect(() => {
    if (!hash) return;

    fetch(`/api/anomalies/by-hash?hash=${hash}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.anomaly) {
          setAnomaly(data.anomaly);
        }
      })
      .catch(() => {});
  }, [hash]);

  function getLevelColor() {
    if (level === "ERROR") return "text-red-500";
    if (level === "WARN") return "text-yellow-500";
    if (level === "INFO") return "text-green-500";
    return "text-gray-400";
  }

  function formatTime(time: string) {
    return new Date(time).toLocaleString();
  }

  return (
    <div className="mb-2 rounded bg-white/5 p-3">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <p className={`text-sm font-semibold ${getLevelColor()}`}>
          {level} · {source}
        </p>

        {/* 🚨 ANOMALY BADGE */}
        {anomaly && (
          <Link
            href={`/anomalies/${anomaly._id}`}
            className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded hover:bg-red-600/30"
          >
            ⚠ Anomaly
          </Link>
        )}
      </div>

      {/* MESSAGE */}
      <p className="mt-1">{message}</p>

      {/* TIME */}
      <p className="text-xs text-white/40 mt-1">
        {formatTime(timestamp)}
      </p>
    </div>
  );
}
