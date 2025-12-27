"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import LogCard from "@/components/LogCard";

export default function DashboardPage() {
  // 🔹 stats state
  const [stats, setStats] = useState({
    total: 0,
    errors: 0,
    warnings: 0,
  });

  // 🔹 recent logs state
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  // 🔹 fetch stats
  useEffect(() => {
    fetch("/api/logs/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error("Stats fetch failed", err));
  }, []);

  // 🔹 fetch recent logs (latest 1–3)
  useEffect(() => {
    fetch("/api/logs?limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.logs)) {
          setRecentLogs(data.logs);
        }
      })
      .catch((err) => console.error("Logs fetch failed", err));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-white/60">
          Overview of your logs and system health
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Logs"
          value={stats.total.toString()}
          subtitle="All time"
        />
        <StatCard
          title="Errors"
          value={stats.errors.toString()}
          subtitle="Requires attention"
        />
        <StatCard
          title="Warnings"
          value={stats.warnings.toString()}
          subtitle="Monitor closely"
        />
      </div>

      {/* Recent logs */}
      <div className="rounded-lg border border-white/10 p-4 space-y-3">
        <h2 className="font-semibold">Recent Logs</h2>

        {recentLogs.length === 0 && (
          <p className="text-white/60 text-sm">No recent logs</p>
        )}

        {recentLogs.map((log) => (
          <LogCard
            key={log._id}
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
