"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/logs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          console.error("Expected array, got:", data);
          setLogs([]);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLogs([]);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recent Logs</h1>

      {logs.length === 0 && (
        <p className="text-white/60">No logs yet</p>
      )}

      {logs.map((log) => (
        <div key={log._id} className="mb-2 rounded bg-white/5 p-3">
          <p className="text-sm font-semibold">
            {log.level} · {log.source}
          </p>
          <p>{log.message}</p>
        </div>
      ))}
    </div>
  );
}
