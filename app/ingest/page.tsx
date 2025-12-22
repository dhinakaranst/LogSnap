"use client";

import { useState } from "react";
import { addLog } from "../lib/logStore";


export default function IngestPage() {
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("INFO");

 async function handleSubmit() {
  if (!message) return alert("Message required");

  const log = {
    id: crypto.randomUUID(),
    level,
    message,
    source: "frontend",
    timestamp: new Date().toISOString(),
  };

  await fetch("/api/ingest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });

  alert("Log ingested!");
  setMessage("");
}



  return (
    <div style={{ padding: "24px" }}>
      <h1>Ingest Log</h1>

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
      </select>

      <br /><br />

      <input
        placeholder="Log message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Send Log</button>
    </div>
  );
}
