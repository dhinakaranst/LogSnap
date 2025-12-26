"use client";

import { useEffect, useState } from "react";
import LogCard from "@/components/LogCard";


export default function DashboardPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetch("/api/logs")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.logs)) {
          setLogs(data.logs);
        } else {
          console.error("Unexpected response:", data);
          setLogs([]);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLogs([]);
      });
  }, []);

  function getLevelColor(level: string) {
    if (level === "ERROR") return "text-red-500";
    if (level === "WARN") return "text-yellow-500";
    if (level === "INFO") return "text-green-500";
    return "text-gray-400";
  }

  function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleString();
}

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recent Logs</h1>

      {/* 🔽 FILTER DROPDOWN */}
      <select
        value={levelFilter}
        onChange={(e) => setLevelFilter(e.target.value)}
        className="mb-4 rounded bg-black border border-white/20 p-2"
      >
        <option value="ALL">All</option>
        <option value="ERROR">ERROR</option>
        <option value="WARN">WARN</option>
        <option value="INFO">INFO</option>
      </select>

      {logs.length === 0 && (
        <p className="text-white/60">No logs yet</p>
      )}

      <input
  type="text"
  placeholder="Search logs..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-4 ml-4 rounded bg-black border border-white/20 p-2 w-64"
/>


  {logs
  .filter((log) => {
    // level filter
    if (levelFilter !== "ALL" && log.level !== levelFilter) {
      return false;
    }

    // search filter
    if (
      search &&
      !log.message.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  })
        .map((log) => (
          <LogCard
      key={log._id}
      level={log.level}
      source={log.source}
      message={log.message}
      timestamp={log.timestamp}
    />
        ))}
    </div>
  );
}
