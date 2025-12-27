"use client";

import { useEffect, useState } from "react";
import LogCard from "@/components/LogCard";

export default function DashboardPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔁 reusable fetch function
  async function fetchLogs() {
    try {
      const res = await fetch(`/api/logs?page=${page}&limit=5`);
      const data = await res.json();

      if (data.success && Array.isArray(data.logs)) {
        setLogs(data.logs);
        setTotalPages(data.totalPages);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setLogs([]);
    }
  }

  // 🔁 auto-refresh logic
  useEffect(() => {
    // fetch immediately
    fetchLogs();

    // poll every 5 seconds
    const interval = setInterval(() => {
      fetchLogs();
    }, 5000);

    // cleanup when page changes or component unmounts
    return () => clearInterval(interval);
  }, [page]);

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

      {/* 🔍 SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 ml-4 rounded bg-black border border-white/20 p-2 w-64"
      />

      {logs.length === 0 && (
        <p className="text-white/60">No logs yet</p>
      )}

      {/* 📄 LOG LIST */}
      {logs
        .filter((log) => {
          if (levelFilter !== "ALL" && log.level !== levelFilter) {
            return false;
          }

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

      {/* 📄 PAGINATION CONTROLS */}
      <div className="flex gap-4 mt-6 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-white/10 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-white/70">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-white/10 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
