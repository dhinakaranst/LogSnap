type LogCardProps = {
  level: string;
  source: string;
  message: string;
  timestamp: string;
};

export default function LogCard({
  level,
  source,
  message,
  timestamp,
}: LogCardProps) {
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
      <p className={`text-sm font-semibold ${getLevelColor()}`}>
        {level} · {source}
      </p>
      <p>{message}</p>
      <p className="text-xs text-white/40 mt-1">
        {formatTime(timestamp)}
      </p>
    </div>
  );
}
