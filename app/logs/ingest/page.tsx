"use client";

import { useState } from "react";

export default function IngestPage() {
  const [level, setLevel] = useState("INFO");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level,
          source,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Log ingested successfully ✅");
        setSource("");
        setMessage("");
      } else {
        setStatus("Failed to ingest log ❌");
      }
    } catch (error) {
      setStatus("Network error ❌");
    }
  }

  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Ingest Log</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full rounded bg-black border border-white/20 p-2"
        >
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>

        {/* Source */}
        <input
          type="text"
          placeholder="Source (e.g. auth-service)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full rounded bg-black border border-white/20 p-2"
          required
        />

        {/* Message */}
        <textarea
          placeholder="Log message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded bg-black border border-white/20 p-2"
          rows={4}
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-white/10 p-2 hover:bg-white/20"
        >
          Submit Log
        </button>
      </form>

      {status && <p className="text-sm text-white/70">{status}</p>}
    </div>
  );
}
