export default function DashboardPage() {
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
        <StatCard title="Total Logs" value="8" subtitle="All time" />
        <StatCard title="Errors" value="3" subtitle="Requires attention" />
        <StatCard title="Warnings" value="2" subtitle="Monitor closely" />
      </div>

      {/* Recent logs */}
      <div className="rounded-lg border border-white/10 p-4">
        <h2 className="mb-4 font-semibold">Recent Logs</h2>

        <LogItem level="INFO" source="auth-service" message="User authentication successful" />
        <LogItem level="WARN" source="monitoring-service" message="High memory usage detected" />
        <LogItem level="ERROR" source="database-service" message="Database connection timeout" />
      </div>
    </div>
  );
}
